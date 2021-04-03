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
import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import OracleDatabaseModelToCodeConverter
	from '@/erdiagram/generator/database/code-converter/oracle/OracleDatabaseModelToCodeConverter';

const oracleDatabaseModelToCodeConverter = new OracleDatabaseModelToCodeConverter();

describe('Tables without references', () => {

	test('Table without columns nor references', () => {

		const result = oracleDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithoutColumnsNorReferences);

		expect(result).toBe(`

CREATE SEQUENCE "TEST_TABLE_ID_SEQ" START WITH 1;
CREATE TABLE "TEST_TABLE" (
    "ID" NUMBER NOT NULL DEFAULT "TEST_TABLE_ID_SEQ".nextval,
    CONSTRAINT "TEST_TABLE_PK" PRIMARY KEY ("ID")
);

        `.trim());

	});

	test('Table with columns of all types', () => {

		const result = oracleDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithColumnsOfAllTypes);

		expect(result).toBe(`

CREATE SEQUENCE "TEST_TABLE_ID_SEQ" START WITH 1;
CREATE TABLE "TEST_TABLE" (
    "ID" NUMBER NOT NULL DEFAULT "TEST_TABLE_ID_SEQ".nextval,
    "BOOLEAN_COLUMN" NUMBER(1, 0) NOT NULL,
    "SHORT_COLUMN" NUMBER NOT NULL,
    "INT_COLUMN" NUMBER NOT NULL,
    "LONG_COLUMN" NUMBER NOT NULL,
    "DECIMAL_COLUMN" NUMBER(10, 3) NOT NULL,
    "TEXT_COLUMN" VARCHAR2(50) NOT NULL,
    "DATE_COLUMN" DATE NOT NULL,
    "TIME_COLUMN" TIMESTAMP NOT NULL,
    "DATETIME_COLUMN" TIMESTAMP NOT NULL,
    "BLOB_COLUMN" BLOB NOT NULL,
    CONSTRAINT "TEST_TABLE_PK" PRIMARY KEY ("ID")
);

        `.trim());

	});

	test('Table with custom ID', () => {

		const result = oracleDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithCustomId);

		expect(result).toBe(`

CREATE SEQUENCE "TEST_TABLE_THE_CUSTOM_IDENTIFIER_OF_TEST_TABLE_SEQ" START WITH 1;
CREATE TABLE "TEST_TABLE" (
    "THE_CUSTOM_IDENTIFIER_OF_TEST_TABLE" NUMBER NOT NULL DEFAULT "TEST_TABLE_THE_CUSTOM_IDENTIFIER_OF_TEST_TABLE_SEQ".nextval,
    CONSTRAINT "TEST_TABLE_PK" PRIMARY KEY ("THE_CUSTOM_IDENTIFIER_OF_TEST_TABLE")
);

        `.trim());

	});

	test('Table with columns with modifiers', () => {

		const result = oracleDatabaseModelToCodeConverter.convertToCode(databaseModelWithTablesWithColumnsWithModifiers);

		expect(result).toBe(`

CREATE SEQUENCE "TEST_TABLE_ID_SEQ" START WITH 1;
CREATE SEQUENCE "TEST_TABLE_AUTOINCREMENTAL_COLUMN_SEQ" START WITH 1;
CREATE TABLE "TEST_TABLE" (
    "ID" NUMBER NOT NULL DEFAULT "TEST_TABLE_ID_SEQ".nextval,
    "NOT_NULL_COLUMN" NUMBER NOT NULL,
    "UNIQUE_COLUMN" NUMBER,
    "AUTOINCREMENTAL_COLUMN" NUMBER DEFAULT "TEST_TABLE_AUTOINCREMENTAL_COLUMN_SEQ".nextval,
    CONSTRAINT "TEST_TABLE_PK" PRIMARY KEY ("ID"),
    CONSTRAINT "TEST_TABLE_UNIQUE_COLUMN_UNIQUE" UNIQUE ("UNIQUE_COLUMN")
);

        `.trim());

	});

});

describe('Tables with references', () => {

	test('Table with reference to another table', () => {

		const result = oracleDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithReferenceToAnotherTable);

		expect(result).toBe(`

CREATE SEQUENCE "TEST_TABLE_1_ID_SEQ" START WITH 1;
CREATE TABLE "TEST_TABLE_1" (
    "ID" NUMBER NOT NULL DEFAULT "TEST_TABLE_1_ID_SEQ".nextval,
    "TABLE_2_ID" NUMBER NOT NULL,
    CONSTRAINT "TEST_TABLE_1_PK" PRIMARY KEY ("ID")
);

CREATE SEQUENCE "TEST_TABLE_2_ID_SEQ" START WITH 1;
CREATE TABLE "TEST_TABLE_2" (
    "ID" NUMBER NOT NULL DEFAULT "TEST_TABLE_2_ID_SEQ".nextval,
    CONSTRAINT "TEST_TABLE_2_PK" PRIMARY KEY ("ID")
);

ALTER TABLE "TEST_TABLE_1" ADD CONSTRAINT "TEST_TABLE_1_TABLE_2_ID_FK" FOREIGN KEY ("TABLE_2_ID") REFERENCES "TEST_TABLE_2" ("ID");

        `.trim());

	});

	test('Table with nullable reference to another table', () => {

		const result = oracleDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithUniqueReferenceToAnotherTable);

		expect(result).toBe(`

CREATE SEQUENCE "TEST_TABLE_1_ID_SEQ" START WITH 1;
CREATE TABLE "TEST_TABLE_1" (
    "ID" NUMBER NOT NULL DEFAULT "TEST_TABLE_1_ID_SEQ".nextval,
    "TABLE_2_ID" NUMBER NOT NULL,
    CONSTRAINT "TEST_TABLE_1_PK" PRIMARY KEY ("ID"),
    CONSTRAINT "TEST_TABLE_1_TABLE_2_ID_UNIQUE" UNIQUE ("TABLE_2_ID")
);

CREATE SEQUENCE "TEST_TABLE_2_ID_SEQ" START WITH 1;
CREATE TABLE "TEST_TABLE_2" (
    "ID" NUMBER NOT NULL DEFAULT "TEST_TABLE_2_ID_SEQ".nextval,
    CONSTRAINT "TEST_TABLE_2_PK" PRIMARY KEY ("ID")
);

ALTER TABLE "TEST_TABLE_1" ADD CONSTRAINT "TEST_TABLE_1_TABLE_2_ID_FK" FOREIGN KEY ("TABLE_2_ID") REFERENCES "TEST_TABLE_2" ("ID");

        `.trim());

	});

	test('Table with unique reference to another table', () => {

		const result = oracleDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithNullableReferenceToAnotherTable);

		expect(result).toBe(`

CREATE SEQUENCE "TEST_TABLE_1_ID_SEQ" START WITH 1;
CREATE TABLE "TEST_TABLE_1" (
    "ID" NUMBER NOT NULL DEFAULT "TEST_TABLE_1_ID_SEQ".nextval,
    "TABLE_2_ID" NUMBER,
    CONSTRAINT "TEST_TABLE_1_PK" PRIMARY KEY ("ID")
);

CREATE SEQUENCE "TEST_TABLE_2_ID_SEQ" START WITH 1;
CREATE TABLE "TEST_TABLE_2" (
    "ID" NUMBER NOT NULL DEFAULT "TEST_TABLE_2_ID_SEQ".nextval,
    CONSTRAINT "TEST_TABLE_2_PK" PRIMARY KEY ("ID")
);

ALTER TABLE "TEST_TABLE_1" ADD CONSTRAINT "TEST_TABLE_1_TABLE_2_ID_FK" FOREIGN KEY ("TABLE_2_ID") REFERENCES "TEST_TABLE_2" ("ID");

        `.trim());

	});

	test('Table with reference to another table with a custom ID', () => {

		const result = oracleDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithReferenceToAnotherTableWithCustomId);

		expect(result).toBe(`

CREATE SEQUENCE "TEST_TABLE_1_ID_SEQ" START WITH 1;
CREATE TABLE "TEST_TABLE_1" (
    "ID" NUMBER NOT NULL DEFAULT "TEST_TABLE_1_ID_SEQ".nextval,
    "TABLE_2_ID" NUMBER NOT NULL,
    CONSTRAINT "TEST_TABLE_1_PK" PRIMARY KEY ("ID")
);

CREATE SEQUENCE "TEST_TABLE_2_CUSTOM_ID_SEQ" START WITH 1;
CREATE TABLE "TEST_TABLE_2" (
    "CUSTOM_ID" NUMBER NOT NULL DEFAULT "TEST_TABLE_2_CUSTOM_ID_SEQ".nextval,
    CONSTRAINT "TEST_TABLE_2_PK" PRIMARY KEY ("CUSTOM_ID")
);

ALTER TABLE "TEST_TABLE_1" ADD CONSTRAINT "TEST_TABLE_1_TABLE_2_ID_FK" FOREIGN KEY ("TABLE_2_ID") REFERENCES "TEST_TABLE_2" ("CUSTOM_ID");

        `.trim());

	});

	test('Tables referencing each other', () => {

		const result = oracleDatabaseModelToCodeConverter.convertToCode(databaseModelWithTablesReferencingEachOther);

		expect(result).toBe(`

CREATE SEQUENCE "TEST_TABLE_1_ID_SEQ" START WITH 1;
CREATE TABLE "TEST_TABLE_1" (
    "ID" NUMBER NOT NULL DEFAULT "TEST_TABLE_1_ID_SEQ".nextval,
    "TABLE_2_ID" NUMBER NOT NULL,
    CONSTRAINT "TEST_TABLE_1_PK" PRIMARY KEY ("ID")
);

CREATE SEQUENCE "TEST_TABLE_2_ID_SEQ" START WITH 1;
CREATE TABLE "TEST_TABLE_2" (
    "ID" NUMBER NOT NULL DEFAULT "TEST_TABLE_2_ID_SEQ".nextval,
    "TABLE_1_ID" NUMBER NOT NULL,
    CONSTRAINT "TEST_TABLE_2_PK" PRIMARY KEY ("ID")
);

ALTER TABLE "TEST_TABLE_1" ADD CONSTRAINT "TEST_TABLE_1_TABLE_2_ID_FK" FOREIGN KEY ("TABLE_2_ID") REFERENCES "TEST_TABLE_2" ("ID");

ALTER TABLE "TEST_TABLE_2" ADD CONSTRAINT "TEST_TABLE_2_TABLE_1_ID_FK" FOREIGN KEY ("TABLE_1_ID") REFERENCES "TEST_TABLE_1" ("ID");

        `.trim());

	});

	test('Table referencing itself', () => {

		const result = oracleDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableReferencingItself);

		expect(result).toBe(`

CREATE SEQUENCE "TEST_TABLE_ID_SEQ" START WITH 1;
CREATE TABLE "TEST_TABLE" (
    "ID" NUMBER NOT NULL DEFAULT "TEST_TABLE_ID_SEQ".nextval,
    "SELF_REFERENCE_ID" NUMBER NOT NULL,
    CONSTRAINT "TEST_TABLE_PK" PRIMARY KEY ("ID")
);

ALTER TABLE "TEST_TABLE" ADD CONSTRAINT "TEST_TABLE_SELF_REFERENCE_ID_FK" FOREIGN KEY ("SELF_REFERENCE_ID") REFERENCES "TEST_TABLE" ("ID");

        `.trim());

	});

});

describe('Config', () => {

	test('Full model with custom case formats and type bindings', () => {

		const result = new OracleDatabaseModelToCodeConverter({
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

CREATE SEQUENCE "Modifiers_Table_the_id_of_modifiers_table_SEQ" START WITH 1;
CREATE SEQUENCE "Modifiers_Table_autoincremental_column_SEQ" START WITH 1;
CREATE TABLE "Modifiers_Table" (
    "the_id_of_modifiers_table" CUSTOM_IDENTIFIER_TYPE NOT NULL DEFAULT "Modifiers_Table_the_id_of_modifiers_table_SEQ".nextval,
    "not_null_column" CUSTOM_INT_TYPE NOT NULL,
    "unique_column" CUSTOM_INT_TYPE,
    "autoincremental_column" CUSTOM_INT_TYPE DEFAULT "Modifiers_Table_autoincremental_column_SEQ".nextval,
    CONSTRAINT "Modifiers_Table_PK" PRIMARY KEY ("the_id_of_modifiers_table"),
    CONSTRAINT "Modifiers_Table_unique_column_UNIQUE" UNIQUE ("unique_column")
);

CREATE SEQUENCE "Types_Table_the_id_of_types_table_SEQ" START WITH 1;
CREATE TABLE "Types_Table" (
    "the_id_of_types_table" CUSTOM_IDENTIFIER_TYPE NOT NULL DEFAULT "Types_Table_the_id_of_types_table_SEQ".nextval,
    "boolean_column" CUSTOM_BOOLEAN_TYPE NOT NULL,
    "short_column" CUSTOM_SHORT_TYPE NOT NULL,
    "int_column" CUSTOM_INT_TYPE NOT NULL,
    "long_column" CUSTOM_LONG_TYPE NOT NULL,
    "decimal_column" CUSTOM_DECIMAL_TYPE(10, 3) NOT NULL,
    "text_column" CUSTOM_TEXT_TYPE(50) NOT NULL,
    "date_column" CUSTOM_DATE_TYPE NOT NULL,
    "time_column" CUSTOM_TIME_TYPE NOT NULL,
    "datetime_column" CUSTOM_DATETIME_TYPE NOT NULL,
    "blob_column" CUSTOM_BLOB_TYPE NOT NULL,
    CONSTRAINT "Types_Table_PK" PRIMARY KEY ("the_id_of_types_table")
);

CREATE SEQUENCE "References_Table_the_id_of_references_table_SEQ" START WITH 1;
CREATE TABLE "References_Table" (
    "the_id_of_references_table" CUSTOM_IDENTIFIER_TYPE NOT NULL DEFAULT "References_Table_the_id_of_references_table_SEQ".nextval,
    "modifiers_id" CUSTOM_IDENTIFIER_TYPE NOT NULL,
    "types_id" CUSTOM_IDENTIFIER_TYPE,
    "references_id" CUSTOM_IDENTIFIER_TYPE NOT NULL,
    CONSTRAINT "References_Table_PK" PRIMARY KEY ("the_id_of_references_table"),
    CONSTRAINT "References_Table_references_id_UNIQUE" UNIQUE ("references_id")
);

ALTER TABLE "References_Table" ADD CONSTRAINT "References_Table_modifiers_id_FK" FOREIGN KEY ("modifiers_id") REFERENCES "Modifiers_Table" ("the_id_of_modifiers_table");
ALTER TABLE "References_Table" ADD CONSTRAINT "References_Table_types_id_FK" FOREIGN KEY ("types_id") REFERENCES "Types_Table" ("the_id_of_types_table");
ALTER TABLE "References_Table" ADD CONSTRAINT "References_Table_references_id_FK" FOREIGN KEY ("references_id") REFERENCES "References_Table" ("the_id_of_references_table");

        `.trim());

	});

});
