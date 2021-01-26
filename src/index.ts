import {EntityRelationshipModel, parseEntityRelationshipModel} from './dsl/parser/er-model-parser';
import {ModelCodeGenerator} from './dsl/generator/types';
import MySqlCodeGenerator from './dsl/generator/database/sql/my-sql-code-generator';

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

const model: EntityRelationshipModel = parseEntityRelationshipModel(`

User
	username text(50)
	name text(50)
	birthday? date
	active bool

Country
	code text(5)
	name text(100)

User *-> Country

User ->? Country alternativeCountry

Permission
	- permissionTableMeta: el valor de la meta
	code text(30)
		- codeColumnMeta1: 1
		- codeColumnMeta2: false
	description text(200)

User *<->* Permission

`);

const modelCodeGenerator: ModelCodeGenerator = new MySqlCodeGenerator();
// const modelCodeGenerator: ModelCodeGenerator = new JavaCodeGenerator();

// console.log(JSON.stringify(model, null, 4));
console.log(modelCodeGenerator.generateCode(model));
// console.log(JSON.stringify(databaseModelGenerator.generateDatabaseModel(model), null, 4));
// console.log(JSON.stringify(classModelGenerator.generateClassModel(model), null, 4));
