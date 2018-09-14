'use strict'

const Database = use('Database')

class RankSeeder {
  async run () {
    const ranks = [
      { rank: 'Banned' },
      { rank: 'User' },
      { rank: 'Moderator' },
      { rank: 'Admin' },
      { rank: 'Super Admin' }
    ]

    await Database.from('ranks').insert(ranks)
  }
}

module.exports = RankSeeder
