const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const TYPE_PATH = `graphql/types`;

const imports = _.flatten([
  ...['entities', 'mutations']
    .map(baseName => [
      baseName,
      path.join(__dirname, `${TYPE_PATH}/${baseName}`),
    ])
    .map(([baseName, dirPath]) =>
      fs.readdirSync(dirPath).map(file => {
        const [typeName] = file.split('.');
        return `export { ${typeName} } from './${baseName}/${typeName}';`;
      }),
    ),
  `export { Query } from './Query';`,
  `export { Mutation } from './Mutation';`,
  `export * from './misc';`,
]);

fs.writeFileSync(
  path.join(__dirname, `${TYPE_PATH}/index.ts`),
  imports.join('\n'),
);

console.log('SUCCESS: TYPE IMPORT FILE GENERATED.');
