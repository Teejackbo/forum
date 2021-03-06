'use strict'

class IsModerator {
  async handle ({ response, auth }, next) {
    if (auth.user.permissions < 3) {
      return response.redirect('/404')
    }
    await next()
  }
}

module.exports = IsModerator
