'use strict'

const Category = use('App/Models/Category')

class CategoryController {
  async index({ view }) {
    const categories = await Category.all()

    return view.render('categories.index', {
      title: 'Categories',
      categories: categories.toJSON()
    })
  }
}

module.exports = CategoryController
