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

        cy.get('#opening_hours').type(orphanage.opening_hours)

        cy.contains(orphanage.open_on_weekends).click()

        cy.get('.save-button').click()

        cy.get('.swal2-html-container')
           .should('be.visible')
           .should('have.text', 'Orfanato cadastrado com sucesso.')
    });

    it.only('não deve cadastrar um orfanato com nome já existente', () => {

        const orphanage = data.duplicate

        cy.deleteMany({name: orphanage.name}, {collection: 'orphanages'})
        //primeiro cadastro 
        
        cy.postOrphanage(orphanage)

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

        cy.get('#opening_hours').type(orphanage.opening_hours)

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

//cadastro via API
Cypress.Commands.add('postOrphanage', (orphanage) => {

    const formData = new FormData();
    formData.append('name', orphanage.name);
    formData.append('description', orphanage.description);
    formData.append('latitude', orphanage.position.latitude);
    formData.append('longitude', orphanage.position.longitude);
    formData.append('opening_hours', orphanage.opening_hours);
    formData.append('open_on_weekends', false);




    cy.request({
        url: 'http://localhost:3333/orphanages',
        method: 'POST',
        headers: { 
            'content-type': 'multipart/form-data'
        },
        body: formData,
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(201)
    });


})