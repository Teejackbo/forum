module.exports = {
  checkPerm: function (perm, reqPerm, response) {
    try {
      if (perm <= reqPerm) {
        return response.redirect('/404')
      }
    }
    catch (e) {
      return response.redirect('/404');
      console.log(e)
    }
  }
}