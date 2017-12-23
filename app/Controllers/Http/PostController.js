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
      posts: posts.toJSON()
    })
  }

  async create({ view, response, auth }) {
    checkPerm(auth.user.permissions, 1, response)
    const categories = await Category.all()
    return view.render('posts.create', {
      title: 'Create a Post',
      categories: categories.toJSON()
    })
  }

  async store({ request, response, auth, session }) {
    checkPerm(auth.user.permissions, 1, response)
    const messages = {
      'title.required': 'Please enter a title.',
      'title.min': 'Title must be a minimum of 5 characters.',
      'title.max': 'Title must be no more than 30 characters.',
      'description.required': 'Please enter a description.',
      'description.min': 'Description must be at least 20 characters.',
      'body.required': 'Please enter content.',
      'body.min': 'Please make sure your content is at least 10 characters.',
      'category.required': 'Please choose a category.'
    }
    const validation = await validate(request.all(), {
      title: 'required|min:5|max:30',
      description: 'required|min:20',
      body: 'required|min:10',
      category: 'required'
    }, messages)

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }

    const post = new Post()
    post.title = request.input('title')
    post.description = request.input('description')
    post.body = request.input('body')
    post.category_id = request.input('category')
    post.user_id = auth.user.id
    await post.save()
    session.flash({ notificationSuccess: 'Successfully created your post.' })
    return response.redirect(`/posts/${post.id}`)
  }

  async show({ view, params, response }) {
    const post = await Post.find(params.id)
    if (post === null) {
      return response.redirect('/404')
    }
    return view.render('posts.show', {
      title: post.title,
      post: post.toJSON()
    })
  }

  async edit({ view, params, response, auth }) {
    const post = await Post.find(params.id)
    const user = await User.find(post.user_id)
    const selectedCategory = await Category.find(post.category_id)
    const categories = await Category.all()

    checkUser(auth.user, post.user_id, response, 2)
    checkPerm(auth.user.id, 1, response)
    return view.render('posts.edit', {
      title: `Edit Post: ${post.title}`,
      post: post.toJSON(),
      user: user.toJSON(),
      categories: categories.toJSON(),
      selectedCategory: selectedCategory.toJSON()
    })
  }

  async update({ request, response, params, auth, session }) {

    const messages = {
      'title.required': 'Please enter a title.',
      'title.min': 'Title must be a minimum of 5 characters.',
      'title.max': 'Title must be no more than 30 characters.',
      'description.required': 'Please enter a description.',
      'description.min': 'Description must be at least 20 characters.',
      'body.required': 'Please enter content.',
      'body.min': 'Please make sure your content is at least 10 characters.',
      'category.required': 'Please select a category.'
    }

    const validation = await validate(request.all(), {
      title: 'required|min:5|max:30',
      description: 'required|min:20',
      body: 'required|min:10',
      category: 'required'
    }, messages)

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }

    const post = await Post.find(params.id)
    checkUser(auth.user, post.user_id, response, 2)
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
    checkUser(auth.user, post.user_id, response, 2)
    checkPerm(auth.user.permissions, 1, response)
    try {
      await post.delete()
      session.flash({ notificationSuccess: 'Deleted the post.' })
      return response.redirect(`/categories/${post.category_id}`)
    }
    catch (e) {
      console.log(e)
      session.flash({ notificationError: 'Unable to delete this post.' })
      return response.redirect('back')
    }
  }

}

module.exports = PostController
