import createPage from '../support/pages/create'
import mapPage from '../support/pages/map'

import data from '../fixtures/orphanages.json'


describe('Cadastro de orfanato', () => {
    it('deve cadastrar um novo orfanato', () => {
        const orphanage = data.create

        cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' })

        createPage.go()
        cy.setMapPosition(orphanage.position)
        createPage.form(orphanage)
        createPage.submit()

        mapPage.popup.haveText('Orfanato cadastrado com sucesso.')



    });

    it('não deve cadastrar um orfanato com nome já existente', () => {

        const orphanage = data.duplicate

        cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' })
        //primeiro cadastro 

        cy.postOrphanage(orphanage)

        createPage.go()
        cy.setMapPosition(orphanage.position)
        createPage.form(orphanage)
        createPage.submit()

        createPage.popup.haveText('Já existe um cadastro com o nome: ' + orphanage.name)



    });
});

