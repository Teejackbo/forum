'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker, i, data) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: faker.password(),
    permissions: data.permissions
  }
})

Factory.blueprint('App/Models/Category', (faker, i, data) => {
  return {
    title: faker.word(),
    description: faker.sentence({ words: 7 })
  }
})
