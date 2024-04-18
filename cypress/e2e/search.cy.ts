describe('add product to cart', () => {
  it('should search products', () => {
    cy.visit('/')
    cy.get('input[name^=q]').type('moletom').parent('form').submit()
    cy.location('pathname').should('include', '/search')
    cy.location('search').should('include', 'q=moletom')
    cy.get('a[href^="/product"]').should('exist')
  })

  it('redirect to / when query is empty', () => {
    cy.on('uncaught:exception', () => false)
    cy.visit('/search')

    cy.location('pathname').should('eq', '/')
  })
})
