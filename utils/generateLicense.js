const { request } = require("@octokit/request");

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

module.exports = getGithubFile;