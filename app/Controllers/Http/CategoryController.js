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

  async view({ view, params }) {
    const category = await Category.find(params.id)
    return view.render('categories.details', {
      title: category.title,
      category: category.toJSON()
    })
  }
}

module.exports = CategoryController
