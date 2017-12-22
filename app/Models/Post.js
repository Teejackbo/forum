'use strict'

const Model = use('Model')

class Post extends Model {
  category() {
    return this.hasOne('App/Models/Category')
  }

  user() {
    return this.hasOne('App/Models/User')
  }
}

module.exports = Post
