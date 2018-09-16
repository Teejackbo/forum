'use strict'

class IsUser {
  async handle ({ response, auth }, next) {
    if (auth.user.permissions < 2) {
      return response.redirect('/404')
    }
    await next()
  }
}

module.exports = IsUser
