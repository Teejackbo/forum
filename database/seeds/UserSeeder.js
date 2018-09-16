'use strict'

const Factory = use('Factory')
const User = use('App/Models/User')

class UserSeeder {
  async run () {
    const users = [
      {
        username: 'banned',
        email: 'banned@banned.banned',
        password: 'banned',
        permissions: 1
      },
      {
        username: 'user',
        email: 'user@user.user',
        password: 'user',
        permissions: 2
      },
      {
        username: 'moderator',
        email: 'moderator@moderator.moderator',
        password: 'moderator',
        permissions: 3
      },
      {
        username: 'admin',
        email: 'admin@admin.admin',
        password: 'admin',
        permissions: 4
      },
      {
        username: 'super-admin',
        email: 'super-admin@super-admin.super-admin',
        password: 'super-admin',
        permissions: 5
      }
    ]

    await User.createMany(users)

    await Factory
      .model('App/Models/User')
      .createMany(3, { permissions: 1 })

    await Factory
      .model('App/Models/User')
      .createMany(5, { permissions: 2 })

    await Factory
      .model('App/Models/User')
      .createMany(3, { permissions: 3 })

    await Factory
      .model('App/Models/User')
      .createMany(3, { permissions: 4 })

    await Factory
      .model('App/Models/User')
      .createMany(2, { permissions: 5 })
  }
}

module.exports = UserSeeder
