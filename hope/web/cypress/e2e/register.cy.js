import createPage from '../support/pages/create';
import generateOrphanage from '../support/factory'; 

describe('Cadastro de Orfanato', () => {
    beforeEach(() => {
        createPage.go();
    });

    it('deve cadastrar um novo orfanato com sucesso', () => {
        const orphanage = generateOrphanage();
        createPage.createOrphanage(orphanage);
        createPage.popup.haveText('Orfanato cadastrado com sucesso.');
    });

    describe('Validação de Campos Obrigatórios', () => {
        beforeEach(() => {
            cy.deleteMany({}, { collection: 'orphanages' });
        });

        it('não deve cadastrar um orfanato com nome já existente', () => {
            const orphanage = generateOrphanage();
            cy.postOrphanage(orphanage);
            createPage.go();
            createPage.createOrphanage(orphanage);
            createPage.popup.haveText(`Já existe um cadastro com o nome: ${orphanage.name}`);
        });

        const requiredFields = [
            { field: 'name', label: 'Nome', message: 'Campo obrigatório' },
            { field: 'description', label: 'Sobre', message: 'Campo obrigatório' },
            { field: 'image', label: 'Fotos', message: 'Envie pelo menos uma foto' },
            { field: 'opening_hours', label: 'Horário', message: 'Campo obrigatório' },
        ];

        requiredFields.forEach(({ field, label, message }) => {
            it(`não deve cadastrar se o campo "${label}" não for preenchido`, () => {
                const orphanage = generateOrphanage();
                delete orphanage[field];
                createPage.createOrphanage(orphanage);
                cy.alertHaveText(label, message);
            });
        });

        it('não deve cadastrar se todos os campos obrigatórios estiverem vazios', () => {
            const orphanage = generateOrphanage();
            delete orphanage.name;
            delete orphanage.description;
            delete orphanage.image;
            delete orphanage.opening_hours;
            createPage.createOrphanage(orphanage);
            requiredFields.forEach(({ label, message }) => {
                cy.alertHaveText(label, message);
            });
        });
    });
});