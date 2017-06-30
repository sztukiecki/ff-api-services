let exec = require('child_process').execSync;
let processArgs = process.argv;

function execute(command, callback){
    'use strict';
    let buff = exec(command);
    if(buff){
        console.log('==> ', buff.toString());
    }
}

function buildPackage() {
    'use strict';
    console.log('> buildPackage');
    execute('npm run build-package');
}

function updateVersion(){
    'use strict';
    console.log('> updateVersion');
    execute('npm --no-git-tag-version version patch');
    execute('git add .');
    execute('git commit --amend --no-edit');
}
function createCommit(){
    'use strict';
    console.log('> createCommit');
    if(processArgs.length <= 2){
        throw new Error('keine commit message angebenen');
    }
    execute('git add .');
    execute('git commit -m "' + processArgs[2] + '"');
}
function addTag(){
    'use strict';
    let version = require('./package.json').version;
    console.log('> addTag', 'v' + version);
    execute('git tag "v' + version + '"');
}

buildPackage();
createCommit();
updateVersion();
addTag();

console.log('done...');
