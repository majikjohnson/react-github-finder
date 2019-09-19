Cypress.Commands.add("startSearchPageStubs", (searchTerm, delay) => {
  delay = delay || 0;
  const apiSearch = `https://api.github.com/search/users?q=${searchTerm}&client_id=${Cypress.env(
    "REACT_APP_GITHUB_CLIENT_ID"
  )}&client_secret=${Cypress.env(
    "REACT_APP_GITHUB_CLIENT_SECRET"
  )}`;
  cy.server();
  cy.route({
      method: "GET", 
      url: apiSearch, 
      response: `fixture:github/users/search_${searchTerm}.json`,
      delay: delay
    });
});

Cypress.Commands.add("startUserPageStubs", (user, delay) => {
  delay = delay || 0;
  const apiUser = `https://api.github.com/users/${user}?client_id=${Cypress.env('REACT_APP_GITHUB_CLIENT_ID')}&client_secret=${Cypress.env('REACT_APP_GITHUB_CLIENT_SECRET')}`
  const apiRepos = `https://api.github.com/users/${user}/repos?per_page=5&sort=created:asc&client_id=${Cypress.env('REACT_APP_GITHUB_CLIENT_ID')}&client_secret=${Cypress.env('REACT_APP_GITHUB_CLIENT_SECRET')}`
  cy.server();
  cy.route({
      method: "GET", 
      url: apiUser, 
      response: `fixture:github/users/user_${user}.json`,
      delay: delay
  });
  cy.route({
      method: "GET", 
      url: apiRepos, 
      response: `fixture:github/repos/repos_${user}.json`,
      delay: delay
  });
});