'use strict'

const Comment = use('App/Models/Comment')
const Post = use('App/Models/Post')
const User = use('App/Models/User')
const { checkPerm } = use('App/Models/Helpers/UserHelper')
const { validate } = use('Validator')

class CommentController {
  async store({ request, response, auth, params, session }) {
    checkPerm(auth.user.permissions, 1, response)

    const messages = {
      'comment.required': 'You must enter a comment.',
      'comment.min': 'Your comment must be a minimum of 3 characters.'
    }

    const validation = await validate(request.all(), {
      comment: 'required|min:3'
    }, messages)

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }

    const comment = new Comment()
    comment.body = request.input('comment')
    comment.post_id = params.id
    comment.user_id = auth.user.id
    await comment.save()
    return response.redirect(`/posts/${params.id}`)
  }
}

module.exports = CommentController
