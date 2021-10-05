const fs = require('fs');
const path = require('path');
const processFileTemplate = require('./engineFile');

module.exports = function processDirectoryTemplate(source, target, name) {
  const pathSourceDir = path.join(source, 'NAME');
  const pathTargetDir = path.join(target, name);
  fs.mkdirsync(pathTargetDir);
  fs.readdirSync(source).map((fileName) => {
    const pathSourceFile = path.join(source, fileName);
    const pathTargetFile = path.join(target, fileName.replace('NAME', name));
    processFileTemplate(pathSourceFile, pathTargetFile, name);
  });
};
