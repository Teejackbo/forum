'use strict'

const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()
    this.addTrait('User')
    this.addHook('beforeCreate', 'User.hashPassword')
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  posts () {
    return this.hasMany('App/Models/Post')
  }

  comments () {
    return this.hasMany('App/Models/Comment')
  }
}

module.exports = User
