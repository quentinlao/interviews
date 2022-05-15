import { render, cleanup } from '@testing-library/react';

import '@testing-library/jest-dom';

import { getByText } from '@testing-library/dom';
import { Section } from './section';

afterEach(cleanup);

let container: HTMLElement;

describe('Section component suites tests', () => {
    beforeEach(() => {
        const component = render(
            <Section flexDirection="row" padding="0 15px 0 0" width="700px" justifyContent="center" alignItems="center">
                Salut le monde
            </Section>
        );
        container = component.container;
    });
    test('Verify basic Section displayed', () => {
        expect(container).toBeInTheDocument();
        expect(getByText(container, 'Salut le monde')).toBeInTheDocument();
    });
    test('Verify component styled props', () => {
        expect(container).toBeInTheDocument();
        const sectionContainer = getByText(container, 'Salut le monde');
        expect(sectionContainer).toHaveStyle('alignItems: center');
        expect(sectionContainer).toHaveStyle('flexDirection: row');
        expect(sectionContainer).toHaveStyle('padding: 0 15px 0 0');
        expect(sectionContainer).toHaveStyle('width: 700px');
        expect(sectionContainer).toHaveStyle('justifyContent: center');
    });
});
