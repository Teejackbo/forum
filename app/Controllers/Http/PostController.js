'use strict'

const Post = use('App/Models/Post')
const Category = use('App/Models/Category')
const User = use('App/Models/User')
const Comment = use('App/Models/Comment')
const { checkPerm, checkUser } = use('App/Models/Helpers/UserHelper')

class PostController {
  async index ({ view }) {
    const posts = await Post
      .query()
      .select('posts.id', 'posts.title', 'posts.description', 'posts.user_id', 'posts.category_id', 'users.username', 'categories.title as category_title')
      .innerJoin('users', 'posts.user_id', 'users.id')
      .innerJoin('categories', 'posts.category_id', 'categories.id')
      .fetch()

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
    checkPerm(auth.user.permissions, 1, response)
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
    checkPerm(auth.user.permissions, 1, response)
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
    const post = await Post
      .query()
      .select('posts.id', 'posts.category_id', 'posts.title', 'posts.body', 'posts.user_id', 'posts.created_at', 'users.username', 'categories.title as category_title')
      .where('posts.id', params.id)
      .innerJoin('users', 'posts.user_id', 'users.id')
      .innerJoin('categories', 'posts.category_id', 'categories.id')
      .first()

    if (post === null) {
      return response.redirect('/404')
    }

    const comments = await Comment
      .query()
      .select('comments.id', 'comments.user_id', 'comments.body', 'comments.created_at', 'users.username')
      .where('comments.post_id', params.id)
      .innerJoin('users', 'comments.user_id', 'users.id')
      .fetch()

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
    checkPerm(auth.user.permissions, 1, response)
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
    checkPerm(auth.user.id, 1, response)
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
    checkPerm(auth.user.permissions, 1, response)
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
    if (category === null) {
      return response.redirect('/404')
    }
    const posts = await Post
      .query()
      .select('posts.id', 'posts.title', 'posts.description', 'posts.user_id', 'users.username', 'categories.title as category_title')
      .where('category_id', params.id)
      .innerJoin('users', 'posts.user_id', 'users.id')
      .innerJoin('categories', 'posts.category_id', 'categories.id')
      .fetch()

    return view.render('posts.category', {
      title: category.title,
      category: category.toJSON(),
      posts: posts.toJSON(),
      active: 'posts'
    })
  }
}

module.exports = PostController
