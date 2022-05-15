const path = require('path');
const Dotenv = require('dotenv-webpack');

const HtmlWebPackPlugin = require('html-webpack-plugin');

require('dotenv').config();

// HtmlWebpackPlugin simplifies creation of HTML
const htmlPlugin = new HtmlWebPackPlugin({
    template: path.resolve('./src/index.html'),
    filename: './index.html',
});

const { PORT: port } = process.env; // configuration port

const devServer = {
    port,
    open: true,
    historyApiFallback: true,
};

module.exports = {
    mode: 'development', // developpement mode
    entry: './src/index.tsx', // entry app
    module: {
        rules: [
            // loaders
            {
                test: /\.(ts|tsx|js)$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: ['.ts', '.tsx', '.js', '.json'],
                },
                use: [
                    {
                        loader: 'babel-loader', // compiler babel-loader
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }], // css-loader and style-loader for the import of style files
            },
            {
                test: /\.(gif|svg|jpg|png)$/,
                loader: 'file-loader', // file-loader for assets files
            },
        ],
    },
    // resolve extensions
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },

    plugins: [htmlPlugin, new Dotenv()], // dotenv for process env in dev
    output: {
        //build bundle
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    devServer, // devServer change the webpack-dev-server
};
