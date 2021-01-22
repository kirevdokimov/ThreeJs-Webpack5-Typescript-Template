const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')

const build = path.resolve(__dirname, '../dist')
const public = path.resolve(__dirname, '../public')

const entry = './src/index.js';

const commonConfig = {
    entry: entry,
    output: {
        // where to output bundle
        path: build,
        // how to name bundle
        filename: 'bundle.js',
    },
    // Determine how modules within the project are treated
    module: {
        rules: [
            // JavaScript: Use Babel to transpile JavaScript files (ts here)
            // { test: /\.js$/, use: ['babel-loader'] },

            // type property is like replacement for file-loader and raw-loader as i understand
            // https://webpack.js.org/guides/asset-modules/

            // Images: Copy image files to build folder
            { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

            // Fonts and SVGs: Inline files
            { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
        ],
    },
}

const developmentConfig = {
    // Set the mode to development or production
    mode: 'development',

    // Control how source maps are generated
    devtool: 'inline-source-map',

    // Spin up a server for quick development
    devServer: {
        historyApiFallback: true,
        // contentBase: build,
        contentBase: public,
        open: true,
        compress: true,
        hot: true,
        port: 3000,
    },

    module: {
        rules: [
            // Styles: Inject CSS into the head with source maps
            {
                test: /\.(css)$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1, modules: true } },
                ],
            },
        ]
    },

    plugins: [
        // Only update what has changed on hot reload
        new webpack.HotModuleReplacementPlugin(),
    ],
}

const productionConfig = {
    
}

module.exports = env => {
    switch (env.NODE_ENV) {
        case 'development':
            return merge(commonConfig, developmentConfig);
        case 'production':
            throw new Error('Production config is ready. At first make it');
            // visit later: https://github.com/taniarascia/webpack-boilerplate/blob/master/config/webpack.prod.js
            return merge(commonConfig, productionConfig);
        default:
            throw new Error(`No matching configuration was found! NODE_ENV=${env.NODE_ENV}`);
    }
}