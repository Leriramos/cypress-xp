import createPage from '../support/pages/create'
import mapPage from '../support/pages/map'

import data from '../fixtures/orphanages.json'


describe('Cadastro de orfanato', () => {
    it('deve cadastrar um novo orfanato', () => {
        const orphanage = data.create

        cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' })
      
        cy.visitCreate()
        cy.createOrphanage(orphanage)

        cy.popupHaveText('Orfanato cadastrado com sucesso.')



    });

    it('não deve cadastrar um orfanato com nome já existente', () => {

        const orphanage = data.duplicate

        cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' })
        //primeiro cadastro 

        cy.postOrphanage(orphanage)

        cy.visitCreate()
        cy.createOrphanage(orphanage)

        cy.popupHaveText('Já existe um cadastro com o nome: ' + orphanage.name)



    });

    it('Não deve cadastrar se o campo nome não for preenchido', () => {
        
    })
});

