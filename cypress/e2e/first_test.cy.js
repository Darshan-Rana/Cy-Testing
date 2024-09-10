describe("First project",function(){

   beforeEach("Valid Login",function(){

        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('input[name="username"]').type("admin").should("have.value",'admin')
        cy.get('input[type="password"]').type("admin123").should("have.value",'admin123')
        cy.get('button[type="submit"]').click()
      
        // Verify the URL
        cy.url().should('include', '/dashboard');  

        // Verify using element of next page
        cy.get('h6').should("have.text",'Dashboard')
        cy.get('ul > li').eq(0).click()
    })
    it("Admin Module",function(){

        cy.get('ul > li').eq(0).click()
        //verify that the user is moved to admin screen
        cy.get('h6').eq(0).should("have.text",'Admin')
        cy.get('button[type="button"]').find('i.oxd-icon.bi-plus.oxd-button-icon').click()
        cy.get('h6').eq(1).should("have.text",'Add User')

        //Adding user
        cy.get('div[class="oxd-select-text-input"]').eq(0).click()
        cy.contains("ESS").should('be.visible').click().wait(2000)
        cy.get('div[class="oxd-select-text-input"]').eq(1).click().wait(2000)
        cy.contains('Enabled').should('be.visible').click().wait(2000)
        // Type into the input field to trigger the suggestions
        cy.get('.oxd-autocomplete-wrapper').type("orange").wait(5000)
        // cy.get('').click()
        // Wait for the suggestions to appear and select the desired one
        // cy.contains('Ranga  Akunuri').should('be.visible').click()
        cy.get('.oxd-autocomplete-dropdown').should('be.visible').click().wait(2000)
        cy.get('input[class="oxd-input oxd-input--active"]').eq(1).type('test44')
        cy.get('input[type="password"]').eq(0).type('test1234')
        cy.get('input[type="password"]').eq(1).type('test1234')
        cy.get('button[type="submit"]').click()
    });
//    it("Search functionality", function(){

//         // cy.wait(3000)
//         // cy.get('.oxd-input-group oxd-input-field-bottom-space').eq(0).type('Test23')
//         // cy.get('.oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space').click()
        

//    })

});