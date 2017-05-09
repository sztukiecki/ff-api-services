const PATH = require('path');

const webpack = require('webpack');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isProduction = process.argv.indexOf('-p') !== -1;
const isBuild = process.argv.indexOf('--env.build') !== -1;

const PORT = 3000;
const PUBLIC_PATH = 'dist';

const useDevTools = ((isProduction) ? 'source-map' : 'eval');
const nodeEnvString = ((isProduction) ? 'production' : 'development');

console.log(`running webpack in "${nodeEnvString }" mode`);


let plugins = [ 
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(nodeEnvString)
        }
    })
];

let entries = [];

if (!isBuild) {
    plugins.unshift(new webpack.NamedModulesPlugin());
    plugins.unshift(new webpack.NoEmitOnErrorsPlugin());
    plugins.unshift(new webpack.HotModuleReplacementPlugin());
    entries = [
        './src/index.js'
    ];
} else {
    entries = {
        main: './src/index.js'
    };
}

module.exports = {
    node: {
        fs: 'empty'
    },
    devtool: useDevTools,
    devServer: {
        inline: true,
        hot: true,
        contentBase: './src/res',
        port: PORT,
        historyApiFallback: true
    },
    watch: !isBuild,
    entry: entries,
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?.*)?$/,
                loader: 'url-loader?limit=9000'
            }
        ]
    },
    output: {
        path: PATH.resolve(__dirname, PUBLIC_PATH),
        filename: '[name].js',
        chunkFilename: '[name]-chunk.js',
		library: 'ff-api-services',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        modules: [
            PATH.resolve(__dirname, 'src'),
            PATH.resolve(__dirname, 'node_modules')
        ],
        extensions: ['.js', '.jsx', '.less', '.json']
    },
    plugins: plugins
};

