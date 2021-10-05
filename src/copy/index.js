const fs = require('fs');
const process = require('process');
const path = require('path');

const engineDirectory = require('./engineDirectory');
const engineFile = require('./engineFile');

const pathTemplateRoot = path.join(process.cwd(), '__templates');
const pathTargetRoot = path.join(process.cwd(), 'test');

const elementToPath = {
  component: 'components',
  layout: 'layouts',
  'layout element': 'layouts',
  slice: 'redux',
  util: 'utils',
};

module.exports = function copyTemplate({
  elementType,
  layoutName,
  elementName,
}) {
  const pathTemplate = path.join(pathTemplateRoot, elementType);
  const pathTarget = path.join(
    pathTargetRoot,
    elementToPath[elementType],
    layoutName ?? ''
  );

  fs.readdirSync(pathTemplate).map((entry) => {
    const pathEntry = path.join(pathTemplate, entry);
    const pathEntryTarget = path.join(
      pathTarget,
      entry.replace('NAME', elementName)
    );
    const stat = fs.statSync(pathEntry);
    if (stat.isFile()) {
      engineFile(pathEntry, pathEntryTarget, elementName);
    } else if (stat.isDirectory()) {
      engineDirectory(pathEntry, pathEntryTarget, elementName);
    }
  });
};
