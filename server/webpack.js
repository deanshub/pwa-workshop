import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'
import webpackConfig from '../client/webpack.config'

const compiler = webpack(webpackConfig)

export const devMiddleware = ()=> webpackDevMiddleware(compiler,{
  stats: {
    colors: true,
  },
  publicPath: 'http://localhost:3000',
  watchOptions:{
    aggregateTimeout: 300,
  },
})
export const hotMiddleware = ()=> webpackHotMiddleware(compiler, {
  path: '/__webpack_hmr',
})
