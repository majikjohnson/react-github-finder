/// <reference types="Cypress" />

describe('Navigation bar', () => {
  it('should maintain search results when navigating between pages', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-test-id="searchBox"]').type('majik');
    cy.get('.btn').click();
    cy.get('nav.navbar').contains('About').click();
    cy.url().should('contain', '/about');
    cy.get('nav.navbar').contains('Home').click();
    cy.get('[data-test-selector="userCard"]').should('have.length', 30);
  });

  it('should navigate to the "about" page', () => {
    cy.visit('http://localhost:3000');
    cy.get('nav.navbar').contains('About').click();
    cy.url().should('contain', '/about');
  });

  it('should navigate to the homepage', () => {
    cy.visit('http://localhost:3000/about');
    cy.get('nav.navbar').contains('Home').click();
    cy.url().should('contain', '/');
  });
});
