const path = require('path');
const glob = require('glob');
const MiniCssExtract = require("mini-css-extract-plugin");
const FixStyleOnlyEntries = require("webpack-fix-style-only-entries");
require('dotenv').config();

const basePath = path.resolve('src', 'apps');

console.log('NODE_ENV : ' + process.env.NODE_ENV);
let output_path = '';
if (process.env.NODE_ENV) {
  if (process.env.NODE_ENV === 'pro') {
    output_path = path.resolve(__dirname, 'dist');
  } else if (process.env.NODE_ENV === 'dev') {
    output_path = process.env.DEV_OUTPUT_PATH;
  } else {
    output_path = '#########';
  }
} else {
  output_path = process.env.DEV_OUTPUT_PATH;
}

// ====================
// basePath配下の各ディレクトリを複数のentryとする
// ====================
// js用
const entries = glob.sync('**/index.ts', { cwd: basePath }).reduce(
  (prev, file) => ({
    ...prev,
    [path.dirname(file)]: path.resolve(basePath, file),
  }),
  {}
);
// css用
glob.sync('**/*.scss', { cwd: basePath }).forEach(
  v => entries[[path.parse(v).dir + '.' + path.parse(v).name]] = path.resolve(basePath, v)
);

module.exports = {
  entry: entries,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true
        }
      },
      {
        test: /\.scss/,
        use: [
          MiniCssExtract.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      "jquery-ui": "jquery-ui-dist/jquery-ui.js",
      modules: path.join(__dirname, "node_modules")
    }
  },
  output: {
    path: output_path,
    filename: '[name].js',
  },
  plugins: [
    new FixStyleOnlyEntries(),
    new MiniCssExtract({
      filename: "[name].css"
    })
  ],
  performance: { hints: false }
};
