/// <reference types="Cypress" />

describe('About page', () => {
    before(() => {
        cy.visit('/about')
    });
    
    it('should have the correct heading', () => {
        cy.get('div.container h1').should('contain.text', 'About');
    });

    it.only('should contain the correct content', () => {
        cy.get('.container > :nth-child(2)').should('contain.text', 'Github Finder app.');
        cy.get('.container > :nth-child(3)').should('contain.text', 'Based on Udemy course.');

    });
});