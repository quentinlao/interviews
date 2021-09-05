require('dotenv').config();
const axios = require('axios');
const express = require('express');
const app = express();
const API_URL = 'https://api.zoom.us/v2';

// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader(
        'Access-Control-Allow-Origin',
        'http://localhost:3000'
    );

    // Request methods you wish to allow
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );

    // Request headers you wish to allow
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type'
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

function getListMeeting() {
    console.log(process.env.REACT_APP_JWT_INTERVIEW);
    return axios
        .get(API_URL + '/users/me/meetings', {
            headers: {
                Authorization:
                    'Bearer ' + process.env.REACT_APP_JWT_INTERVIEW,
            },
        })
        .then((response) => {
            console.log(
                '🚀 ~ file: index.js ~ line 17 ~ .then ~ response',
                response
            );
            app.get('/meetings', (req, res) => {
                res.status(200).json(response.data.meetings);
            });

            return Promise.resolve(response);
        })
        .catch((error) => {
            console.log(
                '🚀 ~ file: zoom.service.tsx ~ line 39 ~ .then ~ error',
                error
            );
        });
}

getListMeeting();

app.listen(9292, () => {
    console.log('Server');
});
