describe('Setup', () => {

    before(() => {
        cy.dropCollection('orphanages')
    })

    it('drop successfully', () => {
        cy.log('Drop completed successfully')
    })
    
});