/// <reference types="Cypress" />

describe("Github Finder search functionality", () => {
  const githubSearchUsersAPI = "/search/users*";

  describe("Spinner Component", () => {
    it("should display spinner while waiting for Github API call to return", () => {
      cy.server();
      cy.route({
        method: "GET",
        url: githubSearchUsersAPI,
        response: {
          items: [
            {
              login: "mojombo",
              id: 1,
              avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
              url: "https://api.github.com/users/mojombo",
              html_url: "https://github.com/mojombo"
            }
          ]
        },
        delay: 3000
      });
      cy.visit("http://localhost:3000");
      cy.get('[data-test-id="searchBox"]').type("majik");
      cy.get(".btn").click();
      cy.get("div.container img")
        .should("exist")
        .and("have.attr", "alt", "Loading...");
    });
  });

  describe("Search results", () => {
    before(() => {
      cy.visit("http://localhost:3000");
      cy.get('[data-test-id="searchBox"]').type("majik");
      cy.get(".btn").click();
    });

    it("should contain 30 user items", () => {
      cy.get('[data-test-selector="userCard"]').should("have.length", 30);
    });

    it("should have user items that contain the user avatar image", () => {
      cy.get('[data-test-selector="userCard"]:first-child img').should(
        "have.attr",
        "src",
        "https://avatars0.githubusercontent.com/u/17090?v=4"
      );
    });

    it("should have user items that contain the github login", () => {
      cy.get('[data-test-selector="userCard"]:nth-child(2) h3').should(
        "have.text",
        "majikarp"
      );
    });

    it("should have user items that contain a button pointing to the user github profile page", () => {
      cy.get('[data-test-selector="userCard"]:nth-child(3) a')
        .should("have.attr", "href", "https://github.com/majikang")
        .and("have.text", "more");
    });
  });

  describe('Clear button', () => {
    it('should appear if there are user search results displayed', () => {
      cy.visit('http://localhost:3000');
      cy.get('[data-test-id="searchBox"]').type("majik");
      cy.get('.btn').click();
      cy.get('[data-test-id="clearButton"]')
        .should('exist')
        .and('have.text', 'Clear');
    });

    it('should not appear if there are no user search results displayed', () => {
      cy.visit('http://localhost:3000');
      cy.get('[data-test-id="clearButton"]').should('not.exist');
    });

    it('should clear the search results', () => {
      cy.visit('http://localhost:3000');
      cy.get('[data-test-id="searchBox"]').type('majik');
      cy.get('.btn').click();
      cy.get('[data-test-selector="userCard"]').should('have.length', 30);
      cy.get('[data-test-id="clearButton"]').click();
      cy.get('[data-test-selector="userCard"]').should('not.exist');

    });
  });
});
