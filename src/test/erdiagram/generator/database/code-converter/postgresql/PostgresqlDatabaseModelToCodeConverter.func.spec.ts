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
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import PostgresqlDatabaseModelToCodeConverter
	from '@/erdiagram/generator/database/code-converter/postgresql/PostgresqlDatabaseModelToCodeConverter';

const postgresqlDatabaseModelToCodeConverter = new PostgresqlDatabaseModelToCodeConverter();

describe('Tables without references', () => {

	test('Table without columns nor references', () => {

		const result = postgresqlDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithoutColumnsNorReferences);

		expect(result).toBe(`

CREATE TABLE "test_table" (
    "id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    CONSTRAINT "test_table_pk" PRIMARY KEY ("id")
);

        `.trim());

	});

	test('Table with columns of all types', () => {

		const result = postgresqlDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithColumnsOfAllTypes);

		expect(result).toBe(`

CREATE TABLE "test_table" (
    "id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    "boolean_column" BOOLEAN NOT NULL,
    "short_column" SMALLINT NOT NULL,
    "int_column" INTEGER NOT NULL,
    "long_column" BIGINT NOT NULL,
    "decimal_column" DECIMAL(10, 3) NOT NULL,
    "text_column" VARCHAR(50) NOT NULL,
    "date_column" DATE NOT NULL,
    "time_column" TIME NOT NULL,
    "datetime_column" TIMESTAMP NOT NULL,
    "blob_column" BYTEA NOT NULL,
    CONSTRAINT "test_table_pk" PRIMARY KEY ("id")
);

        `.trim());

	});

	test('Table with custom ID', () => {

		const result = postgresqlDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithCustomId);

		expect(result).toBe(`

CREATE TABLE "test_table" (
    "the_custom_identifier_of_test_table" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    CONSTRAINT "test_table_pk" PRIMARY KEY ("the_custom_identifier_of_test_table")
);

        `.trim());

	});

	test('Table with columns with modifiers', () => {

		const result = postgresqlDatabaseModelToCodeConverter.convertToCode(databaseModelWithTablesWithColumnsWithModifiers);

		expect(result).toBe(`

CREATE SEQUENCE "test_table_autoincremental_column_seq" START WITH 1;
CREATE TABLE "test_table" (
    "id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    "not_null_column" INTEGER NOT NULL,
    "unique_column" INTEGER,
    "autoincremental_column" INTEGER DEFAULT nextval('"test_table_autoincremental_column_seq"'),
    CONSTRAINT "test_table_pk" PRIMARY KEY ("id"),
    CONSTRAINT "test_table_unique_column_unique" UNIQUE ("unique_column")
);

        `.trim());

	});

});

describe('Tables with references', () => {

	test('Table with reference to another table', () => {

		const result = postgresqlDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithReferenceToAnotherTable);

		expect(result).toBe(`

CREATE TABLE "test_table_1" (
    "id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    "table_2_id" BIGINT NOT NULL,
    CONSTRAINT "test_table_1_pk" PRIMARY KEY ("id")
);

CREATE TABLE "test_table_2" (
    "id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    CONSTRAINT "test_table_2_pk" PRIMARY KEY ("id")
);

ALTER TABLE "test_table_1" ADD CONSTRAINT "test_table_1_table_2_id_fk" FOREIGN KEY ("table_2_id") REFERENCES "test_table_2" ("id");

        `.trim());

	});

	test('Table with nullable reference to another table', () => {

		const result = postgresqlDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithUniqueReferenceToAnotherTable);

		expect(result).toBe(`

CREATE TABLE "test_table_1" (
    "id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    "table_2_id" BIGINT NOT NULL,
    CONSTRAINT "test_table_1_pk" PRIMARY KEY ("id"),
    CONSTRAINT "test_table_1_table_2_id_unique" UNIQUE ("table_2_id")
);

CREATE TABLE "test_table_2" (
    "id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    CONSTRAINT "test_table_2_pk" PRIMARY KEY ("id")
);

ALTER TABLE "test_table_1" ADD CONSTRAINT "test_table_1_table_2_id_fk" FOREIGN KEY ("table_2_id") REFERENCES "test_table_2" ("id");

        `.trim());

	});

	test('Table with unique reference to another table', () => {

		const result = postgresqlDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithNullableReferenceToAnotherTable);

		expect(result).toBe(`

CREATE TABLE "test_table_1" (
    "id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    "table_2_id" BIGINT,
    CONSTRAINT "test_table_1_pk" PRIMARY KEY ("id")
);

CREATE TABLE "test_table_2" (
    "id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    CONSTRAINT "test_table_2_pk" PRIMARY KEY ("id")
);

ALTER TABLE "test_table_1" ADD CONSTRAINT "test_table_1_table_2_id_fk" FOREIGN KEY ("table_2_id") REFERENCES "test_table_2" ("id");

        `.trim());

	});

	test('Table with reference to another table with a custom ID', () => {

		const result = postgresqlDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithReferenceToAnotherTableWithCustomId);

		expect(result).toBe(`

CREATE TABLE "test_table_1" (
    "id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    "table_2_id" BIGINT NOT NULL,
    CONSTRAINT "test_table_1_pk" PRIMARY KEY ("id")
);

CREATE TABLE "test_table_2" (
    "custom_id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    CONSTRAINT "test_table_2_pk" PRIMARY KEY ("custom_id")
);

ALTER TABLE "test_table_1" ADD CONSTRAINT "test_table_1_table_2_id_fk" FOREIGN KEY ("table_2_id") REFERENCES "test_table_2" ("custom_id");

        `.trim());

	});

	test('Tables referencing each other', () => {

		const result = postgresqlDatabaseModelToCodeConverter.convertToCode(databaseModelWithTablesReferencingEachOther);

		expect(result).toBe(`

CREATE TABLE "test_table_1" (
    "id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    "table_2_id" BIGINT NOT NULL,
    CONSTRAINT "test_table_1_pk" PRIMARY KEY ("id")
);

CREATE TABLE "test_table_2" (
    "id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    "table_1_id" BIGINT NOT NULL,
    CONSTRAINT "test_table_2_pk" PRIMARY KEY ("id")
);

ALTER TABLE "test_table_1" ADD CONSTRAINT "test_table_1_table_2_id_fk" FOREIGN KEY ("table_2_id") REFERENCES "test_table_2" ("id");

ALTER TABLE "test_table_2" ADD CONSTRAINT "test_table_2_table_1_id_fk" FOREIGN KEY ("table_1_id") REFERENCES "test_table_1" ("id");

        `.trim());

	});

	test('Table referencing itself', () => {

		const result = postgresqlDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableReferencingItself);

		expect(result).toBe(`

CREATE TABLE "test_table" (
    "id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    "self_reference_id" BIGINT NOT NULL,
    CONSTRAINT "test_table_pk" PRIMARY KEY ("id")
);

ALTER TABLE "test_table" ADD CONSTRAINT "test_table_self_reference_id_fk" FOREIGN KEY ("self_reference_id") REFERENCES "test_table" ("id");

        `.trim());

	});

});

describe('Config', () => {

	test('Full model with custom case formats and type bindings', () => {

		const result = new PostgresqlDatabaseModelToCodeConverter({
			tableNameCaseFormat: StandardCaseFormats.UPPER_UNDERSCORE,
			columnNameCaseFormat: StandardCaseFormats.CAPITALIZED_UNDERSCORE,
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

CREATE SEQUENCE "MODIFIERS_TABLE_Autoincremental_Column_seq" START WITH 1;
CREATE TABLE "MODIFIERS_TABLE" (
    "The_Id_Of_Modifiers_Table" CUSTOM_IDENTIFIER_TYPE NOT NULL GENERATED ALWAYS AS IDENTITY,
    "Not_Null_Column" CUSTOM_INT_TYPE NOT NULL,
    "Unique_Column" CUSTOM_INT_TYPE,
    "Autoincremental_Column" CUSTOM_INT_TYPE DEFAULT nextval('"MODIFIERS_TABLE_Autoincremental_Column_seq"'),
    CONSTRAINT "MODIFIERS_TABLE_pk" PRIMARY KEY ("The_Id_Of_Modifiers_Table"),
    CONSTRAINT "MODIFIERS_TABLE_Unique_Column_unique" UNIQUE ("Unique_Column")
);

CREATE TABLE "TYPES_TABLE" (
    "The_Id_Of_Types_Table" CUSTOM_IDENTIFIER_TYPE NOT NULL GENERATED ALWAYS AS IDENTITY,
    "Boolean_Column" CUSTOM_BOOLEAN_TYPE NOT NULL,
    "Short_Column" CUSTOM_SHORT_TYPE NOT NULL,
    "Int_Column" CUSTOM_INT_TYPE NOT NULL,
    "Long_Column" CUSTOM_LONG_TYPE NOT NULL,
    "Decimal_Column" CUSTOM_DECIMAL_TYPE(10, 3) NOT NULL,
    "Text_Column" CUSTOM_TEXT_TYPE(50) NOT NULL,
    "Date_Column" CUSTOM_DATE_TYPE NOT NULL,
    "Time_Column" CUSTOM_TIME_TYPE NOT NULL,
    "Datetime_Column" CUSTOM_DATETIME_TYPE NOT NULL,
    "Blob_Column" CUSTOM_BLOB_TYPE NOT NULL,
    CONSTRAINT "TYPES_TABLE_pk" PRIMARY KEY ("The_Id_Of_Types_Table")
);

CREATE TABLE "REFERENCES_TABLE" (
    "The_Id_Of_References_Table" CUSTOM_IDENTIFIER_TYPE NOT NULL GENERATED ALWAYS AS IDENTITY,
    "Modifiers_Id" CUSTOM_IDENTIFIER_TYPE NOT NULL,
    "Types_Id" CUSTOM_IDENTIFIER_TYPE,
    "References_Id" CUSTOM_IDENTIFIER_TYPE NOT NULL,
    CONSTRAINT "REFERENCES_TABLE_pk" PRIMARY KEY ("The_Id_Of_References_Table"),
    CONSTRAINT "REFERENCES_TABLE_References_Id_unique" UNIQUE ("References_Id")
);

ALTER TABLE "REFERENCES_TABLE" ADD CONSTRAINT "REFERENCES_TABLE_Modifiers_Id_fk" FOREIGN KEY ("Modifiers_Id") REFERENCES "MODIFIERS_TABLE" ("The_Id_Of_Modifiers_Table");
ALTER TABLE "REFERENCES_TABLE" ADD CONSTRAINT "REFERENCES_TABLE_Types_Id_fk" FOREIGN KEY ("Types_Id") REFERENCES "TYPES_TABLE" ("The_Id_Of_Types_Table");
ALTER TABLE "REFERENCES_TABLE" ADD CONSTRAINT "REFERENCES_TABLE_References_Id_fk" FOREIGN KEY ("References_Id") REFERENCES "REFERENCES_TABLE" ("The_Id_Of_References_Table");

        `.trim());

	});

});
