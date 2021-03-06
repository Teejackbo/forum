'use strict'

/*
|--------------------------------------------------------------------------
| CategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class CategorySeeder {
  async run () {
    await Factory
      .model('App/Models/Category')
      .createMany(5)
  }
}

module.exports = CategorySeeder
