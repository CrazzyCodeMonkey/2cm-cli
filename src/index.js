const inquirer = require('./inq');
const { isDone, getQuestions } = require('./questions');
const copyTemplate = require('./copy');

//const pathTemplate = path.join(process.cwd(), "__templates");
//const pathLayout = path.join(process.cwd(), "test", "layouts");

let answers = {};
async function run() {
  let stillPrompting;
  do {
    try {
      answers = await inquirer(getQuestions(answers), answers);
    } catch (err) {
      if (err.isTtyError) {
        console.log('Oooops, something broke while rendering', err);
        // Prompt couldn't be rendered in the current environment
      } else {
        console.log('Oooops, something went belly up', err);
        // Something else went wrong
      }
      break;
    }
    stillPrompting = !isDone(answers);
  } while (stillPrompting);
  copyTemplate(answers);
}

run();
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~HERE I AM');

return;
