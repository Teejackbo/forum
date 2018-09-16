'use strict'

const User = use('App/Models/User')
const Post = use('App/Models/Post')

class UserController {
  async index ({ view }) {
    return view.render('users.login', {
      title: 'Login',
      active: 'login'
    })
  }

  async login ({ request, response, auth, session }) {
    const { email, password } = request.all()
    try {
      await auth.attempt(email, password)
      session.flash({ notificationSuccess: 'Logged in successfully.' })
      return response.route('index')
    } catch (err) {
      session.flash({ notificationError: 'Failed to log in. Please check your credentials.' })
      return response.redirect('back')
    }
  }

  async register ({ view }) {
    return view.render('users.register', {
      title: 'Register',
      active: 'register'
    })
  }

  async store ({ request, response, session, auth }) {
    const { username, email, password } = request.all()
    await User.create({
      username,
      email,
      password,
      permissions: 2
    })
    session.flash({ notificationSuccess: 'Registered successfully.' })
    await auth.attempt(email, password)
    return response.route('index')
  }

  async logout ({ auth, response, session }) {
    await auth.logout()
    session.flash({ notificationSuccess: 'Logged out successfully.' })
    return response.route('index')
  }

  async show ({ params, view, response }) {
    const user = await User.findAndJoinRank(params.id)
    const posts = await Post.fetchAndJoinByUser(user.id)

    if (user === null) {
      return response.redirect('/404')
    }

    return view.render('users.show', {
      title: user.username,
      user: user.toJSON(),
      posts: posts.toJSON(),
      active: 'profile'
    })
  }

  async changePerm ({ params, auth, response, session }) {
    const user = await User.find(params.id)
    user.permissions = params.perm
    await user.save()
    return response.redirect('back')
  }
}

module.exports = UserController
