import React from 'react';

interface IWelcome {
    title: string;
    description: string;
}
const Welcome = (props: IWelcome) => {
    const { title, description } = props;
    return (
        <header className="jumbotron">
            <h1 className="display-3">{title}</h1>
            <p className="lead">{description} </p>
            <hr className="my-2" />
        </header>
    );
};

export default Welcome;
