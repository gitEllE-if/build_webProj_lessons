const { resolve } = require('path');
const HTMLwebpackPlugin = require('html-webpack-plugin');
const MiniCSSextractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: resolve(__dirname, 'src', 'main.js'),
    output: {
        path: resolve(__dirname, 'build'),
        filename: () => {
            return process.env.NODE_ENV === 'development' ? 'main.js' : 'main.[contenthash].js';
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCSSextractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.ogg|mp3|wav|mpe?g$/i,
                loader: 'file-loader',
                options: {
                    name() {
                        if (process.env.NODE_ENV === 'development') {
                            return '[path][name].[ext]';
                        }
                        return '[contenthash].[ext]';
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new HTMLwebpackPlugin({
            template: resolve(__dirname, 'index.html')
        }),
        new MiniCSSextractPlugin({
            filename: () => {
                return process.env.NODE_ENV === 'development' ? 'style.css' : 'style.[contenthash].css';
            }
        }),
        new CleanWebpackPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new BundleAnalyzerPlugin()
    ]
}