import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export const MoviePage = (): JSX.Element => {
    const params = useParams();

    return (
        <>
            <Typography variant="h2" gutterBottom component="div">
                Selected {params.movieId}
            </Typography>
        </>
    );
};
