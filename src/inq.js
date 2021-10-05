var inquirer = require("inquirer");

module.exports = (questions, answers) => {
  return new Promise((res, rej) => {
    inquirer
      .prompt(questions, answers)
      .then((ans) => {
        res(ans);
      })
      .catch(rej);
  });
};
