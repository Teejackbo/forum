'use strict'

const Route = use('Route')

Route.resource('posts', 'PostController')
  .middleware(new Map([
    [['posts.store', 'posts.edit', 'posts.update', 'posts.destroy'], ['auth']]
  ]))

Route
  .group(() => {
    Route
      .get('category/:id', 'PostController.category')
      .as('postsInCategory')

    Route
      .get('create/:category_id', 'PostController.create')
      .as('createPostWithCategory')
  })
  .prefix('posts')
