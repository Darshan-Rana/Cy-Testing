describe('Normal User', () => {

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
    })

    it('Add New Discussion', () => {

        cy.Login('NMU', '123456')
        cy.UnderDiscussion()
        cy.get('button[data-target="#tbllogcall"]').click()
        cy.Savebutton()
        cy.get('span#country-error').should('have.text', 'country is required')
        cy.Country('Afghanistan')
        cy.Savebutton()
        cy.get('span#Company-error').should('have.text', 'Company Name is required')
        cy.get('#select2-Company-container').click()
        cy.get('span[aria-owns="select2-Company-results"]').type('DarshanMed LTD').click('DarshanMed LTD')

    })
    //cy.get('button[onclick="Save()"]').click()
})

