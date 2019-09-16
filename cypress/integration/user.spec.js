/// <reference types="Cypress" />

describe('User profile page', () => {
    before(() => {
        cy.visit('http://localhost:3000/user/bradtraversy')
    });

    it("should display a tick if the user is hireable", () => {
        cy.get('div.container').should('contain.text', 'Hireable');
        cy.get('div.container > i').should('have.class', 'fas fa-check text-success');
    });
    
    it("should display the user's name, avatar image and location", () => {
        cy.get('[data-test-usercard] > img').should('have.attr', 'src', 'https://avatars2.githubusercontent.com/u/5550850?v=4');
        cy.get('[data-test-usercard] > h2').should('have.text', 'Brad Traversy');
        cy.get('[data-test-usercard] > p').should('have.text', 'Boston');
    });

    it("should display the user's bio information", () => {
        cy.get('[data-test-bio] > h3').should('have.text', 'Bio');
        cy.get('[data-test-bio] > a')
            .should('have.class', 'btn btn-dark my-1')
            .and('have.attr', 'href', 'https://github.com/bradtraversy')
            .and('have.text', 'Visit Github Bio');
        
    });

    it("should display a button that links to the user's github profile", () => {
        cy.get('[data-test-bio] > a')
            .should('have.class', 'btn btn-dark my-1')
            .and('have.attr', 'href', 'https://github.com/bradtraversy')
            .and('have.text', 'Visit Github Bio');
    });

    it("should display the user's github username", () => {
        cy.get('[data-test-bio] > ul > li:nth-child(1)')
            .should('contain.text', 'Username')
            .and('contain.text', 'bradtraversy');
    });

    it("should display the user's company name", () => {
        cy.get('[data-test-bio] > ul > li:nth-child(2)')
            .should('contain.text', 'Company')
            .and('contain.text', 'Traversy Media');
    });

    it("should display the user's website address", () => {
        cy.get('[data-test-bio] > ul > li:nth-child(3)')
            .should('contain.text', 'Website')
            .and('contain.text', 'traversymedia.com');
    });

    it("should display the user's github stats using badges", () => {
        cy.get('[data-test-badges] > div:nth-child(1)').should('contain.text', 'Followers:');
        cy.get('[data-test-badges] > div:nth-child(2)').should('contain.text', 'Following:');
        cy.get('[data-test-badges] > div:nth-child(3)').should('contain.text', 'Public Repos:');
        cy.get('[data-test-badges] > div:nth-child(4)').should('contain.text', 'Public Gists:');
    });

    describe('Navigation', () => {
        beforeEach(() => {
            cy.visit('http://localhost:3000/user/bradtraversy')
        });

        it('should navigate to the home page when the user clicks "Back to Search"', () => {
            cy.get('[data-test-btn-back]').click();
            cy.url().should('be.equal', 'http://localhost:3000/')
        });
    })
});