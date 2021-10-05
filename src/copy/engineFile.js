const fs = require('fs');

module.exports = function processFileTemplate(source, target, name) {
  const contentSource = fs.readFileSync(source, 'utf8');
  const contentTarget = contentSource.replace(/NAME/g, name);
  fs.writeFileSync(target, contentTarget, 'utf8');
};
