//---------------------- Packages needed for this application -------------------------------//

const inquirer = require('inquirer');
const fs = require('fs');
const { request } = require("@octokit/request");
const async = require("async");

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
    //['MIT', 'LGPL 3.0', 'MPL 2.0', 'AGPL 3.0', 'GPL 3.0', 'Apache 2.0', 'Unlicense']

    switch(license) {
        case 'MIT': 
            return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
        case 'LGPL 3.0':
            return '[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)';
        case 'MPL 2.0':
            return '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)';
        case 'AGPL 3.0':
            return '[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)';
        case 'GPL 3.0':
            return '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
        case 'Apache 2.0':
            return '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
        case 'Unlicense':
            return '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)';
        default:
            return '';
    }
    
    // let licenseStr = `[![License: ${license}]`;
    // const licenseLink = license.replace(/\s/g, '_');
    // const licenseColor = getLicenseColor(license);
    // const linkImg = `https://img.shields.io/badge/License-${licenseLink}-${licenseColor}.svg`;
    // licenseStr += `(${linkImg})]()`;
    // return licenseStr;
};

// const getLicenseColor = license => {
//     const keys = Object.keys(licenseColors);
//     for(let color of keys) {
//         if(license.includes(`${color}`)) {
//             return licenseColors[color];
//         }
//     }

//     return '';
// };

//----------------------------------- Create LICENSE ---------------------------------------------//

const getGithubFile = license => {
    license = license.toLowerCase().replace(/\s/g, '-');

    return new Promise((resolve) => {
        resolve(
            request(`GET /licenses/${license}`, {
                license: 'license'
            })
          );
    });  
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
    //print intro
    printIntro();

    let folder = './Created_Docs';

    if(process.argv.length > 2) {
        folder = process.argv[2];
    }

    //ask questions
    inquirer.prompt(questions).then(response => {

        //create folder to hold written files if it does not already exist
        if (!fs.existsSync(folder)) {
            fs.mkdir(folder, (err) => {
                if (err) throw err;
            });
        }
        
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
