<h1 align="center">Calendar project</h1>
<p align="center">Design a web page that allows a Calendar to create a zoom meeting</p>

# Introduction

## Personal goal

<ul>
<li>Work on a calendar lib and see the potential for customization UI</li>
<li>Create a generic calendar component that can be reused for my other projects</li>
<li>Discover the Zoom API to make a meeting CRUD</li>
<li>Creation of an IT to cover the component with a Cypress report / Creation of the TC</li>
<li>"Optional initialization of a debian container, make a docker recipe compose with all dependencies and open the right ports for endpoint Zoom"</li>
</ul>

# Readme

## Initialization

### Config

Add to env `REACT_APP_JWT_INTERVIEW` the token created for zoom jwt connection it will be expired at `00:00 09/24/2021`

-   `.env`
-   `/api/.env`

### client port 3000

To start the client, ddl dep `yarn` and to start `yarn start`

-   `yarn`
-   `yarn start`

### server port 9292

To start the server mode to folder `api`

-   `node index.js`

### For the interview

Objective not really realize step done and not :

<ul>
<li><strike>Display 1 week calendar</strike></li>
<li><strike>READ from api zoom all meetings <b>READ BUG on recall GET doesn't find all records even with param_size 300</b></strike></li>
<li><strike>CREATE an event from api zoom with calendar</strike></li>
<li><strike>Creation of test component Cypress</strike></li>
<li>Creation of project config : <strike>test cypress, prettier, i18n, typeStyle, report nyc merge, composeWithDevTools</strike>, eject projec for webpack</li>
<li>Drag n drop event to calendar</li>
<li><strike>UPDATE event when dropEvent call</strike></li>
<li><strike>Rule to show warning not 1pm to 2 pm</strike></li>
<li><strike>DELETE event when click on sumerize Modal</strike></li>
<li>Create a recipe to configure a container with back front open to external for API ZOOM</li>
<li>Need rework : Duration is not use because meeting is fixed to 1 hour, rework date with moment js but no time at all</li>

</ul>

# Launch test

Stop all, test without server (need to mock server api)

-   `yarn cypress:open` (launch app and cypress)
-   `yarn cypress:run` (launch test cli)

# Coverage report

To check coverage report

-   `coverage/lcov-report/index.html`

## Information

# Globaly

-   Create react app project
-   i don't want to configure myself webapck : Script babel -> `node_modules/react-scripts/scripts`
-   `SKIP_PREFLIGHT_CHECK=true` env because i don't configure with CRA (ID cypress/code)

# For me

-   `dotenv` env.dev
-   `gitignore` add more rules
-   `prettierignore` / prettierrc rules config
-   `settings.json` personnal vscode rules todo because prettier.configPath
-   `cypress.json` to redefine path
-   API Zoom can't fetch from client side https://devforum.zoom.us/t/fetching-user-account-info-from-a-react-spa/25517
-   `i18n` configuration for translation

# Why not JWT and not OAuth

-   Don't want to create an `access_token based` on `API_SECRET` to call zoom verification, play with interceptor for `refresh token`
    POST /oauth/token -> header `Authorization Basic zoom_client_id:zoom_api_secret`(b64) -> scope, `authorizationServer` -> `access_token` `expires_in`, `token_type bearer` -> `ressourceServer`
-   JWT send to interviewer with delay 1 week token will be expired at `00:00 09/24/2021` 2 steps less to program with JWT

# API ZOOM

Configuration
`{{baseUrl}}` = https://api.zoom.us/v2
`me` = only 1 user

READ all meeting

`curl GET {{baseUrl}}/users/me/meetings?page_size=300`
headers : Bearer token

CREATE a meeting

`curl POST {{baseUrl}}/users/me/meetings`
headers :

-   Authorization : Bearer token
-   Content-Type : application/json
    body :
    {
    "duration": 60,
    "start_time": "2021-09-06T10:00:00Z",
    "topic": "hello calendar",
    "type": 2
    }

UPDATE a meeting

`curl PATCH {{baseUrl}}/meetings/idMeeting`

-   Authorization : Bearer token
-   Content-Type : application/json
    {
    "duration": 60,
    "start_time": "2021-09-06T10:00:00Z",
    "topic": "hello calendar",
    "type": 2
    }

DELETE a meeting

`curl DELETE {{baseUrl}}/meetings/idMeeting`
