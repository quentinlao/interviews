import React, { useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './SliderView.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface ISliderViewProps {
    slides: ImageUrl[];
}

interface ImageUrl {
    image: string;
}
export const SliderView = (props: ISliderViewProps) => {
    const { slides } = props;
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };
    const styleIcon = { color: 'primary.main', fontSize: 40 };
    return (
        <div className="sliderView">
            <ArrowBackIcon id="leftArrow" onClick={prevSlide} sx={styleIcon} />
            {slides.map((slide: ImageUrl, index: number) => {
                return (
                    <div key={index}>
                        {index === current && <img id={`slider${index}`} src={slide.image} alt={`slider${index}`} />}
                    </div>
                );
            })}
            <ArrowForwardIcon id="rightArrow" onClick={nextSlide} sx={styleIcon} />
        </div>
    );
};
