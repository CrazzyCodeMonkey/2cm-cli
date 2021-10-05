const path = require('path');
const fs = require('fs');
const process = require('process');
const colorize = require('colorize');

const cConsole = colorize.console;

const pathTemplate = path.join(process.cwd(), '__templates');
const regexComponentName = /^[A-Z][a-zA-Z0-9]+$/;
const regexFileName = /^[A-Z][a-zA-Z0-9]+\.tsx?$/;

function getPathToElementFromAnswers(answers) {
  const { elementType, layoutName } = answers;
  const basePath = path.join(process.cwd(), 'test');
  switch (elementType) {
    case 'component':
      return path.join(basePath, 'components');
    case 'layout':
      return path.join(basePath, 'layouts');
    case 'layout element':
      console.log('Getting layouts path:::', answers);
      return path.join(basePath, 'layouts', layoutName);
    case 'slice':
      return path.join(basePath, 'redux');
    case 'utility':
      return path.join(basePath, 'utils');
    default:
      throw new Error(
        `Invalid Element Type (${elementType}), must be one of [component, layout, layout element, slice, utility]`
      );
  }
}

function getExistingElements(pathOrAnswers) {
  const path =
    typeof pathOrAnswers === 'string'
      ? pathOrAnswers
      : getPathToElementFromAnswers(pathOrAnswers);
  return fs
    .readdirSync(path)
    .filter((filename) => regexFileName.test(filename))
    .map((filename) => filename.slice(0, filename.lastIndexOf('.')));
}

function questionElementType(answers) {
  return {
    type: 'list',
    name: 'elementType',
    message: 'What type of element do you want to create?',
    choices: fs.readdirSync(pathTemplate),
  };
}

function layoutElementName(answers) {
  return {
    type: 'list',
    name: 'layoutName',
    message: 'Which layout is this elemnt for?',
    choices: fs.readdirSync(
      getPathToElementFromAnswers({ elementType: 'layout' })
    ),
  };
}

function questionName(answers) {
  const existingComponentPath = getPathToElementFromAnswers(answers);
  return {
    type: 'input',
    name: 'elementName',
    message: `What is the name of ${answers.elementType} (no extension)`,
    validate: (elementName, answers) => {
      if (!regexComponentName.test(elementName)) {
        cConsole.error(
          `\n  #red[Invalid]: #underline[${elementName}] is not a valid name for a #bold[${answers.elementType}]`,
          `\n    ${answers.elementType} names should begin with a capital leter, and only contain alpha-numeric`,
          `\n    Please choose a new name`
        );
        return false;
      }

      const existingComponents = getExistingElements(existingComponentPath);
      if (existingComponents.find((comp) => comp === elementName)) {
        cConsole.error(
          `\n  #red[Invalid]: A #bold[${answers.elementType}] with the name #underline[${answers.elementName}] alread exists.`,
          `    Please choose a new name.`
        );
        return false;
      }
      return true;
    },
  };
}

function isDone({ elementType, elementName }) {
  const done = !!elementType && !!elementName;
  console.log(
    `isDone(${done})`,
    { elementType, elementName },
    !!elementType,
    !!elementName
  );
  return done;
}

function getQuestions(answers) {
  console.log('~~>', answers);
  if (!answers.elementType) {
    return [questionElementType(answers)];
  }
  if (answers.elementType === 'layout element' && !answers.layoutName) {
    return [layoutElementName(answers)];
  }
  if (!answers.elementName) {
    return [questionName(answers)];
  }
}

module.exports = {
  isDone,
  getQuestions,
};
