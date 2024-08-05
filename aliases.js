const fs = require('fs');
const path = require('path');

function getAliasesFromTsConfig() {
  const tsConfigPath = path.resolve(__dirname, 'tsconfig.json');

  try {
    const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));
    const paths = tsConfig.compilerOptions.paths || {};

    const aliases = {};

    Object.keys(paths).forEach(key => {
      const aliasKey = key.replace('/*', '');
      aliases[aliasKey] = path.resolve(
        __dirname,
        paths[key][0].replace('/*', ''),
      );
    });

    return aliases;
  } catch (error) {
    console.error(`Error reading or parsing ${tsConfigPath}:`, error);
    return {};
  }
}

module.exports = getAliasesFromTsConfig;
