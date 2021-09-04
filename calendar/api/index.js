require('dotenv').config();
const axios = require('axios');
const express = require('express');
const app = express();
const API_URL = 'https://api.zoom.us/v2';

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

app.listen(8080, () => {
    console.log('Server');
});
