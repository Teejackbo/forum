'use strict'

const Model = use('Model')

class Comment extends Model {
  static boot () {
    super.boot()
    this.addTrait('Comment')
  }

  getCreatedAt (created_at) { //eslint-disable-line
    return created_at.format('dddd, MMMM Do YYYY, h:mm:ss a')
  }

  post () {
    return this.belongsTo('App/Models/Post')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Comment
