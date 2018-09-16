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
    return this.hasOne('App/Models/Category', 'category_id', 'id')
  }

  user () {
    return this.hasOne('App/Models/User', 'user_id', 'id')
  }

  comments () {
    return this.hasMany('App/Models/Comment')
  }
}

module.exports = Post
