describe('Login', () => {
  before(() => {
    cy.exec('adonis migration:refresh')
    cy.exec('adonis seed')
  })

  it('Should load the login page.', () => {
    cy.visit('/login')

    cy.get('input[name="email"]')
    cy.get('input[name="password"]')
    cy.get('button[type="submit"]')
  })

  it('Should show an alert if the email is empty.', () => {
    cy.visit('/login')

    cy.get('form').submit()
    cy.get('.alert-dg')
  })

  it('Should show an alert if the password is empty.', () => {
    cy.visit('/login')

    cy.get('input[name="email"]').type('user@user.user')
    cy.get('form').submit()
    cy.get('.alert-dg')
  })

  it('Should show an alert if the email doesn\'t exist.', () => {
    cy.visit('/login')

    cy.get('input[name="email"]').type('a@a.a')
    cy.get('input[name="password"]').type('password')
    cy.get('form').submit()
    cy.get('.alert-dg')
  })

  it('Should show an alert if the password is wrong.', () => {
    cy.visit('/login')

    cy.get('input[name="email"]').type('user@user.user')
    cy.get('input[name="password"]').type('password')
    cy.get('form').submit()
    cy.get('.alert-dg')
  })

  it('Should successfully log in the user if credentials are correct.', () => {
    cy.visit('/login')

    cy.get('input[name="email"]').type('user@user.user')
    cy.get('input[name="password"]').type('user')
    cy.get('form').submit()
    cy.get('.alert-success')
    cy.url().should('eq', 'http://localhost:3333/')
    cy.contains('user')
  })
})
