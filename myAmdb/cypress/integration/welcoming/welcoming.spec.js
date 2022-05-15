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

    it('Check configuration', () => {
        cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
        cy.title().should('include', 'My amdb');
    });

    it('Check display welcoming', () => {
        cy.get('[data-test-id="logo"]').should('be.visible');
        cy.get('[data-test-id="popularLink"]').should('be.visible');
        cy.get('[data-test-id="moviesLink"]').should('be.visible');
    });
});
