const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/app/app.ts',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bundle.[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CopyWebpackPlugin([
            { from: '**/*.html', to: 'app/', context: 'src/app' }
        ])
    ],
    resolve: {
        modules: [
            'node_modules'
        ],
        extensions: ['.ts', '.js']
    },
    externals: {
        angular: 'angular',
        moment: 'moment',
        '@uirouter/angularjs': 'angular'
    },
    devServer: {
        port: 5555,
        stats: 'errors-only'
    }
}
