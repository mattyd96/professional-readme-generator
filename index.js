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
        type: 'input',
        message: 'Test instructions? ',
        name: 'test'
    },
    {
        type: 'list',
        message: 'What License do you want to use? ',
        name: 'license',
        choices: ['MIT', 'APACHE', 'CC0']
    },
    
];

// TODO: Create a function to write README file
const writeToFile = (fileName, data) => {
    const text = createReadme(data);

    fs.writeFile(fileName, text, (err) =>
    
        err ? console.error(err) : console.log('Commit logged!')
    );
};

const createReadme = data => {
    const allParts = [];
    const contents = [];

    const title = createTitle(data.title);
    //allParts.push(title);

    const desc = createDesc(data.description);
    //allParts.push(desc);

    if(data.install.toLowerCase() != '!del') {
        const install = createInstall(data.install);
        allParts.push(install);
        contents.push('Installation');
    }

    const tableCont = createTableCont(contents);

    const final = title + desc + tableCont + allParts.join('');
    return final;
};

const createTitle = title => {
    return `# ${title}\n\n`;
};

const createDesc = desc => {
    return `## Description\n\n ${desc}\n\n`
};

const createTableCont = contents => {
    let returnStr = `## Table of Contents\n\n`;
    contents.forEach(element => {
        returnStr += `- [${element}](#${element.toLowerCase()})`;
    });

    return returnStr + `\n\n`;
};

const createInstall = install => {
    return `## Installation\n\n ${install}\n\n`;
};

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
    inquirer.prompt(questions).then(response => {
        writeToFile('./Created-readme/README.md', response);
    });
};
// TODO: Create a function to initialize app
const init = () => {
    start();
};

// Function call to initialize app
init();
