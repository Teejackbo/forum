describe('Pages', () => {
  before(() => {
    cy.exec('adonis migration:refresh')
    cy.exec('adonis seed')
  })

  it('Home', () => {
    cy.visit('')
  })

  it('Categories', () => {
    cy.visit('/categories')
    cy.get('.category')
  })

  it('Posts', () => {
    cy.visit('/posts')
    cy.get('.post')
  })

  it('Login', () => {
    cy.visit('/login')
  })

  it('Register', () => {
    cy.visit('/register')
  })
})
