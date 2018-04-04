'use strict'

/**
 * This trait is used to extend the capabilites of the Post model.
 */

class Post {
  register (Model, customOptions = {}) {
    Model.fetchAllAndJoin = async function () {
      return Model
        .query()
        .select('posts.id', 'posts.title', 'posts.description', 'posts.user_id', 'posts.category_id', 'users.username', 'categories.title as category_title')
        .innerJoin('users', 'posts.user_id', 'users.id')
        .innerJoin('categories', 'posts.category_id', 'categories.id')
        .fetch()
    }

    Model.findAndJoinByCategory = async function (id) {
      return Model
        .query()
        .select('posts.id', 'posts.title', 'posts.description', 'posts.user_id', 'posts.category_id', 'users.username', 'categories.title as category_title')
        .where('posts.category_id', id)
        .innerJoin('users', 'posts.user_id', 'users.id')
        .innerJoin('categories', 'posts.category_id', 'categories.id')
        .fetch()
    }

    Model.findOneAndJoin = async function (id) {
      return Model
        .query()
        .select('posts.id', 'posts.category_id', 'posts.title', 'posts.body', 'posts.user_id', 'posts.created_at', 'users.username', 'categories.title as category_title')
        .where('posts.id', id)
        .innerJoin('users', 'posts.user_id', 'users.id')
        .innerJoin('categories', 'posts.category_id', 'categories.id')
        .first()
    }

    Model.fetchAndJoinByUser = async function (id) {
      return Model
        .query()
        .select('posts.id', 'posts.title', 'posts.description', 'categories.title as category_title')
        .where('posts.user_id', id)
        .innerJoin('categories', 'posts.category_id', 'categories.id')
        .fetch()
    }
  }
}

module.exports = Post
