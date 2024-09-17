describe('Admin User', function () {
  let highlightedName;
   
  beforeEach('Login', function () {
    cy.visit('http://192.168.0.28:9000/')
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from failing the test
      if (err.message.includes('NotificationDataApi is not defined')) {
        return false;
      }
      // still throw the error if it's not the one we want to ignore
      throw err;
    });
  });

  it('Admin Login', function() {
    cy.get('#username').type('ADM')
    cy.get('#password').type('123456')
    cy.get('button[type="submit"]').click()
    cy.url().should('eq', 'http://192.168.0.28:9000/Dashboard/Index').wait(4000)

   // const name = cy.get('.text-truncate text-truncate-lg d-inline-block')    // Capture and store the username
  
    cy.get('.d-flex > .text-truncate') // Adjust the selector to match your site's structure
      .invoke('text')
      .then((username) => {
        highlightedName = username.trim(); // Store the trimmed username
    cy.get('.header-icon.d-flex.align-items-center.justify-content-center.ml-2').click()
    cy.get('.dropdown-menu .dropdown-header .d-flex .info-card-text .fs-lg')
      .should('have.text', highlightedName)
  //cy.get('div.info-card-text').should('be.visible').find('div').should('be.visible').find('.fs-lg text-truncate text-truncate-lg').should('be.visible') // Adjust the selector to match your site's structure
    
  })

})
})