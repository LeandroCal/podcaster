describe('Episode Page - Episode detail audio file', () => {
  it('should episode detail with description and audio', () => {
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
    cy.get('.grid').children().first().click();
    cy.url().should('include', '/podcast/1535809341');

    cy.intercept(
      'GET',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fitunes.apple.com%2Flookup%3Fid%3D1535809341%26media%3Dpodcast%26entity%3DpodcastEpisode%26limit%3D20',
      { fixture: 'episode.json' }
    ).as('fetchEpisodes');
    cy.wait('@fetchEpisodes');

    cy.get('.podcast-aside').should('be.visible');
    cy.get('.episodes-count')
      .should('be.visible')
      .and('contain.text', 'Episodes: 21');
    cy.get('.episodes-list')
      .should('be.visible')
      .children()
      .should('have.length', 22);
    cy.get('.episodes-list').children().eq(2).find('a').click();
    cy.url().should('include', '/podcast/1535809341/episode/1000672310210');

    cy.get('.podcast-aside').should('be.visible');
    cy.get('.episode-description').should('be.visible');
    cy.get('.episode-audio').should('be.visible');
    cy.get('.back-button').should('be.visible');

    cy.get('.episode-audio').then(($audio) => {
      const audioElement: any = $audio[0];
      audioElement.play();
    });
  });
});
