describe('add product to cart', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('should to navigate to product screen and add it to the cart', () => {
    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')

    cy.contains('Add to cart').click()

    cy.contains('Cart: 1').should('exist')
  })

  it('should not to duplicate product in cart', () => {
    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')

    cy.contains('Add to cart').click()
    cy.contains('Add to cart').click()

    cy.contains('Cart: 1').should('exist')
  })

  it('should search products and add to cart', () => {
    cy.get('input[name^=q]').type('moletom').parent('form').submit()

    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')

    cy.contains('Add to cart').click()

    cy.contains('Cart: 1').should('exist')
  })
})
