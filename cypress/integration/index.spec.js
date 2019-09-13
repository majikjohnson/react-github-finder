/// <reference types="Cypress" />

describe('Github Finder homepage', () => {
    before(() => {
        cy.visit('http://localhost:3000');
    });
    
    it('should have the correct title', () => {
        cy.title().should('be.equal', 'Github Finder');
    });

    it('should have the correc page heading', () => {
        cy.get('h1').should('contain.text', 'Github Finder');
    });

    it('should contain the github image on the navbar', () => {
        cy.get('h1 i').should('have.class', 'fa-github');
    });

    it('should contain 30 user items', () => {
        cy.get('div[data-test-selector="userCard"]')
            .should('have.length', 30);
    });

    it('should have user items that contain the user avatar image', () => {
        cy.get('div[data-test-selector="userCard"]:first-child img')
            .should('have.attr', 'src', 'https://avatars0.githubusercontent.com/u/1?v=4' );
    });

    it('should have user items that contain the github login', () => {
        cy.get('div[data-test-selector="userCard"]:nth-child(2) h3')
            .should('have.text', 'defunkt' );
    });

    it('should have user items that contain a button pointing to the user github profile page', () => {
        cy.get('div[data-test-selector="userCard"]:nth-child(3) a')
            .should('have.attr', 'href', 'https://github.com/pjhyett')
            .and('have.text', 'more');
    });
});