'use strict'

const Category = use('App/Models/Category')
const { validate } = use('Validator')
const { checkPerm } = use('App/Models/Helpers/UserHelper')
/*
TODO:
  Refactor this controller to use a route resource.
*/

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
    const posts = await category.posts().fetch()

    return view.render('categories.details', {
      title: category.title,
      category: category.toJSON(),
      posts: posts.toJSON()
    })
  }

  async add({ view, auth, response }) {
    checkPerm(auth.user.permissions, 2, response)

    return view.render('categories.add', {
      title: 'Add a category.'
    })
  }

  async store({ view, request, response, session, auth }) {
    checkPerm(auth.user.permissions, 2, response)

    const messages = {
      'title.required': 'Please enter a title.',
      'description.required': 'Please enter a description.'
    }

    const validation = await validate(request.all(), {
      title: 'required',
      description: 'required'
    }, messages)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()
      return response.redirect('back')
    }
    const category = new Category()
    category.title = request.input('title')
    category.description = request.input('description')
    await category.save()
    session.flash({ notificationSuccess: 'Category added.' })
    return response.redirect('/categories/manage')
  }

  async manage({ view, auth, response }) {
    checkPerm(auth.user.permissions, 2, response)

    const categories = await Category.all()

    return view.render('categories.manage', {
      title: 'Manage Categories',
      categories: categories.toJSON()
    })
  }

  async destroy({ request, response, view, auth, session, params }) {
    checkPerm(auth.user.permissions, 2, response)
    try {
      const category = await Category.find(params.id)
      await category.delete()
      session.flash({ notificationSuccess: 'Category deleted.' })
      return response.redirect('/categories/manage')
    }
    catch (e) {
      console.log(e)
      session.flash({ notificationError: 'Failed to delete category.' })
      return response.redirect('/categories')
    }
  }

  async edit({ request, response, view, auth, session, params }) {
    checkPerm(auth.user.permissions, 2, response)
    try {
      const category = await Category.find(params.id)
      return view.render('categories.edit', {
        title: 'Edit Category',
        category: category.toJSON()
      })
    }
    catch (e) {
      session.flash({ notificationError: 'Could not find this category.' })
      return view.render('categories.manage')
    }
  }

  async update({ request, response, view, auth, session, params }) {
    checkPerm(auth.user.permissions, 2, response)

    const messages = {
      'title.required': 'Please enter a title.',
      'description.required': 'Please enter a description.'
    }

    const validation = await validate(request.all(), {
      title: 'required',
      description: 'required'
    }, messages)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()
      return response.redirect('back')
    }

    const category = await Category.find(params.id)
    category.title = request.input('title')
    category.description = request.input('description')

    await category.save()

    session.flash({ notificationSuccess: 'Edited category.' })

    return response.redirect('/categories/manage')
  }
}

module.exports = CategoryController
