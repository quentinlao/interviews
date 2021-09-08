/// <reference types="cypress" />
const CALENDAR_ID = 'calendarId';
/**
 * IT Calendar component
 */
describe('Form', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    const CLIENT_NAME = 'MEETING';
    const POST_MEETING = 'postMeeting';
    const stubMeeting = (http: string) => {
        cy.intercept('POST', '/meetings').as(POST_MEETING);
    };

    const waitStubMeeting = () => {
        cy.wait(`@${POST_MEETING}`).then((req) => {
            const payload = req.request.body;
            assert.isNotEmpty(payload);
            assert.equal(payload.client, CLIENT_NAME);
        });
    };

    it('check calendar is displayed and open modal', () => {
        cy.get(`#${CALENDAR_ID}`).should('be.visible');
        // ONLY IF IT IS WEEK 5 SEPTEMBER 2021
        cy.get(`[data-time="01:30:00"]`).eq(1).click();
        cy.get('#MODAL_ID').should('be.visible');
        cy.get('#clientName').should('be.visible').type(CLIENT_NAME);
        cy.get('#startDate')
            .should('be.visible')
            .should('have.value', '2021-09-08T01:30');
        cy.get('#duration').should('be.visible').type('60');
        cy.get('#CLOSE').should('be.visible');
        cy.get('#SAVE').should('be.visible');
        stubMeeting('GET');
        cy.get('#SAVE').click();
        waitStubMeeting();
    });
});
