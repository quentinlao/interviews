import { render, cleanup, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import { fireEvent } from '@testing-library/dom';
import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../../api/movie.slice';
import { SliderView } from './sliderView';

afterEach(cleanup);

let container: HTMLElement;
const IMAGE_DATA = [
    { image: 'https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png' },
    { image: 'https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png' },
    { image: 'https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png' },
];
describe('Slider component suites tests', () => {
    beforeEach(() => {
        const component = render(<SliderView slides={IMAGE_DATA} />);
        container = component.container;
    });
    test('Verify basic Slider displayed', () => {
        expect(container).toBeInTheDocument();
        const imageSlider = screen.getByRole('img');
        expect(imageSlider).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png');
        expect(imageSlider).toHaveAttribute('alt', 'slider0');
    });
    test('Verify slider action', () => {
        expect(container).toBeInTheDocument();
        const buttonLeft = container.querySelector('#leftArrow');
        expect(buttonLeft).toBeInTheDocument();
        if (buttonLeft !== null) {
            fireEvent.click(buttonLeft);
        }
        expect(screen.getByRole('img')).toHaveAttribute('alt', 'slider2');

        const buttonRight = container.querySelector('#rightArrow');
        expect(buttonRight).toBeInTheDocument();
        if (buttonRight !== null) {
            fireEvent.click(buttonRight);
        }
        expect(screen.getByRole('img')).toHaveAttribute('alt', 'slider0');
    });
});
