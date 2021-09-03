/// <reference types="cypress" />
import { CALENDAR_ID } from '../../../src/components/widget/Calendar';

/**
 * IT Calendar component
 */
describe('Form', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('check calendar is displayed', () => {
        cy.get('#calendarId').should('be.visible');
    });
});
