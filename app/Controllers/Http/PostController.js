'use strict'

const Post = use('App/Models/Post')
const { validate } = use('Validator')

class PostController {
  async index({ view }) {
    const posts = await Post.all()
    return view.render('posts.index', {
      title: 'Posts',
      posts: posts.toJSON()
    })
  }
}

module.exports = PostController
