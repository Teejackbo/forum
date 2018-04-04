'use strict'

/**
 * This trait is used to extend the capabilities of the user model.
 */

class User {
  register (Model, customOptions = {}) {
    Model.findAndJoinRank = async function (id) {
      return Model
        .query()
        .select('users.id', 'username', 'rank', 'permissions')
        .where('users.id', id)
        .innerJoin('ranks', 'ranks.id', 'permissions')
        .first()
    }
  }
}

module.exports = User
