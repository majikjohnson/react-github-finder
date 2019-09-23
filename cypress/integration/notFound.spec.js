/// <reference types="Cypress" />

describe("Not Found page", () => {
    before(() => {
        cy.visit("/badurl");
    });
    
    it("should display the 'Not Found' page if an incorrect URL is entered", () => {
        cy.get("div.container h1").should("have.text", "Not Found");
    });

    it("should contain the correct content", () => {
        cy.get("div.container p.lead").should("have.text", "The page you are looking for does not exist.");
    });
});