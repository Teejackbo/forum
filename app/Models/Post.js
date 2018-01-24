'use strict'

const Model = use('Model')

class Post extends Model {
  category() {
    return this.hasOne('App/Models/Category')
  }

  user() {
    return this.hasOne('App/Models/User')
  }

  comments() {
    return this.hasMany('App/Models/Comment')
  }
}

module.exports = Post
