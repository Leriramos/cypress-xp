import data from '../fixtures/orphanages.json'



describe('Cadastro de orfanato', () => {
    it('deve cadastrar um novo orfanato', () => {
        const orphanage = data.create

        cy.deleteMany({name: orphanage.name}, {collection: 'orphanages'})

        cy.goto('http://localhost:3000/orphanages/create')

        cy.get('legend')
            .should('be.visible')
            .should('have.text', 'Cadastro')

        cy.setMapPosition(orphanage.position)

        cy.get('input[name=name]')
            .type(orphanage.name)

        cy.get('#description').type(orphanage.description)

        cy.get('input[type=file]').selectFile('cypress/fixtures/images/kids-playground-1.png', { force: true })

        cy.get('#opening_hours').type(orphanage.service_hours)

        cy.contains(orphanage.open_on_weekends).click()

        cy.get('.save-button').click()

        cy.get('.swal2-html-container')
           .should('be.visible')
           .should('have.text', 'Orfanato cadastrado com sucesso.')
    });

    it.only('não deve cadastrar um orfanato com nome já existente', () => {

        const orphanage = data.duplicate

        //cy.deleteMany({name: orphanage.name}, {collection: 'orphanages'})

        cy.visit('http://localhost:3000/orphanages/create')

        cy.get('legend')
            .should('be.visible')
            .should('have.text', 'Cadastro')

        cy.setMapPosition(orphanage.position)

        cy.get('input[name=name]')
            .type(orphanage.name)

        cy.get('#description').type(orphanage.description)

        cy.get('input[type=file]').selectFile('cypress/fixtures/images/kids-playground-1.png', { force: true })

        cy.get('#opening_hours').type(orphanage.service_hours)

        cy.contains(orphanage.open_on_weekends).click()

        cy.get('.save-button').click()

        //segundo cadastro 
        cy.visit('http://localhost:3000/orphanages/create')

        cy.get('legend')
            .should('be.visible')
            .should('have.text', 'Cadastro')

        cy.setMapPosition(orphanage.position)

        cy.get('input[name=name]')
            .type(orphanage.name)

        cy.get('#description').type(orphanage.description)

        cy.get('input[type=file]').selectFile('cypress/fixtures/images/kids-playground-1.png', { force: true })

        cy.get('#opening_hours').type(orphanage.service_hours)

        cy.contains(orphanage.open_on_weekends).click()

        cy.get('.save-button').click()

        cy.get('.swal2-html-container')
           .should('be.visible')
           .should('have.text', 'Já existe um cadastro com o nome: ' + orphanage.name)
        
    });
});

Cypress.Commands.add('setMapPosition', (position) => {

    window.localStorage.setItem('hope-qa:latitude', position.latitude);
    window.localStorage.setItem('hope-qa:longitude', position.longitude);
})