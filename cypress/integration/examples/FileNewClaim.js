/// <reference types="Cypress"/>

describe('Login and File New claim', () =>
 {
    //First test case
    it('Login and File a new Claim', () => {
        // navigate to browser and access website 
        cy.visit('https://akko-claims-tmp-develop.netlify.app/login')

        //Login to AKKO website 
        cy.get('input[type="text"]').type('7298531790') //Enter Username
        cy.get('input[type="password"]').type('713331') //Enter password 
        cy.get('button[type="submit"]').contains('Login').click()

        cy.wait(6000)

        cy.get('.d-flex > .btn').as('fileNewClaimLocator')
        cy.get('@fileNewClaimLocator').should('be.visible')
        cy.log('User has logged in to the app successfully');

        //File a new claim
        cy.get('@fileNewClaimLocator').click() //Open File claim modal
        cy.get('.page-header__title').should('be.visible')
        cy.get('.page-header__title').should('have.text', 'Select Affected Items')
        cy.log('User has opened file claim modal successfully')

        //refresh
        cy.reload()
        cy.wait(6000)

        //Select affected items from step 1
        cy.get('.check-status').click()
        
        //Check if user is taken to /error page
        cy.url().should('eq', 'https://akko-claims-tmp-develop.netlify.app/error');  

        cy.log('User is taken to error page, as there is ongoing blocker issue on the website')

        //I cannot further automate due to ongoing issue on the website - Its a blocker so cannot test file new claim functionality

    })

  }) 