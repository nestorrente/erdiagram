import yargs from 'yargs';
import fs from 'fs';
import {parseEntityRelationshipModel} from './dsl/parser/er-model-parser';
import EntityRelationshipModelToCodeConverter from './dsl/generator/entity-relationship-to-code-converter';
import MySqlCodeGenerator from 'src/dsl/generator/database/sql/mysql/my-sql-code-generator';
import JavaCodeGenerator from './dsl/generator/oop/java/java-code-generator';
import {StandardIdNamingStrategies} from '@/dsl/generator/common/id-naming-strategy';
import StandardCaseFormats from '@/dsl/generator/common/case-format/StandardCaseFormats'; // [

// [
// 	'User follower *<->* User followed (a)',
// 	'User->Shift',
// ].map(parseRelationshipStatement).forEach(e => console.log(e));
//
// [
// 	'User',
// 	'Shift',
// ].map(parseEntityNameStatement).forEach(e => console.log(e));
//
// [
// 	'  username text(50)',
// 	'  name text(50)',
// 	'  birthday? date',
// 	'  registrationDate datetime()',
// 	'  active bool',
// ].map(parseEntityPropertyStatement).forEach(e => console.log(e));

// const model = parseEntityRelationshipModel(`
//
// User
// 	username text(50)
// 	name text(50)
// 	birthday? date
// 	registrationDate datetime
// 	active bool
//
// # comment
// Shift
// 	fromTime time
// 	# other comment :)
// 	toTime time
//
// Country
// 	code text(5)
// 	name text(100)
//
// User ->? Shift
// User people *-> Country
//
// User follower *<->* User follow (Follows)
//
// `);

// const model: EntityRelationshipModel = parseEntityRelationshipModel(`
//
// User
// 	username text(50)
// 	name text(50)
// 	birthday? date
// 	active bool
//
// Country
// 	code text(5)
// 	name text(100)
//
// User *-> Country
//
// User ->? Country alternativeCountry
//
// Permission
// 	code text(30)
// 	description text(200)
//
// User *<->* Permission
//
// `);

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
			return new MySqlCodeGenerator({
				idNamingStrategy: StandardIdNamingStrategies.ENTITY_NAME_PREFIX
			});
		case 'java':
			return new JavaCodeGenerator();
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

// const modelCodeGenerator: ModelCodeGenerator = new MySqlCodeGenerator();
// const modelCodeGenerator: ModelCodeGenerator = new JavaCodeGenerator();

const inputCode = fs.readFileSync(config.inputFile).toString();

const model = parseEntityRelationshipModel(inputCode);
const outputCode = modelCodeGenerator.generateCode(model);

outputCallback(outputCode);

console.log(StandardCaseFormats.LOWER_CAMEL.splitWords('thisIsItSQLException'))
console.log(StandardCaseFormats.UPPER_CAMEL.splitWords('ThisIsItSQLException'))
console.log(StandardCaseFormats.LOWER_UNDERSCORE.splitWords('this_is_it_sql_exception'))
console.log(StandardCaseFormats.UPPER_UNDERSCORE.splitWords('THIS_IS_IT_SQL_EXCEPTION'))
console.log(StandardCaseFormats.CAPITALIZED_UNDERSCORE.splitWords('This_Is_It_Sql_Exception'))

Object.values(StandardCaseFormats).forEach(caseFormat => console.log(caseFormat.joinWords(['thiS', 'is', 'It', 'sql', 'EXCEPTION'])))

// console.log(JSON.stringify(model, null, 4));
// console.log(modelCodeGenerator.generateCode(model));
// console.log(JSON.stringify(databaseModelGenerator.generateDatabaseModel(model), null, 4));
// console.log(JSON.stringify(classModelGenerator.generateClassModel(model), null, 4));
