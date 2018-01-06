'use strict'

const User = use('App/Models/User')
const Post = use('App/Models/Post')
const Rank = use('App/Models/Rank')
const { validate } = use('Validator')
const { checkUser, checkPerm } = use('App/Models/Helpers/UserHelper')

class UserController {
  async index({ view }) {
    return view.render('users.login', {
      title: 'Login',
      active: 'login'
    })
  }

  async login({ request, response, auth, session }) {
    const { email, password } = request.all()

    const messages = {
      'email.required': 'Please enter an email.',
      'password.required': 'Please enter a password.'
    }

    const validation = await validate(request.all(), {
      email: 'required',
      password: 'required'
    }, messages)

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }

    try {
      await auth.attempt(email, password)
      session.flash({ notificationSuccess: 'Logged in successfully.' })
      return response.redirect('/')
    }
    catch (err) {
      console.log(err)
      session.flash({ notificationError: 'Failed to log in. Please check your credentials.' })
      return response.redirect('back')
    }
  }

  async register({ view }) {
    return view.render('users.register', {
      title: 'Register',
      active: 'register'
    })
  }

  async store({ request, response, session, auth }) {
    const messages = {
      'username.required': 'Please choose a username.',
      'username.unique': 'Sorry, this username has already been chosen.',
      'email.required': 'Please enter an email.',
      'email.email': 'Sorry, this is an invalid email.',
      'email.unique': 'This email is already registered.',
      'password.required': 'Please enter a password.',
      'password_confirmation.required_if': 'Please confirm your password.',
      'password_confirmation.same': 'Passwords do not match.'
    }

    const validation = await validate(request.all(), {
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required',
      password_confirmation: 'required_if:password|same:password'
    }, messages)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])
      return response.redirect('back')
    }

    const user = new User()
    user.username = request.input('username')
    user.email = request.input('email')
    user.password = request.input('password')
    user.permissions = 1
    await user.save()
    session.flash({ notificationSuccess: 'Registered successfully.' })
    await auth.attempt(request.input('email'), request.input('password'))
    return response.redirect('/')
  }

  async logout({ auth, response, session }) {
    try {
      auth.logout()
      session.flash({ notificationSuccess: 'Logged out successfully.' })
      return response.redirect('/')
    }
    catch (e) {
      console.log(e)
      session.flash({ notificationError: 'Did not log out.' })
      return response.redirect('back')
    }
  }

  async show({ params, view, response }) {
    const user = await User.find(params.id)
    if (user === null) {
      return response.redirect('/404')
    }
    const rank = await Rank.find(user.permissions)
    const posts = await user.posts().fetch()
    return view.render('users.show', {
      title: user.username,
      user: user.toJSON(),
      rank: rank.rank,
      posts: posts.toJSON(),
      active: 'profile'
    })
  }

  async changePerm({ params, auth, response, session }) {
    checkPerm(auth.user.permissions, 2, response)
    const user = await User.find(params.id)
    if (params.perm < 0 || params.perm > 4) {
      return response.redirect('back')
    }
    if (auth.user.permissions < user.permissions) {
      return response.redirect('back')
    }
    if (auth.user.id === user.id) {
      return response.redirect('back')
    }
    if (params.perm !== 4) {
      checkPerm(auth.user.permissions, params.perm + 1, response)
    }
    else {
      checkPerm(auth.user.permissions, 4, response)
    }
    user.permissions = params.perm
    await user.save()
    return response.redirect('back')
  }
}

module.exports = UserController
