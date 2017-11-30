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
  title: "Jack's Forum"
})

Route
  .get('categories', 'CategoryController.index')
  .as('showCategories')

Route
  .get('categories/add', 'CategoryController.add')
  .middleware('auth')
  .as('addCategory')

Route
  .post('categories/add', 'CategoryController.store')
  .middleware('auth')
  .as('storeCategory')

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