describe('Admin User', function () {

  beforeEach('Login', function () {

    cy.visit('http://192.168.0.28:9000/')
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from failing the test
      if (err.message.includes('NotificationDataApi is not defined')) {
        return false;
      }
      // still throw the error if it's not the one we want to ignore
      throw err;
    })

    it('Admin Login', function () {
      cy.get('#username').type('ADM')
      cy.get('#password').type('123456')
      cy.get('button[type="submit"]').click()
      cy.url('http://192.168.0.28:9000/Dashboard/Index')
      cy.get('.header-icon d-flex align-items-center justify-content-center ml-2').click()
    })

  })
})