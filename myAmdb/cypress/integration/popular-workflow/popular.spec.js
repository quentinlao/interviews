/// <reference types="cypress" />

import { expect } from 'chai';
const API_KEY_DEV = process.env.API_KEY_DEV;
const API_AMBD_API = 'https://api.themoviedb.org/3';
describe('Welcoming flow', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.request(
            'GET',
            `${API_AMBD_API}/discover/tv?api_key=${API_KEY_DEV}&language=en-US&sort_by=popularity.desc&page=3&timezone=America/New_York&include_null_first_air_dates=false`
        ).should((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('Check display welcoming', () => {
        cy.get('[data-test-id="logo"]').should('be.visible');
        cy.get('[data-test-id="popularLink"]').should('be.visible');
        cy.get('[data-test-id="popularLink"]').click();
        cy.get('[data-test-id="popularLink"]').children().should('be.visible');
        cy.get('[data-test-id="popularLink"]').children().should('have.attr', 'aria-current');
        cy.get('[data-test-id="popularTitleId"]').should('be.visible');
        cy.get('#leftArrow').should('be.visible');
        cy.get('#slider0').should('be.visible');
        cy.get('#rightArrow').should('be.visible');
    });
    it('Check scrolling', () => {
        cy.get('[data-test-id="popularLink"]').click();
        cy.get('#leftArrow').should('be.visible').click();
        cy.get('#slider19').should('be.visible');
        cy.get('#rightArrow').should('be.visible').click();
        cy.get('#slider0').should('be.visible');
    });
});
