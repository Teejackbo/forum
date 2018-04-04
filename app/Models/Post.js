'use strict'

const Model = use('Model')

class Post extends Model {
  static boot () {
    super.boot()
    this.addTrait('Post')
  }
  getCreatedAt (created_at) { //eslint-disable-line
    return created_at.format('dddd, MMMM Do YYYY, h:mm:ss a')
  }

  category () {
    return this.hasOne('App/Models/Category')
  }

  user () {
    return this.hasOne('App/Models/User')
  }

  comments () {
    return this.hasMany('App/Models/Comment')
  }
}

module.exports = Post
