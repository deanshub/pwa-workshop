const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const NODE_ENV = JSON.stringify(process.env.NODE_ENV || 'development')
const manifest = {}

let publicPath
let devtool
let hotloaderEntries = []
let plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'client/index.html'),
    favicon: path.resolve(__dirname, 'client/assets/joe.png'),
  }),
  new webpack.DefinePlugin({
    'process.env': {NODE_ENV},
  }),
]

if (NODE_ENV === '"development"') {
  publicPath = 'http://localhost:3000/'
  plugins.push(new webpack.NamedModulesPlugin())
  plugins.push(new webpack.HotModuleReplacementPlugin())
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  )
  devtool = 'eval-source-map'
  hotloaderEntries = [`webpack-hot-middleware/client?path=${publicPath}__webpack_hmr&name=desktop`]
} else {
  // TODO set publicPath
  // publicPath='http://localhost:3000/'
  plugins.push(new webpack.optimize.AggressiveMergingPlugin())
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  )
}

const config = {
  target: 'web',
  mode: NODE_ENV === '"development"' ? 'development' : 'production',
  context: path.resolve(__dirname, './client'),
  entry: {
    bundle: [...hotloaderEntries, './index.js'],
  },
  output: {
    path: path.resolve(__dirname, './static'),
    publicPath,
    filename: '[name].js',
    chunkFilename: '[id].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'client'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, 'client'),
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader?cacheDirectory=true'],
      },
      {
        test: /\.svg(\?.*)?$/,
        include: path.resolve(__dirname, 'client', 'assets'),
        loader: 'url-loader',
        options: {
          limit: '1024h',
          context: 'images',
          outputPath: 'images',
          name: '[name].[ext]',
        },
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          mimetype: 'image/png',
          context: 'images',
          outputPath: 'images',
          name: '[name].[ext]',
        },
      },
      {
        test: /\.gif$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          mimetype: 'image/gif',
          context: 'images',
          outputPath: 'images',
          name: '[name].[ext]',
        },
        include: path.resolve(__dirname, 'client', 'assets'),
      },
      {
        test: /\.jpg$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          mimetype: 'image/jpg',
          context: 'images',
          outputPath: 'images',
          name: '[name].[ext]',
        },
        include: path.resolve(__dirname, 'client', 'assets'),
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          mimetype: 'application/font-woff',
        },
      },
      {
        test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        exclude: path.resolve(__dirname, 'client', 'assets'),
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins,
  devtool,
  devServer: {
    contentBase: './client',
    hot: true,
    // publicPath: '/',
    publicPath,
  },
}

module.exports = config
