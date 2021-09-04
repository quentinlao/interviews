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

# client

port 3000

-   yarn
-   yarn start

# server

port 8080

-   node index.js

## Integration test

# Launch

-   yarn cypress:open (launch app and cypress)
-   yarn cypress:run (launch test cli)

# Coverage

-   coverage/lcov-report/index.html

## Information

# Globaly

-   Create react app
-   i don't want to configure myself webapck : Script babel -> node_modules/react-scripts/scripts
-   SKIP_PREFLIGHT_CHECK=true env because i don't configure with CRA (ID cypress/code)

# For me

-   dotenv env.dev
-   gitignore add more rules
-   prettierignore / prettierrc rules config
-   settings.json personnal vscode rules todo because prettier.configPath
-   cypress.json to redefine path
-   API Zoom can't fetch from client side https://devforum.zoom.us/t/fetching-user-account-info-from-a-react-spa/25517

# Why not JWT and not OAuth

-   Don't want to create an access_token based on API_SECRET to call zoom verification, play with interceptor for refresh token
    POST /oauth/token -> header Authorization Basic zoom_client_id:zoom_api_secret(b64) -> scope, authorizationServer -> access_token expires_in, token_type bearer -> ressourceServer
-   JWT send to interviewer with delay 1 week token will be expired at 00:00 09/24/2021 2 steps less to program with JWT
