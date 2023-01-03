const path = require('path');
const glob = require('glob');
const MiniCssExtract = require("mini-css-extract-plugin");
const FixStyleOnlyEntries = require("webpack-fix-style-only-entries");
require('dotenv').config();

const basePath = path.resolve('src', 'apps');

const output_path = path.resolve(__dirname, process.env.DIST_DIR);

console.log('NODE_ENV : ' + process.env.ENV_MODE);

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
