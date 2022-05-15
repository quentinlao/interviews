import { Typography } from '@mui/material';
import { IMovie } from '../../types';
import { URL_IMAGE } from '../../utils/constants/constants';
import { SliderView } from '../../components/sliderView/sliderView';
import { useAppSelector } from '../../hooks/hooks';
import { ContentBar } from '../../components/contentBar/contentBar';
import { Section } from '../../components/section/section';

export const PopularityPage = (): JSX.Element => {
    const movies = useAppSelector((state) => state.movie);
    const myMovies = movies?.results;
    const ImageData =
        myMovies !== undefined ? myMovies.map((movie: IMovie) => ({ image: `${URL_IMAGE}${movie.poster_path}` })) : [];

    return (
        <ContentBar>
            <Section flexDirection="column">
                <Typography data-test-id="popularTitleId" variant="h2" gutterBottom component="div">
                    Film en vedette
                </Typography>
                <SliderView slides={ImageData} />
            </Section>
        </ContentBar>
    );
};
