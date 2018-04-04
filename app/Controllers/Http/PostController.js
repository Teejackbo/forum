'use strict'

const Post = use('App/Models/Post')
const Category = use('App/Models/Category')
const User = use('App/Models/User')
const Comment = use('App/Models/Comment')
const { checkUser } = use('App/Models/Helpers/UserHelper')

class PostController {
  async index ({ view }) {
    const posts = await Post.fetchAllAndJoin()
    return view.render('posts.index', {
      title: 'Posts',
      posts: posts.toJSON(),
      active: 'posts'
    })
  }

  async create ({ view, response, auth, params }) {
    if (auth.user === null) {
      return view.render('errors.createpost', {
        title: 'Please create an account to view this page.'
      })
    }
    const categories = await Category.all()
    let category = null
    if (params.category_id) {
      category = await Category.find(params.category_id)
      category = category.toJSON()
    }
    return view.render('posts.create', {
      title: 'Create a Post',
      categories: categories.toJSON(),
      selectedCategory: category,
      active: 'create-post'
    })
  }

  async store ({ request, response, auth, session }) {
    const { title, description, body, category } = request.all()
    const post = await Post.create({
      title,
      description,
      body,
      category_id: category,
      user_id: auth.user.id
    })
    session.flash({ notificationSuccess: 'Successfully created your post.' })
    return response.route('posts.show', { id: post.id })
  }

  async show ({ view, params, response }) {
    const post = await Post.findOneAndJoin(params.id)
    const comments = await Comment.findAndJoin(params.id)
    if (post === null) {
      return response.redirect('/404')
    }

    return view.render('posts.show', {
      title: post.title,
      post: post.toJSON(),
      comments: comments.toJSON(),
      active: 'posts'
    })
  }

  async edit ({ view, params, response, auth }) {
    const post = await Post.find(params.id)
    const user = await User.find(post.user_id)
    const selectedCategory = await Category.find(post.category_id)
    const categories = await Category.all()

    checkUser(auth.user, post.user_id, response, 3)
    return view.render('posts.edit', {
      title: `Edit Post: ${post.title}`,
      post: post.toJSON(),
      user: user.toJSON(),
      categories: categories.toJSON(),
      selectedCategory: selectedCategory.toJSON(),
      active: 'posts'
    })
  }

  async update ({ request, response, params, auth, session }) {
    const post = await Post.find(params.id)
    checkUser(auth.user, post.user_id, response, 3)
    const { title, description, body, category } = request.all()
    post.merge({
      title,
      description,
      body,
      category_id: category
    })
    await post.save()
    return response.route('posts.show', { id: post.id })
  }

  async destroy ({ params, auth, response, session }) {
    const post = await Post.find(params.id)
    checkUser(auth.user, post.user_id, response, 2)
    try {
      await post.delete()
      session.flash({ notificationSuccess: 'Deleted the post.' })
      return response.route('postsInCategory', { category_id: post.category_id })
    } catch (e) {
      session.flash({ notificationError: 'Unable to delete this post.' })
      return response.redirect('back')
    }
  }

  async category ({ params, view, response }) {
    const category = await Category.find(params.id)
    const posts = await Post.findAndJoinByCategory(params.id)
    if (category === null) {
      return response.redirect('/404')
    }

    return view.render('posts.category', {
      title: category.title,
      category: category.toJSON(),
      posts: posts.toJSON(),
      active: 'posts'
    })
  }
}

module.exports = PostController
