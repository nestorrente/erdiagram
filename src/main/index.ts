import yargs from 'yargs';
import fs from 'fs';
import {parseEntityRelationshipModel} from '@/erdiagram/parser/er-model-parser';
import EntityRelationshipModelToCodeConverter from '@/erdiagram/generator/entity-relationship-to-code-converter';
import MySqlDatabaseModelToCodeConverter
	from '@/erdiagram/generator/database/code-converter/mysql/MySqlDatabaseModelToCodeConverter';
import JavaEntityRelationshipModelToCodeConverter
	from '@/erdiagram/generator/oop/code-converter/java/JavaEntityRelationshipModelToCodeConverter';
import EntityRelationshipModelToSqlCodeConverter
	from '@/erdiagram/generator/database/code-converter/EntityRelationshipModelToSqlCodeConverter';

const args = yargs
		.option('format', {
			alias: 'f',
			type: 'string',
			description: 'Output format (mysql/java)'
		})
		.option('output', {
			alias: 'o',
			type: 'string',
			description: 'Output file path (console if not specified)'
		})
		.help()
		.alias('help', 'h')
		.version()
		.alias('version', 'v')
		.argv;

const config = {
	inputFile: args._[0],
	format: (args.format ?? 'mysql').toLowerCase(),
	outputFile: args.output
};

const modelCodeGenerator = ((): EntityRelationshipModelToCodeConverter => {
	switch (config.format) {
		case 'mysql':
			return new EntityRelationshipModelToSqlCodeConverter(
					new MySqlDatabaseModelToCodeConverter({
						// idNamingStrategy: StandardIdNamingStrategies.ENTITY_NAME_PREFIX
					})
			);
		case 'java':
			return new JavaEntityRelationshipModelToCodeConverter();
		default:
			throw new Error(`Unknown format: ${config.format}`);
	}
})();

type OutputCallback = (text: string) => void;

const outputCallback = ((): OutputCallback => {

	const {outputFile} = config;

	if (outputFile) {
		return text => fs.writeFileSync(outputFile, text + '\n');
	} else {
		return text => console.log(text);
	}

})();

const inputCode = fs.readFileSync(config.inputFile).toString();

const model = parseEntityRelationshipModel(inputCode);
const outputCode = modelCodeGenerator.generateCode(model);

outputCallback(outputCode);
