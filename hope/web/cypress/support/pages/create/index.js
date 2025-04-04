import popup from '../components/popup';

class CreatePage {
    constructor() {
        this.popup = popup;
    }

    go() {
        cy.visit('/orphanages/create');
        cy.get('legend', { timeout: 10000 })
            .should('be.visible')
            .should('have.text', 'Cadastro');
    }

    fillForm(orphanage) {
        if (orphanage.name) cy.get('input[name=name]').type(orphanage.name);
        if (orphanage.description) cy.get('#description').type(orphanage.description);
        if (orphanage.image) cy.get('input[type=file]').selectFile(`cypress/fixtures/images/${orphanage.image}`, { force: true });
        if (orphanage.opening_hours) cy.get('#opening_hours').type(orphanage.opening_hours);
        if (typeof orphanage.open_on_weekends === 'boolean') {
            cy.contains('button', orphanage.open_on_weekends ? 'Sim' : 'Não').click();
        }
    }

    submit() {
        cy.get('.save-button').click({ force: true });
    }

    createOrphanage(orphanage) {
        cy.setMapPosition(orphanage.position);
        this.fillForm(orphanage);
        this.submit();
    }
}

export default new CreatePage();