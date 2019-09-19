Cypress.Commands.add("startSearchPageStubs", searchTerm => {
  const apiSearch = `https://api.github.com/search/users?q=${searchTerm}&client_id=${Cypress.env(
    "REACT_APP_GITHUB_CLIENT_ID"
  )}&client_secret=${Cypress.env(
    "REACT_APP_GITHUB_CLIENT_SECRET"
  )}`;
  cy.server();
  cy.route("GET", apiSearch, `fixture:github/users/search_${searchTerm}`);
});

Cypress.Commands.add("startUserPageStubs", user => {
  const apiUser = `https://api.github.com/users/${user}?client_id=${Cypress.env('REACT_APP_GITHUB_CLIENT_ID')}&client_secret=${Cypress.env('REACT_APP_GITHUB_CLIENT_SECRET')}`
  const apiRepos = `https://api.github.com/users/${user}/repos?per_page=5&sort=created:asc&client_id=${Cypress.env('REACT_APP_GITHUB_CLIENT_ID')}&client_secret=${Cypress.env('REACT_APP_GITHUB_CLIENT_SECRET')}`
  cy.server();
  cy.route('GET', apiUser, `fixture:github/users/user_${user}`).as('getUser');
  cy.route('GET', apiRepos, `fixture:github/repos/repos_${user}`).as('getRepos');
  });
