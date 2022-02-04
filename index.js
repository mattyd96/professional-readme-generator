// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: 'What is your Project Title? ',
        name: 'title'
    },
    {
        type: 'input',
        message: 'What is the description of your project? ',
        name: 'description'
    },
    {
        type: 'input',
        message: 'What are the installation instructions of your project? ',
        name: 'install'
    },
    {
        type: 'input',
        message: 'How do you use your app? Please put in your Usage instructions here. ',
        name: 'usage'
    },
    {
        type: 'input',
        message: 'Contribution Instructions for other users? ',
        name: 'contribution'
    },
    {
        type: 'list',
        message: 'Test instructions? ',
        name: 'test',
        choices: ['MIT', 'APACHE', 'CC0']
    },
    {
        type: 'input',
        message: 'Test instructions? ',
        name: 'test'
    },
];

// TODO: Create a function to write README file
const writeToFile = (fileName, data) => {

}

const printIntro = () => {
    console.log(
        `
        #########################################################\n
        Welcome to the README writer\n
        #########################################################\n
        How to use:\n
        1. Respond to each question with the appropriate information\n
        2. Leaving a question blank will still create the section but leave it blank\n
        3. writing '!DEL' will skip the section and it will not be created.\n
        4. That's it! Hope you enjoy :)\n
        #########################################################\n
        `
    )
};

const start = () => {
    printIntro();
};
// TODO: Create a function to initialize app
const init = () => {
    start();
};

// Function call to initialize app
init();
