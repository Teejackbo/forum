'use strict'

const User = use('App/Models/User')

class CheckPermissionForChange {
  async handle ({ params, response, auth }, next) {
    const user = await User.find(params.id)
    params.perm = parseInt(params.perm)
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
      if (!this.checkPerm(auth.user.permissions, params.perm)) {
        return response.redirect('back')
      }
    } else {
      if (!this.checkPerm(auth.user.permissions, 3)) {
        return response.redirect('back')
      }
    }
    await next()
  }

  checkPerm (perm, reqPerm) {
    if (perm >= reqPerm + 1) {
      return true
    }
    return false
  }
}

module.exports = CheckPermissionForChange
