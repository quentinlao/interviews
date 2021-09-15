require('dotenv').config();
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const rq = require('request-promise');

const app = express();
const API_URL = 'https://api.zoom.us/v2';

// create application/json parser
const jsonParser = bodyParser.json();

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

/**
 * create query param
 */
function encodeQueryData(data) {
    const ret = [];
    for (let d in data)
        ret.push(
            encodeURIComponent(d) + '=' + encodeURIComponent(data[d])
        );
    return ret.join('&');
}

app.get('/meetings', jsonParser, (req, res) => {
    const data = { page_size: 300 };

    const queryString = encodeQueryData(data);

    var options = {
        method: 'GET',
        uri: `https://api.zoom.us/v2/users/me/meetings?${queryString}`,
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
            console.log(
                '🚀 ~ file: index.js ~ line 59 ~ app.get ~ response.meetings',
                response.meetings.length
            );
            res.status(200).json(response.meetings);
        })
        .catch(function (err) {
            // API call failed...
            console.log('API call failed, reason ', err);
        });
});

app.post('/meetings', jsonParser, (req, res) => {
    var options = {
        method: 'POST',
        uri: 'https://api.zoom.us/v2/users/me/meetings',
        body: {
            topic: req.body.client,
            type: 2,
            start_time: req.body.startDate,
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
            console.log(
                '🚀 ~ file: index.js ~ line 107 ~ response',
                response
            );
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

app.patch('/meetings', jsonParser, (req, res) => {
    var options = {
        method: 'PATCH',
        uri: `https://api.zoom.us/v2/meetings/${req.body.idMeeting}`,
        body: {
            topic: req.body.client,
            type: 2,
            start_time: req.body.startDate + ':00Z',
            duration: req.body.duration,
            timezone: 'UTC',
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
            res.status(204).json([]);
        })
        .catch(function (err) {
            // API call failed...
            console.log('API call failed, reason ', err);
        });
});

app.delete('/meetings', jsonParser, (req, res) => {
    var options = {
        method: 'DELETE',
        uri: `https://api.zoom.us/v2/meetings/${req.body.idMeeting}`,
        auth: {
            bearer: process.env.REACT_APP_JWT_INTERVIEW,
        },
        headers: {
            'User-Agent': 'Zoom-api-Jwt-Request',
        },
        json: true, //Parse the JSON string in the response
    };

    rq(options)
        .then(function (response) {
            res.status(204).json([]);
        })
        .catch(function (err) {
            // API call failed...
            console.log('API call failed, reason ', err);
        });
});

app.listen(9292, () => {
    console.log('Server API ZOOM');
});
