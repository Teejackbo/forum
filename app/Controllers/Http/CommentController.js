'use strict'

const Comment = use('App/Models/Comment')
const Post = use('App/Models/Post')
const User = use('App/Models/User')
const { checkPerm } = use('App/Models/Helpers/UserHelper')

class CommentController {
  async store({ request, response, auth, params }) {
    checkPerm(auth.user.permissions, 1, response)

    const comment = new Comment()
    comment.body = request.input('comment-body')
    comment.post_id = params.id
    comment.user_id = auth.user.id
    await comment.save()
    return response.redirect(`/posts/${params.id}`)
  }
}

module.exports = CommentController
