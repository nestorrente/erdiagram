const path = require('path');
const {execSync} = require('child_process');
const {
    green,
    blue,
} = require('./utils/colorize');

const projectPath = path.resolve(__dirname, '..');

const dtsBundleGeneratorBinFile = path.resolve(projectPath, 'node_modules/.bin/dts-bundle-generator');

const outputFile = path.resolve(projectPath, 'dist/erdiagram.d.ts');
const relativeOutputFile = path.relative(projectPath, outputFile);

const entryFile = path.resolve(projectPath, 'src/main/module-entry.ts');
const relativeEntryFile = path.relative(projectPath, entryFile);

console.log(`Generating type declarations bundle from entry file ${blue(relativeEntryFile)}`);

execSync(`${dtsBundleGeneratorBinFile} -o "${outputFile}" "${entryFile}"`)

console.log(green(`Type declarations bundle successfully generated in ${blue(relativeOutputFile)}`));
console.log();
