const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { getMetroConfig } = require('@tarojs/rn-supporter');
const path = require('path');

const filePath = path.resolve(__dirname, '../taro-native-shell');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  watchFolders: [path.resolve(__dirname, '../../')],
  resolver: {
    unstable_enableSymlinks: true,
    unstable_enablePackageExports: true,
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
console.log(__dirname, 'getDefaultConfig(__dirname)');
module.exports = (async function () {
  return mergeConfig(
    getDefaultConfig(__dirname),
    await getMetroConfig(),
    config
  );
})();
