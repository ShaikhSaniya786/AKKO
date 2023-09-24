describe('Login and Edit existing claim', () =>
 {
    //First test case
    it('Login and edit existing drafted claim', () => {
        // navigate to browser and access website 
        cy.visit('https://akko-claims-tmp-develop.netlify.app/login')

        //Login to AKKO website 
        cy.get('input[type="text"]').type('7298531790') //Enter Username
        cy.get('input[type="password"]').type('713331') //Enter password 
        cy.get('button[type="submit"]').contains('Login').click()

        cy.wait(8000)

        cy.get('.d-flex > .btn').should('be.visible')
        cy.log('User has logged in to the app successfully');

        //Navigate to a drafted claim because creating claim has an issue
        cy.visit('https://akko-claims-tmp-develop.netlify.app/affected-items/904')
        cy.wait(6000)
        
        //<---Verify step 1--->
        cy.get('.page-header__title').as('pageHeaderTitle')
        cy.get('.page-header__subtitle').as('pageHeaderSubtitle')
        cy.get('@pageHeaderTitle').should('be.visible').should('have.text', 'Select Affected Items')
        // cy.get('@pageHeaderSubtitle').should('have.text', 'Select affected items') //Currently an issue
        cy.log('User has edited file claim successfully and modal opens')

        cy.contains('Continue').as('continueCTA')
        cy.get('@continueCTA').contains('Continue').click() //Goto step 2


        //<---Verify step 2--->
        cy.get('.check-status').as('tickMark')
        cy.get('@tickMark').eq(0).should('be.visible')
        cy.log('User has completed step 1')
        cy.get('@pageHeaderTitle').should('have.text', 'Select Type of Loss')
        cy.get('@pageHeaderSubtitle').should('have.text', 'Select all applicable losses and indicate any known prior damage for each item') 
        cy.get('device__model').should('not.be.empty')

        //check functionality of collapsible div
        cy.get('.dropdown-btn').as('collapsibleArrow')
        cy.get('@collapsibleArrow').click()
        cy.get('.form-control type-loss-form__description').should('not.exist')
        cy.get('@collapsibleArrow').click()

        //Check multi select clear icon functionality
        cy.get('.multiselect__multi-value__label').as('lossTypes')
        cy.get(':nth-child(2) > .mb-3 > .multiselect > .multiselect__control').as('itemOperability')
    
        cy.get('@lossTypes').should('be.visible')
        cy.get('@itemOperability').should('be.visible')
        cy.get('.multiselect__clear-indicator').click()
        cy.get('@lossTypes').should('not.exist')
        cy.get('@itemOperability').should('not.exist')
        cy.log('User is able to clear all type of losses')

        //Select Type of loss
        cy.get(':nth-child(1) > .mb-3 > .multiselect > .multiselect__control').as('typeOfLoss')
        cy.get('@typeOfLoss').click()
        cy.get('#react-select-4-option-0-3').click()
        cy.get('@itemOperability').should('be.visible')
        cy.get('@typeOfLoss').click()
        cy.get('#react-select-4-option-1-2').click()
        cy.get('@itemOperability').should('be.visible')
        cy.get('@itemOperability').click()
        cy.get('#react-select-6-option-2').click()
    
        //Describe any known prior damage
        cy.get('textarea[placeholder="Describe any known prior damage"]').clear()
        cy.get('textarea[placeholder="Describe any known prior damage"]').type('I accidentally dropped my phone in a pond and now I am not able to charge my phone')
        cy.get('textarea[placeholder="Describe any known prior damage"]').clear()
        cy.get('@tickMark').eq(1).should('be.visible')

        cy.contains('Previous').as('previousCTA')
        cy.get('@previousCTA').click() 
        cy.get('@pageHeaderTitle').should('be.visible').should('have.text', 'Select Affected Items')
        cy.get('@continueCTA').click() 
        cy.get('@pageHeaderTitle').should('have.text', 'Select Type of Loss')
        cy.get('@continueCTA').click() 


        //<---Verify step 3--->
        cy.get('@pageHeaderTitle').should('have.text', 'Describe the Incident')
        cy.get('@pageHeaderSubtitle').should('have.text', 'Please provide as much information as you can describing the incident') 
        cy.get('.react-datepicker__input-container > .form-control').should('be.visible')
        cy.log('User has redirected to step 3')
    
        //Verify describe the incident field
        cy.get('.DraftEditor-root').type('Incident was terrific and accidential, It was sudden and unpleasant situation. And my iPhone died')
        cy.get('@tickMark').eq(2).should('be.visible')
        cy.get('@continueCTA').click() 
       

        //<---Verify step 4--->
        cy.get('@pageHeaderTitle').should('have.text', 'Select Payout Method')
        cy.get('@pageHeaderSubtitle').should('have.text', 'Select your preferred payout method below to ensure fastest reimbursement') 
    
        cy.get('.tab__btn').as('tabButton')
        cy.get('@tabButton').contains('Venmo').click()
        cy.get('input[placeholder="Enter Venmo Phone"]').type('7298531790')

        cy.get('@tabButton').contains('PayPal').click()
        cy.get('input[type="email"]').as('email')
        cy.get('@email').type('saniya')
        cy.get('.error-text').should('have.text', 'Invalid Email')
        cy.get('@email').type('.shaikh666@gmail.com')
        cy.get('.error-text').should('not.exist')
        cy.get('@tabButton').contains('Other').click()
        cy.get('.form-check-label').should('have.text','Our support team will coordinate with you to gather your bank wiring details upon claim resolution')
        cy.wait(1000)
        cy.get('@tickMark').eq(3).should('be.visible')
        cy.get('@continueCTA').click() 

        
        //<---Verify step 5--->
        cy.get('@pageHeaderTitle').should('have.text', 'Review Your Claim')
        cy.get('@pageHeaderSubtitle').should('have.text', 'Please review your claim information before submitting') 
        cy.get('input[type="checkbox"]').scrollIntoView();

        //Verify checkbox
        cy.get('.error-text').should('have.text', 'Some fields are required')
        cy.get('input[type="checkbox"]').check()
        cy.get('input[type="checkbox"]').uncheck()

        //Note: I am not proceeding ahead with File claim process because I will loose a drafted claim, As File new claim is currently not working


    })

}) 
  