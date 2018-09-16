'use strict'

const Route = use('Route')

Route
  .group(() => {
    Route
      .get('/', 'UserController.index')
      .as('loginForm')

    Route
      .post('/', 'UserController.login')
      .validator('User/Login')
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
      .validator('User/Store')
      .as('register')
  })
  .prefix('register')

Route
  .get('logout', 'UserController.logout')
  .as('logout')

Route
  .get('profile/:username', 'UserController.show')
  .as('showUser')

Route
  .put('/users/:id/:perm', 'UserController.changePerm')
  .middleware(['IsModerator', 'CheckPermissionForChange'])
  .as('changeUserPerm')
