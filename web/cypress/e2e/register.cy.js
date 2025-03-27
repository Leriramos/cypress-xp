import data from '../fixtures/orphanages.json'

describe('Cadastro de orfanato', () => {
    it('deve cadastrar um novo orfanato', () => {
        cy.visit('http://localhost:3000/orphanages/create')

        const orphanage = data.create

        cy.get('legend')
            .should('be.visible')
            .should('have.text', 'Cadastro')

        cy.get('input[name=name]')
            .type(orphanage.name)

        cy.get('#description').type(orphanage.description)

        cy.get('input[type=file]').selectFile('cypress/fixtures/images/kids-playground-1.png', {force: true})

        cy.get('#opening_hours').type(orphanage.service_hours)

        cy.contains(orphanage.open_on_weekends).click()
    });
});