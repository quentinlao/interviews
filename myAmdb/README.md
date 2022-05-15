# [MyAmdb](https://github.com/quentinlao/interviews/tree/main/myAmdb/)

MyAmdb is an application that use https://developers.themoviedb.org/3/ API to show a list of movie. Main demonstration :

-   **Architecture project** Simple react app configuration without CRA see https://medium.com/@sakeshi/the-project-crt-skeleton-61c72f10763d
-   **Redux** a bit overkill but simple demonstration RTK.
-   **Reac router** simple routing management for pages.
-   **React queries** simple queries for server management data.
-   **Testing strategy** Design unit test, integration (end to end) and report lcov coverage.

## Introduction and project configuration

Specification in this project display a list of movies or series. Bonus : be able to consult the details of a movie or a series. Deliver the source code of the exercise.

**Project stack**:

-   React API 18 with Hooks [React hooks](https://fr.reactjs.org/docs/hooks-intro.html).
-   Typescript [TS](https://www.typescriptlang.org/).
-   Standard CSS (CSS-loader, style-loader) and [Material UI](https://mui.com/material-ui).
-   Yarn package manager [yarn](https://yarnpkg.com/).
-   Webpack bundler [webpack](https://webpack.js.org/).
-   Babel JS compiler ECMAScript 2015+ [babel](https://babeljs.io/docs/en/) (arrow function, and so on).
-   Prettier [prettier](https://prettier.io/) configuration with VScode
-   ESlint [ESlint](https://eslint.org/) linter fix auto config VScode
-   Jest [Jest](https://jestjs.io/fr/) unit test
-   Cypress [Cypress](https://www.cypress.io/) end to end testing (features workflow)
-   Lcov report cypress HTML and NYC coverage report
-   Axios for request HTTP handling data
-   dotenv to configure .env

## Pre installation (toolings)

VSCODE extensions used to develop faster

-   Prettier

Config path prettier user VSCODE in settings.json: `.prettierrc.json`

-   ESlint

This plugin is used to help you to develop and add rules to stylesheet your coding style.

-   Git hooks

Run the .bat script in `<GIT_DIRECTORY>/.git-hooks` to instanciate the git hooks configuration on your project.

**/!\ only use bash terminal**

# Installation

-   Default project `PORT=8085`, starting the project with `yarn` to install all dependancies and use this command to launch

```
yarn start
```

-   Build project in one package

```
yarn build
```

-   Unit test created in jest and coverage in folder `.coverage/jest-coverage`

```
yarn ut
```

-   Integration test for working flow test in folder `.coverage/cypress-coverage`

```
yarn it
```

-   Starting cypress to start specific it

```
yarn cy:open
```

-   Copy in folder `.coverage` reports UT and IT

```
yarn reports:move
```

-   Merge reports with Nyc

```
yarn reports:merge
```

-   Combined reports and create new report in `.coverage/combined`

```
yarn reports:combined
```

-   Execute all coverages commands IT/UT and move, merge and combined

```
yarn reports:coverage
```

## Project structure

| File or folder                  | Description                                                                                                                                          |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/index.tsx`                 | The entry file with all providers (router, react queries, redux). This is where we import babel polyfills and render the App into the root DOM node. |
| `src/index.html`                | The only HTML file in our App. All scripts and styles will be injected here by Webpack.                                                              |
| `src/assets/**`                 | All the static assets exported to index.tsx                                                                                                          |
| `src/api/**`                    | Services API for managing all api requests, all data requests, response data and slices                                                              |
| `src/pages/**`                  | Core application                                                                                                                                     |
| `src/components/**`             | Directory use for independant components reusable                                                                                                    |
| `src/types/**`                  | Interface use to define Model structures                                                                                                             |
| `src/utils/**`                  | All the utility, helpers, constants and enums that can be used across the application                                                                |
| `.coverage/cypress-coverage/**` | Lcov and html report cypress for integration test                                                                                                    |
| `cypress/**`                    | Cypress configuration for adding plugings, instruments coverage and testing                                                                          |
| `cypress/integration/**`        | Integration test folder                                                                                                                              |
| `.coverage/jest-coverage/**`    | Lcov and html report jest for unit test                                                                                                              |
| `.coverage/combined/**`         | Coverage IT and UT                                                                                                                                   |
| `./jest/**`                     | Jest configuration needed for files                                                                                                                  |
| `src/components/**`             | Jest unit tests files in component                                                                                                                   |

## Contributor

[Quentin](https://github.com/quentinlao/)

### License

[MIT](https://opensource.org/licenses/MIT)
