import { render, cleanup } from '@testing-library/react';

import '@testing-library/jest-dom';

import { NavBar } from './navBar';

afterEach(cleanup);

let container: HTMLElement;

describe('NavBar component suites tests', () => {
    beforeEach(() => {
        const component = render(<NavBar>Salut le monde</NavBar>);
        container = component.container;
    });
    test('Verify basic NavBar displayed', () => {
        expect(container).toBeInTheDocument();
    });
});
