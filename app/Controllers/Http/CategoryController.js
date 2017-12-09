'use strict'

const Category = use('App/Models/Category')
const { validate } = use('Validator')

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
    try {
      await auth.getUser()
      if (auth.user.permissions <= 2) {
        return response.redirect('/404')
      }
    }
    catch (err) {
      console.log(err)
    }

    return view.render('categories.add', {
      title: 'Add a category.'
    })
  }

  async store({ view, request, response, session, auth }) {
    try {
      await auth.getUser()
      if (auth.user.permissions <= 2) {
        return response.redirect('/404')
      }
    }
    catch (err) {
      console.log(err)
      return response.redirect('/404')
    }

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
    session.flash({ notificationSuccess: 'Category added.' })
    const category = new Category()
    category.title = request.input('title')
    category.description = request.input('description')
    await category.save()
    return response.redirect('/categories')
  }

  async manage({ view, auth, response }) {
    try {
      await auth.getUser()
      if (auth.user.permissions <= 2) {
        return response.redirect('/404')
      }
    }
    catch (err) {
      console.log(err)
      return response.redirect('/404')
    }

    const categories = await Category.all()

    return view.render('categories.manage', {
      title: 'Manage Categories',
      categories: categories.toJSON()
    })
  }

  async destroy({ request, response, view, auth, session }) {
    try {
      await auth.getUser()
      if (auth.user.permission <= 2) {
        return response.redirect('/404')
      }
      const category = await Category.find(request.params.id)
      await category.delete()
      session.flash({ notificationSuccess: 'Category deleted. ' })
      return response.redirect('/categories')
    }
    catch (err) {
      console.log(err)
      session.flash({ notificationError: 'Failed to delete category.' })
      return response.redirect('/categories')
    }
  }
}

module.exports = CategoryController
