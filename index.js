//---------------------- Packages needed for this application -------------------------------//
const createReadme = require('./utils/generateReadme');
const getGithubFile = require('./utils/generateLicense');
const inquirer = require('inquirer');
const fs = require('fs');
//const { request } = require("@octokit/request");
const async = require("async");

//---------------------- Array of questions for user input ----------------------------------//

const questions = [
    {
        type: 'input',
        message: 'What is your Project Title? ',
        name: 'title'
    },
    {
        type: 'editor',
        message: 'What is the description of your project? ',
        name: 'description'
    },
    {
        type: 'editor',
        message: 'What are the installation instructions of your project? ',
        name: 'Installation'
    },
    {
        type: 'editor',
        message: 'How do you use your app? Please put in your Usage instructions here. ',
        name: 'Usage'
    },
    {
        type: 'editor',
        message: 'Contribution Instructions for other users? ',
        name: 'How to Contribute'
    },
    {
        type: 'editor',
        message: 'Test instructions? ',
        name: 'Tests'
    },
    {
        type: 'input',
        message: 'What is your github username? ',
        name: 'github'
    },
    {
        type: 'input',
        message: 'What is your E-Mail? ',
        name: 'email'
    },
    {
        type: 'list',
        message: 'What License do you want to use? ',
        name: 'license',
        choices: ['MIT', 'LGPL 3.0', 'MPL 2.0', 'AGPL 3.0', 'GPL 3.0', 'Apache 2.0', 'Unlicense']
    }, 
    {
        type: 'list',
        message: 'Do you want a license document? ',
        name: 'licenseDoc',
        choices: ['Yes', 'No']
    },
    
];

//---------------------------------- write File -----------------------------------------//

const writeToFile = (fileName, data) => {
    const text = createReadme(data);

    fs.writeFile(fileName, text, (err) =>
        err ? console.error(err) : console.log('Commit logged!')
    );
};

const writeLicenseDoc = async (fileName, data) => {
    const text = await getGithubFile(data.license);

    //text.then(() => {
        fs.writeFile(fileName, text.data.body , (err) =>
            err ? console.error(err) : console.log('License created!')
        );
    //});
};



//----------------------------------- Create LICENSE ---------------------------------------------//




//----------------------------------- Interface Sugar --------------------------------------------//

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
    );
};

//----------------------------------- INIT ------------------------------------------------------//
//Init Function
const init = () => {
    //print intro
    printIntro();

    let folder = './Documents';

    if(process.argv.length > 2) {
        folder = './' + process.argv[2];
    }

    //create folder to hold written files if it does not already exist
    if (!fs.existsSync(folder)) {
        fs.mkdir(folder, (err) => {
            if (err) {
                console.log("Failes to create folder");
                return;
            };
        });
    }

    //ask questions
    inquirer.prompt(questions).then(response => {
        
        //write readme file
        writeToFile(folder + '/README.md', response);

        //If user requested, write a license file
        if(response.licenseDoc === 'Yes') {
            writeLicenseDoc(folder + '/LICENSE.md', response);
        }
    });
};

// Function call to initialize app
init();
