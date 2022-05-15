module.exports = {
    presets: [
        '@babel/preset-env', // env preset allows to use the last version of javascript it takes care to make the transformation of the syntax
        [
            '@babel/preset-react', //preset-react configuration allows transpilation with the new react 17 version
            {
                runtime: 'automatic',
            },
        ],
        '@babel/preset-typescript', // preset-typescript allows the transpilation of TS into JS
    ],
    plugins: [
        ['@babel/plugin-proposal-class-properties', {}], // transfor class properties transformed already include @babel/preset-env, in ES2022
        ['istanbul', {}, 'plugin for Cypress instrumentation'], // istanbul plugin allows to do instrumentation
        ['@babel/plugin-transform-runtime'], // ES5 async, await, ...
    ],
};
