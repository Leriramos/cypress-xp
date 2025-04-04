import popup from '../components/popup';

class MapPage {
    constructor() {
        this.popup = popup;
    }

    go() {
        cy.visit('/map');
    }

    openOrphanage(name) {
        cy.get('.leaflet-marker-icon', { timeout: 10000 }).each(($marker) => {
            cy.wrap($marker).click({ force: true });
            cy.get('.leaflet-popup-content', { timeout: 5000 }).invoke('text').then((text) => {
                if (text.trim() === name) {
                    cy.contains('.leaflet-popup-content', name).find('a').click({ force: true });
                }
            });
        });
    }
}

export default new MapPage();