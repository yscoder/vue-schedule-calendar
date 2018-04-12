const path = require('path')
const Webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const webpackConfig = {
    entry: {
        demo: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: 'vue-style-loader!css-loader',
                        less: 'vue-style-loader!css-loader!less-loader'
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    // module.exports.module.rules[0].options.loaders = {
    //     css: ExtractTextPlugin.extract({
    //         fallbackLoader: 'vue-style-loader',
    //         use: 'css-loader!postcss-loader'
    //     }),
    //     less: ExtractTextPlugin.extract({
    //         fallbackLoader: 'vue-style-loader',
    //         use: 'css-loader!postcss-loader!less-loader'
    //     })
    // }

    webpackConfig.devtool = ''
    // http://vue-loader.vuejs.org/en/workflow/production.html
    webpackConfig.plugins = (webpackConfig.plugins || []).concat([
        new Webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new Webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        // new ExtractTextPlugin({
        //     filename: '[name].css'
        // }),
        new Webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])

    module.exports = [
        webpackConfig,
        {
            ...webpackConfig,
            entry: {
                scheduleCalendar: './src/scheduleCalendar/index.js'
            },
            output: {
                path: path.resolve(__dirname, './dist'),
                publicPath: '/dist/',
                filename: '[name].js',
                libraryTarget: 'umd'
            },
            externals: {
                vue: {
                    root: 'Vue',
                    commonjs: 'vue',
                    commonjs2: 'vue',
                    amd: 'vue'
                }
            },
            devtool: false
        }
    ]
} else {
    module.exports = webpackConfig
}
