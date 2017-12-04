'use strict'

const Model = use('Model')

class Post extends Model {
  category () {
    return this.hasOne('App/Models/Category')
  }
}

module.exports = Post
