const simpleGit = require('simple-git')(__dirname + '/../src/');

function listChangedFiles() {
    return new Promise((resolve) => {
        simpleGit.diffSummary(function (error, data) {
            const { files: changedFiles } = data;
            const _changedFiles = [];

            changedFiles.forEach((changedFile) => {
                if (changedFile.file.startsWith('src/')) {
                    _changedFiles.push(changedFile.file);
                }
            });

            resolve(_changedFiles);
        });
    });
}

module.exports = listChangedFiles;

