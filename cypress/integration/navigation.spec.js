/// <reference types="Cypress" />

const startSearchPageStubs = (searchTerm) => {
  const apiSearch = `https://api.github.com/search/users?q=${searchTerm}&client_id=${Cypress.env('REACT_APP_GITHUB_CLIENT_ID')}&client_secret=${Cypress.env('REACT_APP_GITHUB_CLIENT_SECRET')}`
  cy.server();
  cy.route('GET', apiSearch, `fixture:github/users/search_${searchTerm}`);
};

describe('Navigation bar', () => {
  it('should maintain search results when navigating between pages', () => {
    
    const githubUserSearchTerm = "brad";
    startSearchPageStubs(githubUserSearchTerm);
    cy.visit('/');
    cy.get('[data-test-id="searchBox"]').type(githubUserSearchTerm);
    cy.get('.btn').click();
    cy.get('nav.navbar').contains('About').click();
    cy.url().should('contain', '/about');
    cy.get('nav.navbar').contains('Home').click();
    cy.get('[data-test-selector="userCard"]').should('have.length', 30);
  });

  it('should navigate to the "about" page', () => {
    cy.visit('/');
    cy.get('nav.navbar').contains('About').click();
    cy.url().should('contain', '/about');
  });

  it('should navigate to the homepage', () => {
    cy.visit('/');
    cy.get('nav.navbar').contains('Home').click();
    cy.url().should('contain', '/');
  });
});
