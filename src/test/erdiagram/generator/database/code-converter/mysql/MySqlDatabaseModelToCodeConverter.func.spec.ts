import MysqlDatabaseModelToCodeConverter
	from '@/erdiagram/generator/database/code-converter/mysql/MysqlDatabaseModelToCodeConverter';
import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import {createSimpleTableColumn} from '../../model/database-model-test-utils';
import {DatabaseModel} from '../../../../../../main/erdiagram/generator/database/model/database-model-types';

const databaseModel: DatabaseModel = {
	tables: [
		{
			name: 'ModifiersTable',
			identifierColumnName: 'theIdOfModifiersTable',
			columns: [
				{
					name: 'notNullColumn',
					type: EntityPropertyType.INT,
					length: [],
					notNull: true,
					unique: false,
					autoincremental: false
				},
				{
					name: 'uniqueColumn',
					type: EntityPropertyType.INT,
					length: [],
					notNull: false,
					unique: true,
					autoincremental: false
				},
				{
					name: 'autoincrementalColumn',
					type: EntityPropertyType.INT,
					length: [],
					notNull: false,
					unique: false,
					autoincremental: true
				},
			],
			references: []
		},
		{
			name: 'TypesTable',
			identifierColumnName: 'theIdOfTypesTable',
			columns: [
				createSimpleTableColumn('identifierColumn', EntityPropertyType.IDENTIFIER),
				createSimpleTableColumn('booleanColumn', EntityPropertyType.BOOLEAN),
				createSimpleTableColumn('shortColumn', EntityPropertyType.SHORT),
				createSimpleTableColumn('intColumn', EntityPropertyType.INT),
				createSimpleTableColumn('longColumn', EntityPropertyType.LONG),
				createSimpleTableColumn('decimalColumn', EntityPropertyType.DECIMAL, [10, 3]),
				createSimpleTableColumn('textColumn', EntityPropertyType.TEXT, [50]),
				createSimpleTableColumn('dateColumn', EntityPropertyType.DATE),
				createSimpleTableColumn('timeColumn', EntityPropertyType.TIME),
				createSimpleTableColumn('datetimeColumn', EntityPropertyType.DATETIME),
				createSimpleTableColumn('blobColumn', EntityPropertyType.BLOB)
			],
			references: []
		},
		{
			name: 'ReferencesTable',
			identifierColumnName: 'theIdOfTypesTable',
			columns: [],
			references: [
				{
					columnName: '',
					targetTableName: '',
					targetTableIdentifierColumnName: '',
					notNull: false,
					unique: false
				},
				// createTableReference()
			]
		},
	]
};

const expectedResult = `

CREATE TABLE \`ModifiersTable\` (
    \`theIdOfModifiersTable\` BIGINT NOT NULL AUTO_INCREMENT,
    \`notNullColumn\` INT NOT NULL,
    \`uniqueColumn\` INT,
    \`autoincrementalColumn\` INT AUTO_INCREMENT,
    CONSTRAINT \`ModifiersTable_pk\` PRIMARY KEY (\`theIdOfModifiersTable\`),
    CONSTRAINT \`ModifiersTable_uniqueColumn_unique\` UNIQUE (\`uniqueColumn\`)
);

CREATE TABLE \`TypesTable\` (
    \`theIdOfTypesTable\` BIGINT NOT NULL AUTO_INCREMENT,
    \`identifierColumn\` BIGINT NOT NULL,
    \`booleanColumn\` BOOLEAN NOT NULL,
    \`shortColumn\` SHORT NOT NULL,
    \`intColumn\` INT NOT NULL,
    \`longColumn\` BIGINT NOT NULL,
    \`decimalColumn\` DECIMAL(10, 3) NOT NULL,
    \`textColumn\` VARCHAR(50) NOT NULL,
    \`dateColumn\` DATE NOT NULL,
    \`timeColumn\` TIME NOT NULL,
    \`datetimeColumn\` TIMESTAMP NOT NULL,
    \`blobColumn\` BLOB NOT NULL,
    CONSTRAINT \`TypesTable_pk\` PRIMARY KEY (\`theIdOfTypesTable\`)
);

`.trim();

const mysqlDatabaseModelToCodeConverter = new MysqlDatabaseModelToCodeConverter();

describe('TODO', () => {

	test('TODO', () => {

		const result = mysqlDatabaseModelToCodeConverter.convertToCode(databaseModel);

		expect(result).toBe(expectedResult);

	});

});
