// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, pw) => {
  cy.request('http://localhost:9000/api/authentication')
    .then((response) => {
      const csrf = response.headers['set-cookie'][0].split(';')[0].split('=')[1]
      cy.request({
        method: 'POST',
        url: 'http://localhost:9000/api/authentication',
        form: true,
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': csrf,
        },
        body:  {
          'username': email,
          'password': pw,
          'remember-me': false,
          'submit': 'Login'
        }
      })
    })
})

Cypress.Commands.add('logout', () => {
  cy.request('http://localhost:9000/api/authentication')
    .then((response) => {
      const csrf = response.headers['set-cookie'][0].split(';')[0].split('=')[1]
      cy.request({
        method: 'POST',
        url: 'http://localhost:9000/api/logout',
        form: true,
        headers: {
          'X-XSRF-TOKEN': csrf,
        }
      })
    })
})
