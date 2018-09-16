'use strict'

/*
|--------------------------------------------------------------------------
| PostSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class PostSeeder {
  async run () {
    for (let i = 1; i < 17; i++) {
      for (let j = 1; j < 6; j++) {
        await Factory
          .model('App/Models/Post')
          .create({ user_id: i, category_id: j })
      }
    }
  }
}

module.exports = PostSeeder
