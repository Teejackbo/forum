'use strict'

const Post = use('App/Models/Post')
const Category = use('App/Models/Category')
const { validate } = use('Validator')
const { checkPerm } = use('App/Models/Helpers/UserHelper')

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
    await post.save()
    session.flash({ notificationSuccess: 'Successfully created your post.' })
    return response.redirect(`/posts`)
  }

  async show({ view, params }) {
    const post = await Post.find(params.id)
    return view.render('posts.show', {
      title: post.title,
      post: post.toJSON()
    })
  }

}

module.exports = PostController
