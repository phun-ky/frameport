import path from 'path';
import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

export default {
  target: 'web',
  output: {
    path: __dirname,
    filename: 'rde-module.js',
    library: 'RdeModule',
    libraryTarget: 'commonjs2'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        parallel: false,
        cache: true,
        uglifyOptions: {
          output: {
            beautify: false
          },
          mangle: {
            keep_fnames: true
          },
          compress: {
            keep_fnames: true,
            warnings: true,
            reduce_vars: false
          }
        }
      })
    ]
  },
  node: {
    fs: 'empty'
  },
  mode: 'production',
  entry: {
    'rde-module': path.join(__dirname, 'src', 'bin', 'module.js')
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      src: path.join(__dirname, 'src'),
      lib: path.join(__dirname, 'src', 'lib'),
      bin: path.join(__dirname, 'src', 'bin')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/i,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: path.join(__dirname, 'src'),
        exclude: path.join(__dirname, '../node_modules')
      },
      {
        test: /\.(js)$/i,
        loader: 'babel-loader',
        exclude: path.join(__dirname, '../node_modules'),
        options: {
          babelrc: false,
          plugins: [
            '@babel/plugin-transform-async-to-generator',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-transform-modules-commonjs'
          ],
          presets: [['@babel/preset-env']]
        }
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true
    })
  ]
};
