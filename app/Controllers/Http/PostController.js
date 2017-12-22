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

}

module.exports = PostController
