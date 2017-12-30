'use strict'

const Post = use('App/Models/Post')
const Category = use('App/Models/Category')
const User = use('App/Models/User')
const { validate } = use('Validator')
const { checkPerm, checkUser } = use('App/Models/Helpers/UserHelper')

class PostController {

  async index({ view }) {
    const posts = await Post.all()
    return view.render('posts.index', {
      title: 'Posts',
      posts: posts.toJSON(),
      active: 'posts'
    })
  }

  async create({ view, response, auth, params }) {
    if (auth.user === null) {
      return view.render('errors.createpost', {
        title: 'Please create an account to view this page.'
      })
    }
    checkPerm(auth.user.permissions, 1, response)
    const categories = await Category.all()
    let category;
    if (params.category_id) {
      category = await Category.find(params.category_id)
      return view.render('posts.create', {
        title: 'Create a Post',
        categories: categories.toJSON(),
        selectedCategory: category.toJSON(),
        active: 'create-post'
      })
    }

    return view.render('posts.create', {
      title: 'Create a Post',
      categories: categories.toJSON(),
      active: 'create-post'
    })
  }

  async store({ request, response, auth, session }) {
    checkPerm(auth.user.permissions, 1, response)
    const messages = {
      'title.required': 'Please enter a title.',
      'title.min': 'Title must be a minimum of 5 characters.',
      'description.required': 'Please enter a description.',
      'description.min': 'Description must be at least 20 characters.',
      'body.required': 'Please enter content.',
      'body.min': 'Please make sure your content is at least 10 characters.',
      'category.required': 'Please choose a category.'
    }
    const validation = await validate(request.all(), {
      title: 'required|min:5',
      description: 'required|min:20',
      body: 'required|min:10',
      category: 'required'
    }, messages)

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }

    const category = await Category.find(request.input('category'))
    const post = new Post()
    post.title = request.input('title')
    post.description = request.input('description')
    post.body = request.input('body')
    post.category_id = request.input('category')
    post.category_title = category.title
    post.user_id = auth.user.id
    post.username = auth.user.username
    await post.save()
    session.flash({ notificationSuccess: 'Successfully created your post.' })
    return response.redirect(`/posts/${post.id}`)
  }

  async show({ view, params, response }) {
    const post = await Post.find(params.id)
    const category = await Category.find(post.category_id)
    if (post === null) {
      return response.redirect('/404')
    }
    return view.render('posts.show', {
      title: post.title,
      post: post.toJSON(),
      category: category.toJSON(),
      active: 'posts'
    })
  }

  async edit({ view, params, response, auth }) {
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

  async update({ request, response, params, auth, session }) {

    const messages = {
      'title.required': 'Please enter a title.',
      'title.min': 'Title must be a minimum of 5 characters.',
      'title.max': 'Title must be no more than 50 characters.',
      'description.required': 'Please enter a description.',
      'description.min': 'Description must be at least 20 characters.',
      'body.required': 'Please enter content.',
      'body.min': 'Please make sure your content is at least 10 characters.',
      'category.required': 'Please select a category.'
    }

    const validation = await validate(request.all(), {
      title: 'required|min:5|max:50',
      description: 'required|min:20',
      body: 'required|min:10',
      category: 'required'
    }, messages)

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }

    const post = await Post.find(params.id)
    checkUser(auth.user, post.user_id, response, 3)
    checkPerm(auth.user.id, 1, response)
    post.title = request.input('title')
    post.description = request.input('description')
    post.body = request.input('body')
    post.category_id = request.input('category')
    await post.save()
    return response.redirect(`/posts/${post.id}`)
  }

  async destroy({ params, auth, response, session }) {
    const post = await Post.find(params.id)
    const category_id = post.category_id
    checkUser(auth.user, post.user_id, response, 2)
    checkPerm(auth.user.permissions, 1, response)
    try {
      await post.delete()
      session.flash({ notificationSuccess: 'Deleted the post.' })
      return response.redirect(`/posts/category/${category_id}`)
    }
    catch (e) {
      console.log(e)
      session.flash({ notificationError: 'Unable to delete this post.' })
      return response.redirect('back')
    }
  }

  async category({ params, view }) {
    const category = await Category.find(params.id)
    const posts = await category.posts().fetch()

    return view.render('posts.category', {
      title: category.title,
      category: category.toJSON(),
      posts: posts.toJSON(),
      active: 'posts'
    })
  }
}

module.exports = PostController
