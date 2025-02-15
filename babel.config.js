module.exports = function (api) {
  api.cache(true);
  const plugins = [
    ['react-native-reanimated/plugin', {relativeSourceLocation: true}],
  ];

  return {
    presets: [['babel-preset-expo', {jsxImportSource: 'nativewind'}], 'nativewind/babel'],

    plugins,
  };
};
