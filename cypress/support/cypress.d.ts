// cypress/support/cypress.d.ts

declare namespace Cypress {
    interface Chainable {
      login(): Chainable<Element>;
    }
  }
  