const fs = require('fs');
const path = require('path');
const process = require('process');
const nconf = require('nconf');

const FILE_NAME_CONFIG = '.2cmclirc';
const PATH_CWD = process.cwd();

const pathConfigFile = path.join(PATH_CWD, FILE_NAME_CONFIG);

nconf
  .argv()
  .env()
  .defaults({
    templatePath: path.join(__dirname, '__templates'),
    elementName: 'NAME',
  })
  .file(pathConfigFile);

module.exports = nconf.get;
