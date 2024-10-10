// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('Login',(Username, Password) => {
    cy.get('#username').type(Username)
    cy.get('#password').type(Password)
    cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('LogOut', () => {
    let highlightedName;

    cy.get('.d-flex > .text-truncate') // Adjust the selector to match your site's structure  < only for this i'm using this locator
    .invoke('text')
    .then((username) => {
      highlightedName = username.trim(); // Store the trimmed username
      cy.log(highlightedName);
      cy.get('.header-icon.d-flex.align-items-center.justify-content-center.ml-2').click()
      cy.get('.dropdown-menu .dropdown-header .d-flex .info-card-text .fs-lg').should('have.text', highlightedName)
      //cy.get('div.info-card-text').should('be.visible').find('div').should('be.visible').find('.fs-lg text-truncate text-truncate-lg').should('be.visible') // Adjust the selector to match your site's structure
      cy.get('span[data-i18n="drpdwn.page-logout"]').should('have.text', 'Logout').click()

})
})

Cypress.Commands.add('UnderDiscussion',()=>{

    cy.get('a[data-filter-tags="under discussion"]').click()
    cy.get('.subheader-title').contains('Under Discussion')

})

Cypress.Commands.add('Country',(CountryName) =>{
   
    cy.get('span#select2-country-container').click()
    cy.get('span.select2-results').find('ul').find('li').contains(CountryName).click()

})
Cypress.Commands.add('Savebutton',()=>{

    cy.get('button[onclick="Save()"]').click()
})