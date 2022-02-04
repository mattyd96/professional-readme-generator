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
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
