const babelJest = require('babel-jest')
const babelOptions = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
}
module.exports = babelJest.createTransformer(babelOptions)