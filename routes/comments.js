'use strict'

const Route = use('Route')

Route
  .post('/posts/:id/comment', 'CommentController.store')
  .middleware('auth')
  .validator('Comment/Store')
  .as('postComment')
