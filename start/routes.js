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

Route
  .resource('categories', 'CategoryController')
  .except(['show'])
  .middleware(new Map([
    [['categories.create', 'categories.store', 'categories.edit', 'categories.update', 'categories.destroy'], ['auth']]
  ]))

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

Route
  .get('profile/:id', 'UserController.show')

Route
  .put('/users/:id/:perm', 'UserController.changePerm')

Route.resource('posts', 'PostController')
  .middleware(new Map([
    [['posts.store', 'posts.edit', 'posts.update', 'posts.destroy'], ['auth']]
  ]))

Route.get('/posts/category/:id', 'PostController.category')
Route.get('/posts/create/:category_id', 'PostController.create')

Route
  .post('/posts/:id/comment', 'CommentController.store')
  .middleware('auth')

Route.get('/404', ({ view }) => view.render('errors.404', { title: '404' }))
Route.get('/permission', ({ view }) => view.render('errors.permission', { title: 'You do not have permission to view this page.' }))
Route.any('*', ({ response }) => response.redirect('/404'))
