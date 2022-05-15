module.exports = {
    root: true,
    env: {
        browser: true, // on start
        commonjs: true, // es5
        jest: true, // analyse jest
    },
    parser: '@typescript-eslint/parser', // parser
    plugins: ['react-hooks', '@typescript-eslint', 'react', 'jest'], // plugin to analyze
    extends: [
        'eslint:recommended', // basic linter
        'plugin:@typescript-eslint/recommended', // ts linter
        'plugin:react/recommended', // react rules
        'plugin:react-hooks/recommended', // hooks rules
        'plugin:jest/recommended', // jest rules
    ],
    rules: {
        'no-console': 'error', // lint adding rules
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
    },
    ignorePatterns: [
        '**/node_modules/**', // ignored files
        '**/public/**',
        '**/dist/**',
        '**/build/**',
    ],
};
