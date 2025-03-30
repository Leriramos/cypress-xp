import createPage from '../support/pages/create'
import mapPage from '../support/pages/map'

import data from '../fixtures/orphanages.json'


describe('Cadastro de orfanato', () => {
    it('deve cadastrar um novo orfanato', () => {
        const orphanage = data.create

        cy.deleteMany({name: orphanage.name}, {collection: 'orphanages'})
       
        createPage.go()
        cy.setMapPosition(orphanage.position)
        createPage.form(orphanage)
        createPage.submit()

        mapPage.popup.haveText('Orfanato cadastrado com sucesso.')


        
    });

    it.only('não deve cadastrar um orfanato com nome já existente', () => {

        const orphanage = data.duplicate

        cy.deleteMany({name: orphanage.name}, {collection: 'orphanages'})
        //primeiro cadastro 
        
        cy.postOrphanage(orphanage)

        createPage.go()
        cy.setMapPosition(orphanage.position)
        createPage.form(orphanage)
        createPage.submit()

        createPage.popup.haveText('Já existe um cadastro com o nome: ' + orphanage.name)

        
        
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