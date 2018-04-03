'use strict'

const Route = use('Route')

Route
  .post('/posts/:id/comment', 'CommentController.store')
  .middleware(['auth', 'IsUser'])
  .validator('Comment/Store')
  .as('postComment')
