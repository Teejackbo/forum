'use strict'

const Route = use('Route')

Route
  .group(() => {
    Route
      .get('/', 'UserController.index')
      .as('loginForm')

    Route
      .post('/', 'UserController.login')
      .as('login')
  })
  .prefix('login')

Route
  .group(() => {
    Route
      .get('/', 'UserController.register')
      .as('registerForm')

    Route
      .post('/', 'UserController.store')
      .as('register')
  })
  .prefix('register')

Route
  .get('logout', 'UserController.logout')
  .as('logout')

Route
  .get('profile/:id', 'UserController.show')

Route
  .put('/users/:id/:perm', 'UserController.changePerm')
