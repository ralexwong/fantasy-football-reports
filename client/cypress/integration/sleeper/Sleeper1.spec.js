/// <reference types="cypress" />

describe('Actions', () => {
    beforeEach(() => {
      cy.visit('localhost:3000/sleeper')
    })

    it("should display the same output as input", () => {
        cy.get('#sleeperUsername')
        .type('wongman').should('have.value', 'wongman')
    })

    it("should display the same output as input", () => {
        cy.get('#sleeperUsername')
        .type('wongman').should('have.value', 'wongman')
    })
})