describe('Home Page - Podcasts list', () => {
  it('should allow to reload the page and see error message when there is a loading error', () => {
    cy.intercept(
      'GET',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fitunes.apple.com%2Fus%2Frss%2Ftoppodcasts%2Flimit%3D100%2Fgenre%3D1310%2Fjson',
      {
        statusCode: 500,
        body: 'Internal Server Error',
      }
    ).as('fetchPodcastsError');

    cy.visit('/');

    cy.get('.podcast-count').should('be.visible').and('contain.text', '0');
    cy.get('.refresh-button').contains('Refresh').should('be.visible');
    cy.get('.alert').should('be.visible');
  });

  it('should display a counter with the number of podcasts and search for podcasts', () => {
    cy.intercept(
      'GET',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fitunes.apple.com%2Fus%2Frss%2Ftoppodcasts%2Flimit%3D100%2Fgenre%3D1310%2Fjson',
      { fixture: 'podcasts.json' }
    ).as('fetchPodcasts');

    cy.visit('/');
    cy.wait('@fetchPodcasts');

    cy.get('.podcast-skeleton').should('not.exist');
    cy.get('.podcast-count').should('be.visible').and('contain.text', '100');
    cy.get('.grid').children().should('have.length', 100);

    const searchText = 'Joe';
    cy.get('input[type="text"]').type(searchText);
    cy.get('.podcast-count').should('be.visible').and('contain.text', '1');
    cy.get('.grid').children().first().contains(searchText);
  });
});
