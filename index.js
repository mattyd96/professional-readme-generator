//---------------------- Packages needed for this application -------------------------------//

const inquirer = require('inquirer');
const fs = require('fs');

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
        name: 'License',
        choices: ['MIT', 'APACHE', 'CC0']
    },
    
];

//---------------------------------- write File -----------------------------------------//

const writeToFile = (fileName, data) => {
    const text = createReadme(data);

    fs.writeFile(fileName, text, (err) =>
    
        err ? console.error(err) : console.log('Commit logged!')
    );
};


//---------------------------------- Create README File ---------------------------------//

//Main Function
const createReadme = data => {
    const sections = [];
    const contents = ['Installation', 'Usage', 'How to Contribute', 'Tests'];
    const usedContents = [];

    //Add Title
    const title = createTitle(data.title);
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

    //Add Table of Contents
    const tableCont = createTableCont(usedContents);

    const final = title + desc + tableCont + sections.join('');
    return final;
};

// Create Title
const createTitle = title => {
    //TODO also create license badges here
    return `# ${title}\n\n`;
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
        writeToFile('./Created-readme/README.md', response);
    });
};

// Function call to initialize app
init();
