import { render, cleanup } from '@testing-library/react';

import '@testing-library/jest-dom';

import { ContentBar } from './contentBar';

afterEach(cleanup);

let container: HTMLElement;

describe('ContentBar component suites tests', () => {
    beforeEach(() => {
        const component = render(<ContentBar>Salut le monde</ContentBar>);
        container = component.container;
    });
    test('Verify basic ContentBar displayed', () => {
        expect(container).toBeInTheDocument();
    });
});
