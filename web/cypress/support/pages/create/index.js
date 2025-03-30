import popup from "../components/popup"

class CreatePage {

    constructor(){
        this.popup = popup
    }

    go() {
        cy.visit('http://localhost:3000/orphanages/create')

        cy.get('legend')
            .should('be.visible')
            .should('have.text', 'Cadastro')
    }

    form(orphanage) {

        cy.get('input[name=name]')
            .type(orphanage.name)

        cy.get('#description').type(orphanage.description)

        cy.get('input[type=file]').selectFile('cypress/fixtures/images/kids-playground-1.png', { force: true })

        cy.get('#opening_hours').type(orphanage.opening_hours)

        cy.contains(orphanage.open_on_weekends).click()

    }

    submit() {

        cy.get('.save-button').click()
    }

}

export default new CreatePage()