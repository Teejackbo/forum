'use strict'

const Comment = use('App/Models/Comment')
const Post = use('App/Models/Post')
const User = use('App/Models/User')
const { checkPerm } = use('App/Models/Helpers/UserHelper')

class CommentController {
  async create({ response, view, params, auth}) {
    checkPerm(auth.user.permissions, 1, response)

    const post = await Post
      .query()
      .select('posts.title', 'posts.title', 'posts.user_id', 'posts.body', 'posts.created_at', 'users.username')
      .where('posts.id', params.id)
      .innerJoin('users', 'posts.user_id', 'users.id')
      .first()

    return view.render('comments.create', {
      title: `Comment on ${post.title}.`,
      post: post.toJSON()
    })
  }
}

module.exports = CommentController
