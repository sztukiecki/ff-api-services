const fs = require('fs');
const listChangedFiles = require('./listChangedFiles');
const prettier = require('prettier');
const glob = require('glob');

const mode = process.argv[2] || 'just-changed-files';
const justChangedFiles = mode === 'just-changed-files';
const allFiles = mode === 'all-files';

if(justChangedFiles && allFiles) {
    console.error('Just one mode is allowed.');
    return process.exit(-1);
}

console.info('Run prettier in mode: ' + mode);
async function runPrettier() {
    let files = [];
    if(justChangedFiles) {
        files = await listChangedFiles();
    }

    if(allFiles) {
        files = glob.sync('src/**/*.{ts,tsx}');
    }

    if (files.length === 0) {
        return process.exit(0);
    }

    const prettierConfigPath = __dirname + '/../prettier.config.js';
    files.forEach((filePath) => {
        if(filePath.endsWith('.txt')) {
            return;
        }

        try {
            console.info('[Prettier]: Formatting file ' + filePath);
            const options = prettier.resolveConfig.sync(filePath, {
                config: prettierConfigPath,
            });

            const input = fs.readFileSync(filePath, 'utf8');
            const output = prettier.format(input, {...options, filepath: filePath});
            if (output !== input) {
                fs.writeFileSync(filePath, output, 'utf8');
            }
        } catch(error) {
            console.warn('[Prettier]: Could not format file ' + filePath, 'Maybe the file got deleted or the file type is unsupported.');
        }
    });
}

runPrettier();
