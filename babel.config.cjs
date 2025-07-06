module.exports = function (api) {
  api.cache(false)
  const plugins = [
    ['import', { libraryName: '@ant-design/react-native' }],
  ]

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],

    plugins,
  }
}
