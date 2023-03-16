/// <reference types="Cypress" />


describe('Verify the user can login and request for a quotation', () => {

// Store the credentials in a json variable and read it
    beforeEach(() => {
        const path = require('path')
        const filePath = path.join(process.cwd(), '/Users/rithuraj/Blake/Demo/Cypress_demo/cypress/configFile/credentials.json')
        cy.readFile(filePath).then((credentials) => {
          cy.visit(credentials.url)
          cy.findByLabelText('Email').type(credentials.username)
          cy.findByLabelText('Password').type(credentials.password)
          cy.findByRole('button', { name: /Log in/i }).click()
        })
      })


    
    it(' Verify that a user can login and access the dashboard ', () => {

        cy.url().should('contain','header.php')
        cy.get('h4').should('contain','rr1@mail.com')
        cy.get('h2').should('contain','Broker Insurance WebPage')
        cy.get('#menu>li').should(($menu) => {
            expect($menu).to.have.length(5)
            expect($menu.eq(0)).to.contain('Home')
            expect($menu.eq(1)).to.contain('Request Quotation')
            expect($menu.eq(2)).to.contain('Retrieve Quotation')
            expect($menu.eq(3)).to.contain('Profile')
            expect($menu.eq(4)).to.contain('Edit Profile')

        })

    })

    it(' Verify that a user can request and retrieve a quotation ', () => {
        
        const registrationNum = 'xx22'
        const vehicleMileage = '10000'
        const vehicleValue = '20000'

        cy.findByRole('tab', { name: /Request Quotation/i }).click()
        cy.get('h2').should('contain','Request a quotation')
        cy.get('#quotation_breakdowncover').select('At home')
        cy.get('#quotation_windscreenrepair_t').check()
        cy.findByPlaceholderText('Enter incidents').type('5')
        cy.findByPlaceholderText('Enter vehicle registration').type(registrationNum)
        cy.findByPlaceholderText('Enter vehicle mileage').type(vehicleMileage)
        cy.findByPlaceholderText('Enter vehicle value').type(vehicleValue)
        cy.get('#quotation_vehicle_attributes_parkinglocation').select('Public Place')
        cy.get('#quotation_vehicle_attributes_policystart_1i').select('2023')
        cy.get('#quotation_vehicle_attributes_policystart_2i').select('May')
        cy.get('#quotation_vehicle_attributes_policystart_3i').select('8')
        cy.findByRole('button', { name: /Calculate Premium/i }).click()
        // get the calculated premium amount value and remove all the unwanted texts
        cy.get('#calculatedpremium')
        .invoke('text')
        .then((text) => {
            const premiumAmount = text.match(/\d+/g).map(Number)
            cy.log(premiumAmount)
            
        })
        cy.findByRole('button', { name: /Save Quotation/i }).click()
        cy.url().should('contain','new_quotation.php')
        // get the only identification number from the web page filter and remove all the texts
        cy.get('body').invoke('text').then((text) => {
          const  identificationNumber = text.match(/\d+/g).join('')
            cy.log(identificationNumber)
            cy.go('back')

          cy.findByRole('tab', { name: /Retrieve Quotation/i }).click()
          cy.findByPlaceholderText('identification number').type(identificationNumber)
          cy.findByRole('button', { name: /Retrieve/i }).click()
          cy.url().should('contain','retrieve_quotation.php')
          //Validate the table with the values we have given
          cy.get('table').find('tr').eq(6).find('td').eq(1).then(num =>
            {
               const number = num.text()
               expect(number).to.eq(registrationNum)
            })
          cy.get('table').find('tr').eq(7).find('td').eq(1).then(mil =>
            {
                const mileage = mil.text()
                expect(mileage).to.eq(vehicleMileage)
            })
          cy.get('table').find('tr').eq(8).find('td').eq(1).then(val =>
            {
                const value = val.text()
                expect(value).to.eq(vehicleValue)
            })
               
       
      

        })

        

    })

})