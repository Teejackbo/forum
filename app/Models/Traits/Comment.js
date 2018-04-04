'use strict'

/**
 * This trait is used to extend the capabilities of the Comment model.
 */

class Comment {
  register (Model, customOptions = {}) {
    Model.findAndJoin = async function (id) {
      return Model
        .query()
        .select('comments.id', 'comments.user_id', 'comments.body', 'comments.created_at', 'users.username')
        .where('comments.post_id', id)
        .innerJoin('users', 'comments.user_id', 'users.id')
        .fetch()
    }
  }
}

module.exports = Comment
