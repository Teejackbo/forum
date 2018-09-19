// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('login', user => {
  cy.logout()
  cy.request({
    url: '/csrf',
    method: 'GET'
  }).then(({ body: token }) => {
    cy.request({
      url: '/login',
      method: 'POST',
      body: {
        email: `${user}@${user}.${user}`,
        password: user,
        _csrf: token
      }
    })
  })
  cy.log(`Logged in as ${user}.`)
})

Cypress.Commands.add('logout', () => {
  cy.request({
    url: '/logout',
    method: 'GET'
  })
  cy.log('Logged out.')
})
