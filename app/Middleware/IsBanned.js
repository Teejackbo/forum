'use strict'

class IsBanned {
  async handle ({ response, auth }, next) {
    if (auth.user.permissions === 1) {
      return response.redirect('/404')
    }
    await next()
  }
}

module.exports = IsBanned
