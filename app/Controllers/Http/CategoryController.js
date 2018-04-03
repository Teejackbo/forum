'use strict'

const Category = use('App/Models/Category')
const { checkPerm } = use('App/Models/Helpers/UserHelper')

class CategoryController {
  async index ({ view }) {
    const categories = await Category.all()
    return view.render('categories.index', {
      title: 'Categories',
      categories: categories.toJSON(),
      active: 'categories'
    })
  }

  async create ({ view, auth, response }) {
    checkPerm(auth.user.permissions, 2, response)

    return view.render('categories.add', {
      title: 'Add a category.',
      active: 'categories'
    })
  }

  async store ({ request, response, session, auth }) {
    checkPerm(auth.user.permissions, 2, response)
    const { title, description } = request.all()
    await Category.create({ title, description })
    session.flash({ notificationSuccess: 'Category added.' })
    return response.route('categories.index')
  }

  async edit ({ request, response, view, auth, session, params }) {
    checkPerm(auth.user.permissions, 2, response)
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

  async update ({ request, response, view, auth, session, params }) {
    checkPerm(auth.user.permissions, 2, response)
    const { title, description } = request.all()
    const category = await Category.find(params.id)
    category.merge({ title, description })
    await category.save()
    session.flash({ notificationSuccess: 'Edited category.' })
    return response.route('categories.index')
  }

  async destroy ({ request, response, view, auth, session, params }) {
    checkPerm(auth.user.permissions, 2, response)
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
