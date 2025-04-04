Cypress.Commands.add('setMapPosition', (position) => {
    window.localStorage.setItem('hope-qa:latitude', position.latitude);
    window.localStorage.setItem('hope-qa:longitude', position.longitude);
});

Cypress.Commands.add('postOrphanage', (orphanage) => {
    cy.fixture('images/' + orphanage.image, 'binary')
        .then((image) => Cypress.Blob.binaryStringToBlob(image, 'image/png'))
        .then((blob) => {
            const formData = new FormData();
            formData.append('name', orphanage.name);
            formData.append('description', orphanage.description);
            formData.append('latitude', orphanage.position.latitude);
            formData.append('longitude', orphanage.position.longitude);
            formData.append('opening_hours', orphanage.opening_hours);
            formData.append('open_on_weekends', orphanage.open_on_weekends);
            formData.append('images', blob, orphanage.image);

            cy.request({
                url: `${Cypress.env('baseApi')}/orphanages`,
                method: 'POST',
                headers: { 'content-type': 'multipart/form-data' },
                body: formData,
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
            });
        });
});

Cypress.Commands.add('alertHaveText', (label, text) => {
    cy.contains('label', label).parent().find('small').should('have.text', text);
});

Cypress.Commands.add('googleMapLink', (position) => {
    const googleUrl = `https://www.google.com/maps/dir/?api=1&destination=${position.latitude},${position.longitude}`;
    cy.contains('a', 'Ver rotas no Google Maps').should('have.attr', 'href', googleUrl);
});