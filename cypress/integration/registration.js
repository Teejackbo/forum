describe('Registration', () => {
  before(() => {
    cy.exec('adonis migration:refresh')
    cy.exec('adonis seed')
  })

  it('Should load the registration page.', () => {
    cy.visit('/register')
    cy.get('input[name="username"]')
    cy.get('input[name="email"]')
    cy.get('input[name="password"]')
    cy.get('input[name="password_confirmation"]')
    cy.contains('Register!')
  })

  it('Should display an alert if username is empty.', () => {
    cy.visit('/register')
    cy.get('form').submit()
    cy.contains('username')
  })

  it('Should display an alert if username is taken.', () => {
    cy.visit('/register')
    cy.get('input[name="username"]').type('user')
    cy.get('form').submit()
    cy.contains('chosen')
  })

  it('Should display an alert if email is empty.', () => {
    cy.visit('/register')
    cy.get('input[name="username"]').type('new-user')
    cy.get('form').submit()
    cy.contains('email')
  })

  it('Should display an alert if email is invalid.', () => {
    cy.visit('/register')
    cy.get('input[name="username"]').type('new-user')
    cy.get('input[name="email"]').type('not an email')
    cy.get('form').submit()
    cy.contains('invalid email')
  })

  it('Should display an alert if email is taken.', () => {
    cy.visit('/register')
    cy.get('input[name="username"]').type('new-user')
    cy.get('input[name="email"]').type('user@user.user')
    cy.get('form').submit()
    cy.contains('already registered')
  })

  it('Should display an alert if password is empty.', () => {
    cy.visit('/register')
    cy.get('input[name="username"]').type('new-user')
    cy.get('input[name="email"]').type('newuser@newuser.newuser')
    cy.get('form').submit()
    cy.contains('password')
  })

  it('Should display an alert if password confirmation is empty.', () => {
    cy.visit('/register')
    cy.get('input[name="username"]').type('new-user')
    cy.get('input[name="email"]').type('newuser@newuser.newuser')
    cy.get('input[name="password"]').type('newuser')
    cy.get('form').submit()
    cy.contains('confirm')
  })

  it('Should display an alert if password confirmation does not match password.', () => {
    cy.visit('/register')
    cy.get('input[name="username"]').type('new-user')
    cy.get('input[name="email"]').type('newuser@newuser.newuser')
    cy.get('input[name="password"]').type('newuser')
    cy.get('input[name="password_confirmation"]').type('does not match')
    cy.get('form').submit()
    cy.contains('match')
  })

  it('Should successfully register the user.', () => {
    cy.visit('/register')
    cy.get('input[name="username"]').type('new-user')
    cy.get('input[name="email"]').type('newuser@newuser.newuser')
    cy.get('input[name="password"]').type('newuser')
    cy.get('input[name="password_confirmation"]').type('newuser')
    cy.get('form').submit()
    cy.contains('Registered successfully')
    cy.contains('new-user')
  })
})
