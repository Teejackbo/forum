'use strict'

const Category = use('App/Models/Category')

class CategoryController {
  async index ({ view }) {
    const categories = await Category.all()
    return view.render('categories.index', {
      title: 'Categories',
      categories: categories.toJSON(),
      active: 'categories'
    })
  }

  async create ({ view }) {
    return view.render('categories.add', {
      title: 'Add a category.',
      active: 'categories'
    })
  }

  async store ({ request, response, session }) {
    const { title, description } = request.all()
    await Category.create({ title, description })
    session.flash({ notificationSuccess: 'Category added.' })
    return response.route('categories.index')
  }

  async edit ({ response, view, session, params }) {
    try {
      const category = await Category.find(params.id)
      return view.render('categories.edit', {
        title: 'Edit Category',
        category: category.toJSON(),
        active: 'categories'
      })
    } catch (e) {
      session.flash({ notificationError: 'Could not find this category.' })
      return response.redirect('back')
    }
  }

  async update ({ request, response, session, params }) {
    const { title, description } = request.all()
    const category = await Category.find(params.id)
    category.merge({ title, description })
    await category.save()
    session.flash({ notificationSuccess: 'Edited category.' })
    return response.route('categories.index')
  }

  async destroy ({ response, session, params }) {
    try {
      const category = await Category.find(params.id)
      await category.delete()
      session.flash({ notificationSuccess: 'Category deleted.' })
      return response.route('categories.index')
    } catch (e) {
      console.log(e)
      session.flash({ notificationError: 'Failed to delete category.' })
      return response.route('categories.index')
    }
  }
}

module.exports = CategoryController
