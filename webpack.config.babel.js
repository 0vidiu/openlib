import '@babel/register';
import webpack from 'webpack';
import path from 'path';
import packageJson from './package.json';

// Variable for checking if node environment is set to 'development'
const isDevelopment = process.env.NODE_ENV && process.env.NODE_ENV === 'development';

// Source directory path
const include = path.resolve(__dirname, './src');

// Distribution
const dist = path.resolve(__dirname, './dist');
const library = packageJson.name;

// Webpack configuration
const configuration = {
  mode: process.env.NODE_ENV || 'development',

  entry: './src/index.ts',

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        use: {
          loader: 'tslint-loader',
          options: {
            configFile: 'tslint.json',
          },
        },
        include,
      },

      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'webpack-strip-block',
            options: {
              start: 'test:start',
              end: 'test:end',
            },
          },
          {
            loader: 'awesome-typescript-loader',
            options: {
              silent: !isDevelopment,
            },
          },
        ],
        include,
      },
    ],
  },

  optimization: {
    minimize: false,
  },

  plugins: [
    new webpack.BannerPlugin({
      raw: true,
      entryOnly: true,
      include: /cli/,
      banner: '#!/usr/bin/env node \n',
    }),
  ],
};

if (isDevelopment) {
  configuration.devtool = 'inline-source-map';
}


/**
 * CommonJS configuration
*/

const mainConfiguration = Object.assign({}, configuration, {
  output: {
    path: dist,
    filename: `${packageJson.name}.js`,
    library,
    libraryTarget: 'commonjs2',
    libraryExport: 'default',
  },
});

const mainMinifiedConfiguration = Object.assign({}, mainConfiguration, {
  output: {
    path: dist,
    filename: `${packageJson.name}.min.js`,
    library,
    libraryTarget: 'commonjs2',
    libraryExport: 'default',
  },

  optimization: {
    minimize: true,
  },
});


/**
 * UMD configuration
*/

const umdConfiguration = Object.assign({}, configuration, {
  output: {
    path: dist,
    filename: `${packageJson.name}.umd.js`,
    library,
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this',
  },
});

const umdMinifiedConfiguration = Object.assign({}, configuration, {
  output: {
    path: dist,
    filename: `${packageJson.name}.umd.min.js`,
    library,
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this',
  },

  optimization: {
    minimize: true,
  },
});


/**
 * Export configuration objects
 */

let exports = [mainConfiguration, umdConfiguration];

if (!isDevelopment) {
  exports = [...exports, mainMinifiedConfiguration, umdMinifiedConfiguration];
}

export default exports;
