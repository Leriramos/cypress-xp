

Cypress.Commands.add('visitCreate', () => {

    cy.visit('http://localhost:3000/orphanages/create')

    cy.get('legend')
        .should('be.visible')
        .should('have.text', 'Cadastro')

})

Cypress.Commands.add('createOrphanage', (orphanage) => {

    cy.setMapPosition(orphanage.position)

    cy.get('input[name=name]')
        .type(orphanage.name)

    cy.get('#description').type(orphanage.description)

    cy.get('input[type=file]').selectFile('cypress/fixtures/images/' + orphanage.image, { force: true })

    cy.get('#opening_hours').type(orphanage.opening_hours)

    cy.contains(orphanage.open_on_weekends).click()

    cy.get('.save-button').click()


})