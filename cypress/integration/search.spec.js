/// <reference types="Cypress" />

describe("Github Finder search functionality", () => {
  const githubSearchUsersEndpoint = "/search/users*";
  const githubUserSearchTerm = "brad";

  describe("Spinner Component", () => {
    it.only("should display spinner while waiting for Github API call to return", () => {
      cy.server();
      //cy.route({
      //  method: "GET",
      //  url: githubSearchUsersEndpoint,
      //  response: `fixture:github/users/search_${githubUserSearchTerm}.json`,
      //  delay: 3000
      //});
      const githubUserSearchTerm = "brad";
      cy.startSearchPageStubs(githubUserSearchTerm, 3000);
      cy.visit("/");
      cy.get('[data-test-id="searchBox"]').type(githubUserSearchTerm);
      cy.get(".btn").click();
      cy.get("div.container img")
        .should("exist")
        .and("have.attr", "alt", "Loading...");
    });
  });

  describe("Search results", () => {
    before(() => {
      const githubUserSearchTerm = "brad";
      cy.startSearchPageStubs(githubUserSearchTerm);
      cy.visit("/");
      cy.get('[data-test-id="searchBox"]').type(githubUserSearchTerm);
      cy.get(".btn").click();
    });

    it("should contain 30 user items", () => {
      cy.get('[data-test-selector="userCard"]').should("have.length", 30);
    });

    it("should have user items that contain the user avatar image", () => {
      cy.get('[data-test-selector="userCard"]:first-child img').should(
        "have.attr",
        "src",
        "https://avatars0.githubusercontent.com/u/1614?v=4"
      );
    });

    it("should have user items that contain the github login", () => {
      cy.get('[data-test-selector="userCard"]:nth-child(2) h3').should(
        "have.text",
        "bradtraversy"
      );
    });

    it("should have user items that contain a button pointing to the user github profile page", () => {
      cy.get('[data-test-selector="userCard"]:nth-child(3) a')
        .should("have.attr", "href", "/user/bradfitz")
        .and("have.text", "more");
    });

    it('should maintain search results when navigating between pages', () => {
      cy.get('nav.navbar').contains('About').click();
      cy.url().should('contain', '/about');
      cy.get('nav.navbar').contains('Home').click();
      cy.get('[data-test-selector="userCard"]').should("have.length", 30);
    });

  });

  describe('Clear button', () => {
    const githubUserSearchTerm = "brad";
    
    beforeEach(() => {
      cy.startSearchPageStubs(githubUserSearchTerm);
      cy.visit("/");
    });    

    it('should appear if there are user search results displayed', () => {
      cy.get('[data-test-id="searchBox"]').type(githubUserSearchTerm);
      cy.get('.btn').click();
      cy.get('[data-test-id="clearButton"]')
        .should('exist')
        .and('have.text', 'Clear');
    });

    it('should not appear if there are no user search results displayed', () => {
      cy.get('[data-test-id="clearButton"]').should('not.exist');
    });

    it('should clear the search results', () => {
      cy.get('[data-test-id="searchBox"]').type(githubUserSearchTerm);
      cy.get('.btn').click();
      cy.get('[data-test-selector="userCard"]').should('have.length', 30);
      cy.get('[data-test-id="clearButton"]').click();
      cy.get('[data-test-selector="userCard"]').should('not.exist');
    });
  });

  describe('Alert', () => {
    it('should show an alert if the user submits an empty search', () => {
      cy.visit('/');
      cy.get('.btn').click();
      cy.get('.alert').should('exist');
    });

    it('should hide the alert after a short period of time', () => {
      cy.visit('/');
      cy.get('.btn').click();
      cy.get('.alert').should('exist');
      cy.wait(3250).then(() => {
        cy.get('.alert').should('not.exist');
      });
    });

  });
});
