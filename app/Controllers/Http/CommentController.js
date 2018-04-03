'use strict'

const Comment = use('App/Models/Comment')

class CommentController {
  async store ({ request, response, auth, params, session }) {
    await Comment.create({
      body: request.input('comment'),
      post_id: params.id,
      user_id: auth.user.id
    })
    return response.route('posts.show', { id: params.id })
  }
}

module.exports = CommentController
