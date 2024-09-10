describe('SwagLabs', function () {

  beforeEach('URL nevigation', function () {
    cy.visit('https://www.saucedemo.com/v1/')

    cy.get('#user-name').type('standard_user').should('have.value', 'standard_user')
    cy.get('#password').type('secret_sauce').should('have.value', 'secret_sauce')
    cy.get('#login-button').click()
    cy.get('.product_label').should('have.text', 'Products')

  })

  xit('Login with invalid UserID and PassWord', function () {

    cy.get('#login-button').click().wait(2000)
    cy.get('h3').contains('Username is required').should('have.text', 'Epic sadface: Username is required')
    cy.get('#user-name').type('standard_user').should('have.value', 'standard_user')
    cy.get('#login-button').click()
    cy.get('h3').contains('Password is required').should('have.text', 'Epic sadface: Password is required')

  })

  it('Side Menu functionality', function () {

    cy.get('.bm-burger-button').click()
    cy.get('#inventory_sidebar_link').should('have.text', 'All Items').click()
    cy.get('.bm-burger-button').click()
    cy.get('#about_sidebar_link').should('have.text', 'About')
    cy.get('#logout_sidebar_link').should('have.text', 'Logout')
    cy.get('#reset_sidebar_link').should('have.text', 'Reset App State')

  })

  it('Add to Cart and cart icon functionality', function () {

    //way 1 ----------------------------------------------------
    // cy.get('.inventory_item').each(($el, index) => {
    //   cy.log(`Processing item ${index + 1}`)
    //   cy.wrap($el).within(() => {
    //     // Check if the item label contains 'Sauce Labs Backpack'
    //     cy.get('.inventory_item_label').should('contain', 'Sauce Labs Backpack')
    //     // Check if the pricebar contains a dollar sign
    //     cy.get('.pricebar').should('contain', '$')
    //     // Click the 'ADD TO CART' button
    //     cy.get('button.btn_primary.btn_inventory').contains('ADD TO CART').click()
    //   })

    //way 2 -----------------------------------------------
    // cy.get('.inventory_item').each(($el) => {
    //   cy.wrap($el).within(() => {
    //     cy.get('.inventory_item_label').then(($label) => {
    //       if ($label.text().includes('Sauce Labs Backpack')) {
    //         cy.get('.pricebar').should('contain', '$')
    //         cy.get('button.btn_primary.btn_inventory').contains('ADD TO CART').click()
    //      }
    //     //  else if($label.text().includes('Sauce Labs Bike Light')) {
    //     //     cy.get('.pricebar').should('contain', '$')
    //     //     cy.get('button.btn_primary.btn_inventory').contains('ADD TO CART').click()
    //     // // }
    //     // })
    //       })

    //way 3 Dynamic Value ---------------------------------------------------
    cy.log('Adding product in cart')
    const productsToHandle = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Fleece Jacket', 'Sauce Labs Onesie'];

    cy.get('.inventory_item').each(($el) => {
      cy.wrap($el).within(() => {
        cy.get('.inventory_item_label').then(($label) => {
          const labelText = $label.text()

          if (productsToHandle.some(product => labelText.includes(product))) {
            cy.get('.pricebar').should('contain', '$')
            cy.get('button.btn_primary.btn_inventory').contains('ADD TO CART').click()
          }
        })
      })
    })

    cy.get('svg[data-icon="shopping-cart"]').click().wait(3000)
    cy.get('.subheader').should('have.text', 'Your Cart')


    cy.log('Removing product from the Cart')
    const productstoRemove = ['Sauce Labs Backpack', 'Sauce Labs Bike Light']

    cy.get('.cart_item').each(($el) => {
      cy.wrap($el).within(() => {
        cy.get('.cart_item_label').then(($label) => {
          const labelText = $label.text()

          if (productstoRemove.some(product => labelText.includes(product))) {
            cy.get('.item_pricebar').find('button').contains('REMOVE').click()
            // cy.get('.btn_secondary cart_button').contains('REMOVE').click()

          }
        })
      })
    })

     cy.get('.cart_footer').find('a').contains('CHECKOUT').click()
     cy.get('.subheader').should('have.text','Checkout: Your Information')
     cy.get('input[type="submit"]').click()
    //  cy.get('h3[@data-test="error"]').should('have.text','Error: First Name is required')

  })
})


