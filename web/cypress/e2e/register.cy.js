import createPage from '../support/pages/create'
import mapPage from '../support/pages/map'

import data from '../fixtures/orphanages.json'

import {generator} from '../support/factory'
import { before } from 'underscore';


describe('Cadastro de orfanato', () => {

    before(() => {
        cy.dropCollection('orphanages')
    })

    it('deve cadastrar um novo orfanato', () => {
        const orphanage = generator ()

        cy.log(JSON.stringify(orphanage))

      
        cy.visitCreate()
        cy.createOrphanage(orphanage)
        cy.popupHaveText('Orfanato cadastrado com sucesso.')


    });

    context ('campos obrigatórios', () => {

        it('não deve cadastrar um orfanato com nome já existente', () => {

            const orphanage = generator ()
    
            
            cy.postOrphanage(orphanage)
    
            createPage.go()
            cy.createOrphanage(orphanage)
            cy.popupHaveText('Já existe um cadastro com o nome: ' + orphanage.name)
     
        });
    
        it('Não deve cadastrar se o nome não for preenchido', () => {
            let orphanage = generator ()
    
            delete orphanage.name    
    
            cy.visitCreate()
            cy.createOrphanage(orphanage)
    
            cy.alertHaveText('Nome', 'Campo obrigatório')
        
        })
    
        it('Não deve cadastrar se o sobre não for preenchido', () => {
            let orphanage = generator ()
    
            delete orphanage.description
    
            cy.visitCreate()
            cy.createOrphanage(orphanage)
    
            cy.alertHaveText('Sobre', 'Campo obrigatório')  
        
        })
    
        it('Não deve cadastrar se a imagem não for anexada', () => {
            let orphanage = generator ()
    
            delete orphanage.image
            
    
            cy.visitCreate()
            cy.createOrphanage(orphanage)
    
            cy.alertHaveText('Fotos', 'Envie pelo menos uma foto')
    
        
        })
    
        it('Não deve cadastrar se o horário não for informado', () => {
            let orphanage = generator ()
    
            delete orphanage.opening_hours
    
            cy.visitCreate()
            cy.createOrphanage(orphanage)
    
            cy.alertHaveText('Horário', 'Campo obrigatório')
     
        
        })
    
        it('Não deve cadastrar se os campos obrigatórios não forem preenchidos', () => {
            let orphanage = generator ()
    
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



