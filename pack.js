/* eslint-disable */

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const unlink = util.promisify(require('fs').unlink);
const glob = util.promisify(require('glob'));

const clientPath = `../${process.argv[2]}`;
const rndNumber = (new Date).getTime();
const componenetFileName = `api-services-${rndNumber}.tgz`;


const doExec = async (infoMesasge, args) => {
    console.info(infoMesasge);
    const { stdout, stderr } = await exec(args);

    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);
};


glob('api-services-*.tgz', {}, async function (err, files) {
    if (err) {
        console.error(err);
        return;
    }

    files.forEach(async (path) => {
        await unlink(path);
        console.info(`file('${path}') deleted`);
    });

    await doExec('run prepare', 'yarn run prepare');
    await doExec(`pack api-services('${componenetFileName}')`, `yarn pack --filename ${componenetFileName}`);
    await doExec(`add to ${clientPath}`, `cd ${clientPath} && yarn add file:../ff-api-services/${componenetFileName}`);

    console.info('done');
});