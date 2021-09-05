import React from 'react';
import Typography from '../Typography/Typography';

interface IWelcome {
    title: string;
    description: string;
}
const Welcome = (props: IWelcome) => {
    const { title, description } = props;
    return (
        <header className="jumbotron">
            <Typography>
                <h1 className="display-3">{title}</h1>
            </Typography>
            <Typography>
                <h1 className="display-3">
                    <p className="lead">{description} </p>
                </h1>
            </Typography>
            <hr className="my-2" />
        </header>
    );
};

export default Welcome;
