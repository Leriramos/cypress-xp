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

    context ('campos obrigatórios', () => {

        it('não deve cadastrar um orfanato com nome já existente', () => {

            const orphanage = data.duplicate
    
            cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' })
            cy.postOrphanage(orphanage)
    
            createPage.go()
            cy.createOrphanage(orphanage)
            cy.popupHaveText('Já existe um cadastro com o nome: ' + orphanage.name)
     
        });
    
        it('Não deve cadastrar se o nome não for preenchido', () => {
            let orphanage = data.required
    
            delete orphanage.name    
    
            cy.visitCreate()
            cy.createOrphanage(orphanage)
    
            cy.alertHaveText('Nome', 'Campo obrigatório')
        
        })
    
        it('Não deve cadastrar se o sobre não for preenchido', () => {
            let orphanage = data.required
    
            delete orphanage.description
    
            cy.visitCreate()
            cy.createOrphanage(orphanage)
    
            cy.alertHaveText('Sobre', 'Campo obrigatório')  
        
        })
    
        it('Não deve cadastrar se a imagem não for anexada', () => {
            let orphanage = data.required
    
            delete orphanage.image
            
    
            cy.visitCreate()
            cy.createOrphanage(orphanage)
    
            cy.alertHaveText('Fotos', 'Envie pelo menos uma foto')
    
        
        })
    
        it('Não deve cadastrar se o horário não for informado', () => {
            let orphanage = data.required
    
            delete orphanage.opening_hours
    
            cy.visitCreate()
            cy.createOrphanage(orphanage)
    
            cy.alertHaveText('Horário', 'Campo obrigatório')
     
        
        })
    
        it('Não deve cadastrar se os campos obrigatórios não forem preenchidos', () => {
            let orphanage = data.required
    
            delete orphanage.name
            delete orphanage.description
            delete orphanage.image
            delete orphanage.opening_hours
    
            cy.visitCreate()
            cy.createOrphanage(orphanage)
    
            cy.alertHaveText('Nome', 'Campo obrigatório')
            cy.alertHaveText('Sobre', 'Campo obrigatório')
            cy.alertHaveText('Fotos', 'Envie pelo menos uma foto')
            cy.alertHaveText('Horário', 'Campo obrigatório')
       
        
        })
    })
});



