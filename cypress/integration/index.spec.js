/// <reference types="Cypress" />

describe("Github Finder homepage", () => {
  before(() => {
    cy.visit("/");
  });

  it("should have the correct title", () => {
    cy.title().should("be.equal", "Github Finder");
  });

  it("should have the correc page heading", () => {
    cy.get("h1").should("contain.text", "Github Finder");
  });

  it("should contain the github image on the navbar", () => {
    cy.get("h1 i").should("have.class", "fa-github");
  });

  it("should have a search field with correct placeholder text", () => {
    cy.get('input[data-test-id="searchBox"]').should(
      "have.attr",
      "placeholder",
      "Enter username..."
    );
  });

  it("should have a search button", () => {
    cy.get(".btn").should("have.text", "Search");
  });
});
