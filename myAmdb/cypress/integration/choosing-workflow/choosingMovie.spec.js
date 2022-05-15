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
        cy.get('[data-test-id="moviesLink"]').should('be.visible').click();
        cy.get('[data-test-id="moviesTitleId"]').should('be.visible');
        cy.get('[data-test-id="searchMovieId"]').should('be.visible');
        cy.get('[data-test-id="movie0"]').should('be.visible');
        cy.get('[data-test-id="movie18"]').scrollIntoView().should('be.visible');
    });
    it('Check search', () => {
        cy.get('[data-test-id="moviesLink"]').should('be.visible').click();

        cy.get('[data-test-id="searchMovieId"]').scrollIntoView().should('be.visible');
        cy.get('[data-test-id="searchMovieId"]').type('Noovo').should('be.visible');
        cy.get('[data-test-id="moviesListId"]').children().first().should('be.visible').click();
        cy.get('[data-test-id="movieFoundId"]').should('be.visible').should('contain', 'Noovo');

        cy.get('[data-test-id="movieLabelTitleId"]').should('be.visible').should('contain', 'Titre du film');
        cy.get('[data-test-id="movieLabelNameId"]').should('be.visible').should('contain', `Nom d'origine`);
        cy.get('[data-test-id="movieLabelOverviewId"]').should('be.visible').should('contain', `Résumé`);
        cy.get('[data-test-id="movieLabelDateId"]').should('be.visible').should('contain', `Date de parution`);
        cy.get('[data-test-id="movieLabelLangueId"]').should('be.visible').should('contain', `Langue`);
        cy.get('[data-test-id="movieLabelPopularId"]').should('be.visible').should('contain', `Popularité`);
        cy.get('[data-test-id="movieLabelVoteId"]').should('be.visible').should('contain', `Nombre de votes`);

        cy.get('[data-test-id="returnMovieId"]').should('be.visible').click();
    });
});
