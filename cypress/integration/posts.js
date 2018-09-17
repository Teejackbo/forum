describe('posts', () => {
  it('Should be able to visit the posts index page.', () => {
    cy.visit('/posts')
  })

  it('Should tell you to create an account if not logged in.', () => {
    cy.visit('/posts')
    cy.contains('Login')
    cy.contains('here').click()
    cy.url().should('eq', 'http://localhost:3333/register')
  })

  it('Should have a button to create a post if you are logged in.', () => {
    cy.login('user')
    cy.visit('/posts')
    cy.contains('Create Post').click()
    cy.url().should('eq', 'http://localhost:3333/posts/create')
  })

  it('A post should have a button to view the category.', () => {
    cy.login('user')
    cy.visit('/posts')
    cy.get('.btn[data-cypress-view-category-1]').click()
    cy.url().should('contain', '/posts/category')
  })

  it('A post should have a button to read it.', () => {
    cy.login('user')
    cy.visit('/posts')
    cy.get('[data-cypress-post-1] .post--title_link').then($title => {
      cy.get('[data-cypress-read-post-1]').click()
      cy.contains($title.text())
      cy.get('.view-post--title')
    })
  })

  it('A post should have a link to the poster.', () => {
    cy.login('user')
    cy.visit('/posts')
    cy.get('[data-cypress-post-1=""] > .post--title > .post--user > .post--user_username').click()
    cy.url().should('contain', '/profile')
  })

  it('A post should have a link to the post in the title.', () => {
    cy.login('user')
    cy.visit('/posts')
    cy
      .get('[data-cypress-post-1=""] > .post--title > .post--title_link')
      .click()
      .then($el => {
        cy.contains($el.text())
      })
  })
})
