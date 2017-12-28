'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.on('/').render('welcome', {
  title: "Jack's Forum",
  active: 'home'
})

/*
  TODO:
    Refactor categories to use a route resource rather than a load of separate routes.
*/

Route
  .get('categories', 'CategoryController.index')
  .as('showCategories')

Route
  .get('categories/manage/add', 'CategoryController.add')
  .middleware('auth')
  .as('addCategory')

Route
  .post('categories/manage/add', 'CategoryController.store')
  .middleware('auth')
  .as('storeCategory')

Route
  .get('categories/manage', 'CategoryController.manage')
  .middleware('auth')
  .as('manageCategories')

Route
  .get('categories/manage/:id', 'CategoryController.edit')
  .middleware('auth')

Route
  .delete('/categories/:id', 'CategoryController.destroy')
  .middleware('auth')

Route
  .put('/categories/:id', 'CategoryController.update')
  .middleware('auth')

Route
  .get('/categories/:id', 'CategoryController.view')
  .as('viewCategory')

Route
  .get('login', 'UserController.index')
  .as('loginForm')

Route
  .post('login', 'UserController.login')
  .as('login')

Route
  .get('register', 'UserController.register')
  .as('registerForm')

Route
  .post('register', 'UserController.store')
  .as('register')

Route
  .get('logout', 'UserController.logout')
  .as('logout')

Route.resource('posts', 'PostController')
  .except(['index', 'show'])
  .middleware('auth')

Route.get('/posts', 'PostController.index')
Route.get('/posts/:id', 'PostController.show')

Route.get('/404', ({ view }) => view.render('errors.404', { title: '404' }))
Route.get('/permission', ({ view }) => view.render('errors.permission', { title: 'You do not have permission to view this page.' }))
Route.any('*', ({ response }) => response.redirect('/404'))