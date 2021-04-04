import MysqlDatabaseModelToCodeConverter
	from '@/erdiagram/generator/database/code-converter/mysql/MysqlDatabaseModelToCodeConverter';
import {
	databaseModelWithTableReferencingItself,
	databaseModelWithTablesReferencingEachOther,
	databaseModelWithTablesWithColumnsWithModifiers,
	databaseModelWithTableWithColumnsOfAllTypes,
	databaseModelWithTableWithCustomId,
	databaseModelWithTableWithNullableReferenceToAnotherTable,
	databaseModelWithTableWithoutColumnsNorReferences,
	databaseModelWithTableWithReferenceToAnotherTable,
	databaseModelWithTableWithReferenceToAnotherTableWithCustomId,
	databaseModelWithTableWithUniqueReferenceToAnotherTable,
	fullDatabaseModel
} from '../common/test-database-models';
import StandardCaseFormats from '@/erdiagram/generator/common/case-format/StandardCaseFormats';
import {EntityPropertyType} from '../../../../../../main/erdiagram/parser/types/entity-relationship-model-types';

const mysqlDatabaseModelToCodeConverter = new MysqlDatabaseModelToCodeConverter();

describe('Tables without references', () => {

	test('Table without columns nor references', () => {

		const result = mysqlDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithoutColumnsNorReferences);

		expect(result).toBe(`

CREATE TABLE \`TestTable\` (
    \`id\` BIGINT NOT NULL AUTO_INCREMENT,
    CONSTRAINT \`TestTable_pk\` PRIMARY KEY (\`id\`)
);

		`.trim());

	});

	test('Table with columns of all types', () => {

		const result = mysqlDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithColumnsOfAllTypes);

		expect(result).toBe(`

CREATE TABLE \`TestTable\` (
    \`id\` BIGINT NOT NULL AUTO_INCREMENT,
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
    CONSTRAINT \`TestTable_pk\` PRIMARY KEY (\`id\`)
);

		`.trim());

	});

	test('Table with custom ID', () => {

		const result = mysqlDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithCustomId);

		expect(result).toBe(`

CREATE TABLE \`TestTable\` (
    \`theCustomIdentifierOfTestTable\` BIGINT NOT NULL AUTO_INCREMENT,
    CONSTRAINT \`TestTable_pk\` PRIMARY KEY (\`theCustomIdentifierOfTestTable\`)
);

		`.trim());

	});

	test('Table with columns with modifiers', () => {

		const result = mysqlDatabaseModelToCodeConverter.convertToCode(databaseModelWithTablesWithColumnsWithModifiers);

		expect(result).toBe(`

CREATE TABLE \`TestTable\` (
    \`id\` BIGINT NOT NULL AUTO_INCREMENT,
    \`notNullColumn\` INT NOT NULL,
    \`uniqueColumn\` INT,
    \`autoincrementalColumn\` INT AUTO_INCREMENT,
    CONSTRAINT \`TestTable_pk\` PRIMARY KEY (\`id\`),
    CONSTRAINT \`TestTable_uniqueColumn_unique\` UNIQUE (\`uniqueColumn\`)
);

		`.trim());

	});

});

describe('Tables with references', () => {

	test('Table with reference to another table', () => {

		const result = mysqlDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithReferenceToAnotherTable);

		expect(result).toBe(`

CREATE TABLE \`TestTable1\` (
    \`id\` BIGINT NOT NULL AUTO_INCREMENT,
    \`table2Id\` BIGINT NOT NULL,
    CONSTRAINT \`TestTable1_pk\` PRIMARY KEY (\`id\`)
);

CREATE TABLE \`TestTable2\` (
    \`id\` BIGINT NOT NULL AUTO_INCREMENT,
    CONSTRAINT \`TestTable2_pk\` PRIMARY KEY (\`id\`)
);

ALTER TABLE \`TestTable1\` ADD CONSTRAINT \`TestTable1_table2Id_fk\` FOREIGN KEY (\`table2Id\`) REFERENCES \`TestTable2\` (\`id\`);

		`.trim());

	});

	test('Table with nullable reference to another table', () => {

		const result = mysqlDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithUniqueReferenceToAnotherTable);

		expect(result).toBe(`

CREATE TABLE \`TestTable1\` (
    \`id\` BIGINT NOT NULL AUTO_INCREMENT,
    \`table2Id\` BIGINT NOT NULL,
    CONSTRAINT \`TestTable1_pk\` PRIMARY KEY (\`id\`),
    CONSTRAINT \`TestTable1_table2Id_unique\` UNIQUE (\`table2Id\`)
);

CREATE TABLE \`TestTable2\` (
    \`id\` BIGINT NOT NULL AUTO_INCREMENT,
    CONSTRAINT \`TestTable2_pk\` PRIMARY KEY (\`id\`)
);

ALTER TABLE \`TestTable1\` ADD CONSTRAINT \`TestTable1_table2Id_fk\` FOREIGN KEY (\`table2Id\`) REFERENCES \`TestTable2\` (\`id\`);

		`.trim());

	});

	test('Table with unique reference to another table', () => {

		const result = mysqlDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithNullableReferenceToAnotherTable);

		expect(result).toBe(`

CREATE TABLE \`TestTable1\` (
    \`id\` BIGINT NOT NULL AUTO_INCREMENT,
    \`table2Id\` BIGINT,
    CONSTRAINT \`TestTable1_pk\` PRIMARY KEY (\`id\`)
);

CREATE TABLE \`TestTable2\` (
    \`id\` BIGINT NOT NULL AUTO_INCREMENT,
    CONSTRAINT \`TestTable2_pk\` PRIMARY KEY (\`id\`)
);

ALTER TABLE \`TestTable1\` ADD CONSTRAINT \`TestTable1_table2Id_fk\` FOREIGN KEY (\`table2Id\`) REFERENCES \`TestTable2\` (\`id\`);

		`.trim());

	});

	test('Table with reference to another table with a custom ID', () => {

		const result = mysqlDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithReferenceToAnotherTableWithCustomId);

		expect(result).toBe(`

CREATE TABLE \`TestTable1\` (
    \`id\` BIGINT NOT NULL AUTO_INCREMENT,
    \`table2Id\` BIGINT NOT NULL,
    CONSTRAINT \`TestTable1_pk\` PRIMARY KEY (\`id\`)
);

CREATE TABLE \`TestTable2\` (
    \`customId\` BIGINT NOT NULL AUTO_INCREMENT,
    CONSTRAINT \`TestTable2_pk\` PRIMARY KEY (\`customId\`)
);

ALTER TABLE \`TestTable1\` ADD CONSTRAINT \`TestTable1_table2Id_fk\` FOREIGN KEY (\`table2Id\`) REFERENCES \`TestTable2\` (\`customId\`);

		`.trim());

	});

	test('Tables referencing each other', () => {

		const result = mysqlDatabaseModelToCodeConverter.convertToCode(databaseModelWithTablesReferencingEachOther);

		expect(result).toBe(`

CREATE TABLE \`TestTable1\` (
    \`id\` BIGINT NOT NULL AUTO_INCREMENT,
    \`table2Id\` BIGINT NOT NULL,
    CONSTRAINT \`TestTable1_pk\` PRIMARY KEY (\`id\`)
);

CREATE TABLE \`TestTable2\` (
    \`id\` BIGINT NOT NULL AUTO_INCREMENT,
    \`table1Id\` BIGINT NOT NULL,
    CONSTRAINT \`TestTable2_pk\` PRIMARY KEY (\`id\`)
);

ALTER TABLE \`TestTable1\` ADD CONSTRAINT \`TestTable1_table2Id_fk\` FOREIGN KEY (\`table2Id\`) REFERENCES \`TestTable2\` (\`id\`);

ALTER TABLE \`TestTable2\` ADD CONSTRAINT \`TestTable2_table1Id_fk\` FOREIGN KEY (\`table1Id\`) REFERENCES \`TestTable1\` (\`id\`);

		`.trim());

	});

	test('Table referencing itself', () => {

		const result = mysqlDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableReferencingItself);

		expect(result).toBe(`

CREATE TABLE \`TestTable\` (
    \`id\` BIGINT NOT NULL AUTO_INCREMENT,
    \`selfReferenceId\` BIGINT NOT NULL,
    CONSTRAINT \`TestTable_pk\` PRIMARY KEY (\`id\`)
);

ALTER TABLE \`TestTable\` ADD CONSTRAINT \`TestTable_selfReferenceId_fk\` FOREIGN KEY (\`selfReferenceId\`) REFERENCES \`TestTable\` (\`id\`);

		`.trim());

	});

});

describe('Config', () => {

	test('Full model with custom case formats and type bindings', () => {

		const result = new MysqlDatabaseModelToCodeConverter({
			tableNameCaseFormat: StandardCaseFormats.CAPITALIZED_UNDERSCORE,
			columnNameCaseFormat: StandardCaseFormats.LOWER_UNDERSCORE,
			typeBindings: {
				[EntityPropertyType.IDENTIFIER]: 'CUSTOM_IDENTIFIER_TYPE',
				[EntityPropertyType.TEXT]: 'CUSTOM_TEXT_TYPE',
				[EntityPropertyType.LONG]: 'CUSTOM_LONG_TYPE',
				[EntityPropertyType.INT]: 'CUSTOM_INT_TYPE',
				[EntityPropertyType.SHORT]: 'CUSTOM_SHORT_TYPE',
				[EntityPropertyType.DECIMAL]: 'CUSTOM_DECIMAL_TYPE',
				[EntityPropertyType.BOOLEAN]: 'CUSTOM_BOOLEAN_TYPE',
				[EntityPropertyType.DATE]: 'CUSTOM_DATE_TYPE',
				[EntityPropertyType.TIME]: 'CUSTOM_TIME_TYPE',
				[EntityPropertyType.DATETIME]: 'CUSTOM_DATETIME_TYPE',
				[EntityPropertyType.BLOB]: 'CUSTOM_BLOB_TYPE'
			}
		}).convertToCode(fullDatabaseModel);

		expect(result).toBe(`

CREATE TABLE \`Modifiers_Table\` (
    \`the_id_of_modifiers_table\` CUSTOM_IDENTIFIER_TYPE NOT NULL AUTO_INCREMENT,
    \`not_null_column\` CUSTOM_INT_TYPE NOT NULL,
    \`unique_column\` CUSTOM_INT_TYPE,
    \`autoincremental_column\` CUSTOM_INT_TYPE AUTO_INCREMENT,
    CONSTRAINT \`Modifiers_Table_pk\` PRIMARY KEY (\`the_id_of_modifiers_table\`),
    CONSTRAINT \`Modifiers_Table_unique_column_unique\` UNIQUE (\`unique_column\`)
);

CREATE TABLE \`Types_Table\` (
    \`the_id_of_types_table\` CUSTOM_IDENTIFIER_TYPE NOT NULL AUTO_INCREMENT,
    \`boolean_column\` CUSTOM_BOOLEAN_TYPE NOT NULL,
    \`short_column\` CUSTOM_SHORT_TYPE NOT NULL,
    \`int_column\` CUSTOM_INT_TYPE NOT NULL,
    \`long_column\` CUSTOM_LONG_TYPE NOT NULL,
    \`decimal_column\` CUSTOM_DECIMAL_TYPE(10, 3) NOT NULL,
    \`text_column\` CUSTOM_TEXT_TYPE(50) NOT NULL,
    \`date_column\` CUSTOM_DATE_TYPE NOT NULL,
    \`time_column\` CUSTOM_TIME_TYPE NOT NULL,
    \`datetime_column\` CUSTOM_DATETIME_TYPE NOT NULL,
    \`blob_column\` CUSTOM_BLOB_TYPE NOT NULL,
    CONSTRAINT \`Types_Table_pk\` PRIMARY KEY (\`the_id_of_types_table\`)
);

CREATE TABLE \`References_Table\` (
    \`the_id_of_references_table\` CUSTOM_IDENTIFIER_TYPE NOT NULL AUTO_INCREMENT,
    \`modifiers_id\` CUSTOM_IDENTIFIER_TYPE NOT NULL,
    \`types_id\` CUSTOM_IDENTIFIER_TYPE,
    \`references_id\` CUSTOM_IDENTIFIER_TYPE NOT NULL,
    CONSTRAINT \`References_Table_pk\` PRIMARY KEY (\`the_id_of_references_table\`),
    CONSTRAINT \`References_Table_references_id_unique\` UNIQUE (\`references_id\`)
);

ALTER TABLE \`References_Table\` ADD CONSTRAINT \`References_Table_modifiers_id_fk\` FOREIGN KEY (\`modifiers_id\`) REFERENCES \`Modifiers_Table\` (\`the_id_of_modifiers_table\`);
ALTER TABLE \`References_Table\` ADD CONSTRAINT \`References_Table_types_id_fk\` FOREIGN KEY (\`types_id\`) REFERENCES \`Types_Table\` (\`the_id_of_types_table\`);
ALTER TABLE \`References_Table\` ADD CONSTRAINT \`References_Table_references_id_fk\` FOREIGN KEY (\`references_id\`) REFERENCES \`References_Table\` (\`the_id_of_references_table\`);

		`.trim());

	});

});
