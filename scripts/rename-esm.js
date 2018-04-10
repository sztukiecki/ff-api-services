const search = require('recursive-search');
const path = require('path');
const fs = require('fs');

const results = search.recursiveSearchSync(/\.js$/, path.join(__dirname, '..', 'es'));

for (const file of results) {
    // rename file
    fs.renameSync(file, file.replace(/\.js$/, '.mjs'));

    // update source map
    const sourceMapFileName = file + '.map';
    fs.writeFileSync(sourceMapFileName, fs.readFileSync(sourceMapFileName).toString()
                                          .replace(/"file":"([^"]+)\.js"/, (_, name) => `"file":"${name}.mjs"`));
}
