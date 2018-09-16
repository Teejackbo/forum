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
  cy.get('meta[name="csrf"]').then(tag => {
    cy.request({
      url: '/login',
      method: 'POST',
      body: {
        email: `${user}@${user}.${user}`,
        password: user,
        _csrf: tag.attr('content')
      }
    })
  })
})
