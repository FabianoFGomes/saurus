const getAliasesFromTsConfig = require('./aliases');

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          ...getAliasesFromTsConfig(),
          '@ant-design/react-native': '@ant-design/react-native/lib',
          '@ant-design/react-native/lib/radio/PropsType':
            '@ant-design/react-native/lib/radio/PropsType',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.ios.js', '.android.js'],
      },
    ],
  ],
};
