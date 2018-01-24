'use strict'

const Model = use('Model')

class Comment extends Model {
  // getCreatedAt(created_at) {
  //   return created_at.format("dddd, MMMM Do YYYY, h:mm:ss a")
  // }

  post() {
    return this.belongsTo('App/Models/Post')
  }

  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Comment
