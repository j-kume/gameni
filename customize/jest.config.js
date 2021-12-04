module.exports = {
  transform: {
    '^.+\\.js$': './test/config/babel.config.js',
  },
  moduleFileExtensions: ['js', 'ts', 'vue'],
  verbose: true,
  preset: 'ts-jest' // TypeScriptの場合はこの行が必用
}