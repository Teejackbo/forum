'use strict'

const Schema = use('Schema')

class PostsSchema extends Schema {
  up() {
    this.create('posts', table => {
      table.increments()
      table.mediumText('title')
      table.mediumText('description')
      table.longText('body')
      table.integer('category_id')
      table.string('category_title')
      table.integer('user_id')
      table.string('username')
      table.timestamps()
    })
  }

  down() {
    this.drop('posts')
  }
}

module.exports = PostsSchema
