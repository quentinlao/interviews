import { render, cleanup } from '@testing-library/react';

import '@testing-library/jest-dom';

import { NavLinkView } from './navLinkView';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

let container: HTMLElement;

describe('navLink component suites tests', () => {
    beforeEach(() => {
        const component = render(
            <BrowserRouter>
                <NavLinkView to="/popularity">Populaires</NavLinkView>
            </BrowserRouter>
        );
        container = component.container;
    });
    test('Verify basic navLink displayed', () => {
        expect(container).toBeInTheDocument();
    });
});
