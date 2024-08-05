const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');
const getAliasesFromTsConfig = require('./aliases');

const aliasConfig = getAliasesFromTsConfig();

const extraNodeModules = {
  ...aliasConfig,
};

const watchFolders = [
  path.resolve(__dirname, 'src'),
  ...Object.values(aliasConfig),
];

const config = {
  resolver: {
    extraNodeModules,
  },
  watchFolders,
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
