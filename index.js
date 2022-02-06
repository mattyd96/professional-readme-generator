//---------------------- Packages needed for this application -------------------------------//
//local js in utils
const createReadme = require('./utils/generateReadme');
const getGithubFile = require('./utils/generateLicense');

//external packages
const inquirer = require('inquirer');
const async = require("async");

//node native packages
const fs = require('fs');


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


const writeReadmeDoc = (fileName, data) => {
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

//----------------------------------- Interface Sugar --------------------------------------------//

const printIntro = () => {
    
    console.log(
        `
        #########################################################\n
        Welcome to the README writer\n
        #########################################################\n
        How to use:\n
        * Respond to each question with the appropriate information\n
        * Some sections will pull up a text editor, put your desired information for that section, Close and click save\n
        * Make sure the entered text is properly formatted with markdown to be rendered correctly\n
        * You can learn more about markdown language here: https://www.markdownguide.org/basic-syntax/\n
        * Leaving a question blank will still create the section but leave it blank\n
        * writing '!DEL' will skip the section and it will not be created.\n
        * If you need to exit early just "ctrl c"\n
        * Thats it, Enjoy :)\n
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
        writeReadmeDoc(folder + '/README.md', response);

        //If user requested, write a license file
        if(response.licenseDoc === 'Yes') {
            writeLicenseDoc(folder + '/LICENSE.md', response);
        }
    });
};

// Function call to initialize app
init();
