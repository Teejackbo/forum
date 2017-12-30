'use strict'

const Schema = use('Schema')

class RankSchema extends Schema {
  up () {
    this.table('ranks', (table) => {
      // alter table
    })
  }

  down () {
    this.table('ranks', (table) => {
      // reverse alternations
    })
  }
}

module.exports = RankSchema
