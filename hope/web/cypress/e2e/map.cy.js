import mapPage from '../support/pages/map'

import data from '../fixtures/orphanages.json'

describe('Mapa de Orfanatos', () => {

    const orphanage = data.map;

    beforeEach(() => {
        cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' })
        cy.postOrphanage(orphanage)
        mapPage.go();
    });

    afterEach(() => {
        if(Cypress.env('KEEP_DATA')  !== true) {
            cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' })
        }
    });

    it('Deve exibir os detalhes de um orfanato ao selecioná-lo no mapa', () => {
        mapPage.openOrphanage(orphanage.name)
        cy.contains('h1', orphanage.name).should('be.visible')  
        
    })

    it('Deve gerar um link correto para o Google Maps', () => {
        mapPage.openOrphanage(orphanage.name)
        cy.googleMapLink(orphanage.position)
    })
});

