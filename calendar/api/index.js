require('dotenv').config();
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const rq = require('request-promise');

const app = express();
const API_URL = 'https://api.zoom.us/v2';

// create application/json parser
const jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

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
    return axios
        .get(API_URL + '/users/me/meetings', {
            headers: {
                Authorization:
                    'Bearer ' + process.env.REACT_APP_JWT_INTERVIEW,
            },
        })
        .then((response) => {
            app.get('/meetings', (req, res) => {
                // need to rework with RQ response
                res.status(200).json(response.data.meetings);
            });

            return Promise.resolve(response);
        })
        .catch((error) => {});
}

function createMeeting2(client, startDate, duration) {
    return axios
        .post(
            API_URL + '/users/me/meetings',
            {
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_JWT_INTERVIEW}`,
                    'User-Agent': 'Zoom-api-Jwt-Request',
                    'content-type': 'application/json',
                },
            },
            {
                body: {
                    topic: client,
                    start_time: startDate,
                    duration: Number(duration),
                    type: 2,
                },
            }
        )
        .then((response) => {
            console.log(
                '🚀 ~ file: index.js ~ line 73 ~ .then ~ response',
                response
            );
            return Promise.resolve(response);
        })
        .catch((error) => {
            console.log(
                '🚀 ~ file: index.js ~ line 80 ~ createMeeting ~ error',
                error
            );
        });
}

app.post('/meetings', jsonParser, (req, res) => {
    /* createMeeting(
        req.body.client,
        req.body.startDate,
        req.body.duration
    ); */

    var options = {
        method: 'POST',
        uri: 'https://api.zoom.us/v2/users/me/meetings',
        body: {
            topic: req.body.client,
            type: 2,
            start_time: req.body.startDate + ':00Z',
            duration: req.body.duration,
        },
        auth: {
            bearer: process.env.REACT_APP_JWT_INTERVIEW,
        },
        headers: {
            'User-Agent': 'Zoom-api-Jwt-Request',
            'content-type': 'application/json',
        },
        json: true, //Parse the JSON string in the response
    };

    rq(options)
        .then(function (response) {
            console.log('response is: ', response);
            res.status(200).json([
                {
                    uuid: response.uuid,
                    id: response.id,
                    host_id: response.host_id,
                    topic: response.topic,
                    type: response.type,
                    start_time: response.start_time,
                    duration: response.duration,
                    timezone: response.timezone,
                    created_at: response.created_at,
                    join_url: response.join_url,
                },
            ]);
        })
        .catch(function (err) {
            // API call failed...
            console.log('API call failed, reason ', err);
        });
});

getListMeeting();

app.listen(9292, () => {
    console.log('Server');
});
