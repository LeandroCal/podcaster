describe('Not Found Page', () => {
  it('should allow to reload the page and see error message when there is a loading error', () => {
    cy.visit('/podcastsss');

    cy.get('.not-found-code').should('be.visible').and('contain.text', '404');
    cy.get('.not-found-text')
      .should('be.visible')
      .and('contain.text', 'Page Not Found');
  });
});
