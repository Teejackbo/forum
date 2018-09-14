'use strict'

const Schema = use('Schema')

class RankSchema extends Schema {
  up () {
    this.create('ranks', table => {
      table.increments()
      table.string('rank')
    })
  }

  down () {
    this.drop('ranks')
  }
}

module.exports = RankSchema
