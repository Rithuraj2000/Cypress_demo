


describe('Verify the insurance quotation', () => {

    it(' Verify that a user can Register ', () => {
        function createEmail() {
            return `cypress-${Date.now()}@test.com`
          }
        const password = '1234'
        const customerEmail = createEmail()
        cy.visit('https://demo.guru99.com/insurance/v1/index.php')
        cy.findByText('Register').click()
        cy.get('#user_title').select('Mrs')
        cy.findByLabelText('First name').type('Rithu')
        cy.findByLabelText('Surname').type('Raj')
        cy.findByLabelText('Phone').type('0000')
        cy.get('#user_dateofbirth_1i').select('1990')
        cy.get('#user_dateofbirth_2i').select('January')
        cy.get('#user_dateofbirth_3i').select('2')
        cy.get('#licencetype_t').check()
        cy.get('#licencetype_t').should('be.checked')
        cy.get('#user_licenceperiod').select('7')
        cy.get('#user_occupation_id').select('Engineer')
        cy.findByLabelText('Street').type('10 Some Street')
        cy.findByLabelText('City').type('Sydney')
        cy.findByLabelText('County').type('Reading')
        cy.findByLabelText('Post code').type('9876')
        cy.findByLabelText('Email').type(customerEmail)
        cy.findByLabelText('Password').type(password)
        cy.get('#user_user_detail_attributes_password_confirmation').type(password)
        cy.findByRole('button', { name: /Create/i }).click()
        
        
    })
   

})