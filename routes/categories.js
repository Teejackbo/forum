'use strict'

const Route = use('Route')

Route
  .resource('categories', 'CategoryController')
  .except(['show'])
  .middleware(new Map([
    [['categories.create', 'categories.store', 'categories.edit', 'categories.update', 'categories.destroy'], ['auth']]
  ]))
