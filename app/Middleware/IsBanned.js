'use strict'

class IsBanned {
  async handle ({ response, auth }, next) {
    if (auth.user.permissions < 0) {
      return response.redirect('/404')
    }
    await next()
  }
}

module.exports = IsBanned
