# Professional README Generator [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This is a professional readme generator created as part of a coding bootcamp. It takes in user input in a node terminal to generate a readme and optional License file using the Github octokit.
It has been developed to the following user story and acceptance criteria.

## User Story

```md
AS A developer
I WANT a README generator
SO THAT I can quickly create a professional README for a new project
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I am prompted for information about my application repository
THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
WHEN I enter my project title
THEN this is displayed as the title of the README
WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
WHEN I choose a license for my application from a list of options
THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
WHEN I enter my GitHub username
THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
WHEN I enter my email address
THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
WHEN I click on the links in the Table of Contents
THEN I am taken to the corresponding section of the README
```

## Usage

A prerequisite to using this code is having Node.js.

1. Clone The repository or download a local copy
2. Open a Terminal in the folder index.js is located
3. Type in  `npm install`. This will set up all the packages you need.
4. Type in `node index.js`
5. Follow the prompts in the command line
<br/>
<br/>

### **Specifying a destination folder**

It is recommended that you just use the default parameters for this application and then copy the created readme and license to your desired folder.
However if you want to specify another spot for these files to be written you can do so by passing an argument when launching the code.
<br/>
For example `node index.js myDocs` will create a folder located in the same folder as index.js called "myDocs". 
<br/>
You can also specify any other location by putting in the correct navigation path from index.js. 
If you want to write them to your parent folder you would write `node index ../myDocs`.

<br/>

### **Entering Sections**

For some parts of the readme creation, your default text editor will be opened to allow you to enter data. For this to be properly formatted 
you need to write the text using markdown. A good starting guide for that is [here](https://www.markdownguide.org/basic-syntax/).

When you are ready to save your entry simply close the text editor and click save when prompted. If you want to leave the section blank just type
anything (the document needs to have some content in it) and click don't save upon exit.

If you want to not include the section in your document type `!DEL` in the file, exit and save.

<br/>

### **License.md**

If you select yes to the option, a LICENSE.md file will also be created in the same folder for the license you chose.

<br/>  

### **Example Video**
<br/>

To be added.
<br/>

## License

MIT

## Links

[My Github Account](https://github.com/mattyd96)

