describe('Posts', () => {
  describe('Index', () => {
    before(() => {
      cy.exec('adonis migration:refresh')
      cy.exec('adonis seed')
    })

    beforeEach(() => {
      cy.login('user')
    })

    it('Should be able to visit the posts index page.', () => {
      cy.logout()
      cy.visit('/posts')
    })

    it('Should tell you to create an account if not logged in.', () => {
      cy.logout()
      cy.visit('/posts')
      cy.contains('Login')
      cy.contains('here').click()
      cy.url().should('eq', 'http://localhost:3333/register')
    })

    it('Should have a button to create a post if you are logged in.', () => {
      cy.visit('/posts')
      cy.contains('Create Post').click()
      cy.url().should('eq', 'http://localhost:3333/posts/create')
    })

    it('A post should have a button to view the category.', () => {
      cy.visit('/posts')
      cy.get('.btn[data-cypress-view-category-1]').click()
      cy.url().should('contain', '/posts/category')
    })

    it('A post should have a button to read it.', () => {
      cy.visit('/posts')
      cy.get('[data-cypress-post-1] .post--title_link').then($title => {
        cy.get('[data-cypress-read-post-1]').click()
        cy.contains($title.text())
        cy.get('.view-post--title')
      })
    })

    it('A post should have a link to the poster.', () => {
      cy.visit('/posts')
      cy.get('[data-cypress-post-1=""] > .post--title > .post--user > .post--user_username').click()
      cy.url().should('contain', '/profile')
    })

    it('A post should have a link to read the post in the title.', () => {
      cy.visit('/posts')
      cy
        .get('[data-cypress-post-1=""] > .post--title > .post--title_link')
        .click()
        .then($el => {
          cy.contains($el.text())
          cy.get('.view-post--title')
        })
    })

    it('A post should have a button to edit it if you are logged in as the poster.', () => {
      cy.visit('/posts')
      cy
        .contains('Edit')
        .first()
        .click()
      cy.url().should('contain', '/edit')
    })

    it('Deleting a post should remove it from the list of posts.', () => {
      cy.visit('/posts')
      cy
        .get('.post--delete > .btn')
        .should('have.length', 5)

      cy.contains('Delete').click()
      cy
        .get('.post--delete > .btn')
        .should('have.length', 4)
    })

    it('A moderator should be able to delete any post.', () => {
      cy.login('moderator')
      cy.reload()
      cy
        .get('.post--delete > .btn')
        .should('have.length', 79)

      cy.contains('Delete').click()
      cy
        .get('.post--delete > .btn')
        .should('have.length', 78)
    })

    it('An admin should be able to delete any post.', () => {
      cy.login('admin')
      cy.reload()
      cy
        .get('.post--delete > .btn')
        .should('have.length', 78)

      cy.contains('Delete').click()
      cy
        .get('.post--delete > .btn')
        .should('have.length', 77)
    })

    it('A super admin should be able to delete any post.', () => {
      cy.login('super-admin')
      cy.reload()
      cy
        .get('.post--delete > .btn')
        .should('have.length', 77)

      cy.contains('Delete').click()
      cy
        .get('.post--delete > .btn')
        .should('have.length', 76)
    })

    it('An admin should be able to edit any post.', () => {
      cy.login('admin')
      cy.visit('/posts')
      cy
        .contains('Edit')
        .first()
        .click()
      cy.url().should('contain', '/edit')
    })

    it('A super admin should be able to edit any post.', () => {
      cy.login('super-admin')
      cy.visit('/posts')
      cy
        .contains('Edit')
        .first()
        .click()
      cy.url().should('contain', '/edit')
    })
  })

  describe('Show', () => {
    before(() => {
      cy.exec('adonis migration:refresh')
      cy.exec('adonis seed')
    })

    it('Should contain a link to the category that the post belongs to.', () => {
      cy.visit('/posts/1')
      cy.get('[data-cypress-view-category]').click()
      cy.url().should('contain', '/posts/category')
    })

    it('Should contain a link to the posts index page.', () => {
      cy.visit('/posts/1')
      cy.contains('All Posts').click()
      cy.url().should('eq', 'http://localhost:3333/posts')
    })

    it('Should contain a link to the user that posted the post.', () => {
      cy.visit('/posts/1')
      cy
        .get('.view-post--username')
        .click()
        .then($link => {
          cy.url().should('eq', `http://localhost:3333/profile/${$link.text()}`)
        })
    })

    it('Should tell you to login to post a comment if not logged in.', () => {
      cy.visit('/posts/1')
      cy.contains('Please login here to leave a comment.')
      cy
        .get('[href="/login"]')
        .last()
        .click()
      cy.url().should('eq', 'http://localhost:3333/login')
    })

    it('Should have a box to leave a comment if logged in.', () => {
      cy.login('user')
      cy.visit('/posts/1')
      cy.get('.make-comment')
    })
  })
})
