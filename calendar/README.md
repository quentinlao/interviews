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

-   yarn
-   yarn start

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

-   env.dev
-   gitignore add more rules
-   prettierignore / prettierrc rules config
-   settings.json personnal vscode rules todo because prettier.configPath
-   cypress.json to redefine path
