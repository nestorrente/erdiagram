const fs = require('fs-extra');
const path = require('path');
const {execSync} = require('child_process');
const {
	green,
	yellow,
	blue,
	magenta,
	red,
} = require('./utils/colorize');

const baseFolder = path.resolve(__dirname, '../dist');

const ABSOLUTE_PATH_REGEX = /(["'])@\/(.*?)\1/g;

init();

function init() {

	// processFile(path.resolve(baseFolder, 'main.d.ts'));
	// processFile(path.resolve(baseFolder, 'nostimize/descriptors-types.d.ts'));
	// processFile(path.resolve(baseFolder, 'nostimize/util/array-utils.d.ts'));
	processFolderFiles(baseFolder);

	console.log(green('DONE'));
	console.log();

}

function processFolderFiles(folderPath) {

	fs.readdirSync(folderPath)
			.forEach(fileName => {

				const filePath = path.resolve(folderPath, fileName);

				if (fs.lstatSync(filePath).isDirectory()) {
					processFolderFiles(filePath);
				} else if (fileName.endsWith('.d.ts')) {
					processFile(filePath);
				} else {
					console.log(`Skipping file ${yellow(path.relative(baseFolder, filePath))}`);
				}

			});

}

function processFile(filePath) {
	console.log(`Processing file ${blue(path.relative(baseFolder, filePath))}`);
	fs.writeFileSync(filePath, replaceAbsolutePathsOfFile(filePath));
}

function replaceAbsolutePathsOfFile(filePath) {

	const folderPath = path.dirname(filePath);

	const fileContents = fs.readFileSync(filePath, 'utf8');

	return fileContents.replace(ABSOLUTE_PATH_REGEX, (match, importQuoteChar, originalImportPath) => {
		const absoluteImportPath = path.resolve(baseFolder, originalImportPath);
		const relativeImportPath = path.relative(folderPath, absoluteImportPath);
		return importQuoteChar + (relativeImportPath.startsWith('../') ? relativeImportPath : './' + relativeImportPath) + importQuoteChar;
	});

}
