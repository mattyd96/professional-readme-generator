//---------------------- Packages needed for this application -------------------------------//

const inquirer = require('inquirer');
const fs = require('fs');

const licenseColors = {
    MIT : 'yellow',
    Unlicense : 'blue'
}

//---------------------- Array of questions for user input ----------------------------------//

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
        name: 'Installation'
    },
    {
        type: 'input',
        message: 'How do you use your app? Please put in your Usage instructions here. ',
        name: 'Usage'
    },
    {
        type: 'input',
        message: 'Contribution Instructions for other users? ',
        name: 'How to Contribute'
    },
    {
        type: 'input',
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
        choices: ['MIT', 'Unlicense']
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

const writeLicenseDoc = (filename) => {
    const text = getGithubFile();

    fs.writeFile(fileName, text , (err) =>
        err ? console.error(err) : console.log('License created!')
    );
};


//---------------------------------- Create README File ---------------------------------//

//Main Function
const createReadme = data => {
    const sections = [];
    const contents = ['Installation', 'Usage', 'How to Contribute', 'Tests'];
    const usedContents = [];

    //Add Title and license
    const title = createTitle(data.title, data.license);

    //Add Description
    const desc = createSection('Description', data.description);

    //Add Sections
    contents.forEach(element => {
        if(data[element].toLowerCase() != '!del') {
            sections.push(createSection(element, data[element]));
            usedContents.push(element);
        }
    });

    //create Questions
    sections.push(createQuestions(data.github, data.email));
    usedContents.push('Questions');

    //create license Section
    sections.push(createSection('License', data.license))
    usedContents.push('License');

    //Add Table of Contents
    const tableCont = createTableCont(usedContents);

    const final = title + desc + tableCont + sections.join('');
    return final;
};

// Create Title
const createTitle = (title, license) => {
    //TODO also create license badges here
    return `# ${title}\n${createLicenseBadge(license)}\n\n`;
};

// Create Table of Contents
const createTableCont = contents => {
    let returnStr = `## Table of Contents\n\n`;
    contents.forEach(element => {
        if(element !== ``) {
            returnStr += `- [${element}](#${element.toLowerCase().replace(/\s/g, '-')})\n\n`;
        }   
    });

    return returnStr + `\n\n`;
};

//Create a General Section -> Title + content
const createSection = (title, data) => {
    return data.toLowerCase() != '!del' ? 
            `## ${title}\n\n${data}\n\n` : ``;
}

//Create Questions Section -> creates a github and email link
const createQuestions = (github, email) => {
    const desc = `## Questions\n\nYou can reach me either through GitHub or the email below.\n\n`;
    const githubLink = `[GitHub: ${github}](https://github.com/${github})\n\n`;
    const emailLink = `[${email}](mailto:${email})\n\n`;

    return desc + githubLink + emailLink;
};

//Create license Badge
const createLicenseBadge = license => {
    let licenseStr = `[![License: ${license}]`;
    const licenseLink = license.replace(/\s/g, '_');
    const licenseColor = getLicenseColor(license);
    const linkImg = `https://img.shields.io/badge/License-${licenseLink}-${licenseColor}.svg`;
    licenseStr += `(${linkImg})]()`;
    return licenseStr;
};

const getLicenseColor = license => {
    const keys = Object.keys(licenseColors);
    for(let color of keys) {
        if(license.includes(`${color}`)) {
            return licenseColors[color];
        }
    }

    return '';
};

//----------------------------------- Create LICENSE ---------------------------------------------//

const getGithubFile = license => {
    
};
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
    )
};

//----------------------------------- INIT ------------------------------------------------------//
//Init Function
const init = () => {
    printIntro();
    inquirer.prompt(questions).then(response => {
        writeToFile('./Created-docs/README.md', response);

        if(response.licenseDoc === 'Yes') {
            writeLicenseDoc('./Created-docs/LICENSE.md', response.license);
        }
    });
};

// Function call to initialize app
init();
