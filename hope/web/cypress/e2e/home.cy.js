describe('Página Inicial', () => {
  beforeEach(() => {
    cy.visit('/', { baseUrl: Cypress.config().baseUrl });
  });

  it('deve carregar a página inicial com sucesso', () => {
    cy.get('h1', { timeout: 10000 }).should('be.visible');
    cy.url().should('include', '/');
  });
});