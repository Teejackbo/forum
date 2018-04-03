module.exports = {
  checkUser: function (user, reqId, response, permOverride) {
    if (user.permissions >= permOverride) {
      return
    }
    if (user.id !== reqId) {
      return response.redirect('/permission')
    }
  }
}
