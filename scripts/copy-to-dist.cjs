const fs = require('node:fs/promises');
const path = require('node:path');

const inputPath = process.argv.at(-1);
const cwd = process.cwd();

const source = path.join(cwd, inputPath);
const destination = path.join(cwd, 'dist', 'ngx-testing-tools');

Promise.all([fs.access(source), fs.access(destination)])
  .then(() => fs.cp(source, path.join(destination, path.basename(source))))
  .then(() => console.info(`${source} copied to ${destination}.`))
