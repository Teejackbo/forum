'use strict'

const Route = use('Route')

use('Routes/users')
use('Routes/categories')
use('Routes/posts')
use('Routes/comments')

Route.on('/').render('welcome', {
  title: "Jack's Forum",
  active: 'home'
})

Route.get('/404', ({ view }) => view.render('errors.404', { title: '404' }))
Route.get('/permission', ({ view }) => view.render('errors.permission', { title: 'You do not have permission to view this page.' }))
Route.any('*', ({ response }) => response.redirect('/404'))
