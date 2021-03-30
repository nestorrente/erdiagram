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
import SqlServerDatabaseModelToCodeConverter
	from '@/erdiagram/generator/database/code-converter/sqlserver/SqlServerDatabaseModelToCodeConverter';

const sqlserverDatabaseModelToCodeConverter = new SqlServerDatabaseModelToCodeConverter();

describe('Tables without references', () => {

	test('Table without columns nor references', () => {

		const result = sqlserverDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithoutColumnsNorReferences);

		expect(result).toBe(`

CREATE TABLE "TestTable" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    CONSTRAINT "TestTable_pk" PRIMARY KEY ("Id")
);

        `.trim());

	});

	test('Table with columns of all types', () => {

		const result = sqlserverDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithColumnsOfAllTypes);

		expect(result).toBe(`

CREATE TABLE "TestTable" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    "BooleanColumn" BIT NOT NULL,
    "ShortColumn" SMALLINT NOT NULL,
    "IntColumn" INT NOT NULL,
    "LongColumn" BIGINT NOT NULL,
    "DecimalColumn" DECIMAL(10, 3) NOT NULL,
    "TextColumn" NVARCHAR(50) NOT NULL,
    "DateColumn" DATE NOT NULL,
    "TimeColumn" TIME NOT NULL,
    "DatetimeColumn" DATETIME2 NOT NULL,
    "BlobColumn" VARBINARY(MAX) NOT NULL,
    CONSTRAINT "TestTable_pk" PRIMARY KEY ("Id")
);

        `.trim());

	});

	test('Table with custom ID', () => {

		const result = sqlserverDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithCustomId);

		expect(result).toBe(`

CREATE TABLE "TestTable" (
    "TheCustomIdentifierOfTestTable" BIGINT NOT NULL IDENTITY(1, 1),
    CONSTRAINT "TestTable_pk" PRIMARY KEY ("TheCustomIdentifierOfTestTable")
);

        `.trim());

	});

	test('Table with columns with modifiers', () => {

		const result = sqlserverDatabaseModelToCodeConverter.convertToCode(databaseModelWithTablesWithColumnsWithModifiers);

		expect(result).toBe(`

CREATE SEQUENCE "TestTable_AutoincrementalColumn_seq" START WITH 1;
CREATE TABLE "TestTable" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    "NotNullColumn" INT NOT NULL,
    "UniqueColumn" INT,
    "AutoincrementalColumn" INT DEFAULT NEXT VALUE FOR "TestTable_AutoincrementalColumn_seq",
    CONSTRAINT "TestTable_pk" PRIMARY KEY ("Id"),
    CONSTRAINT "TestTable_UniqueColumn_unique" UNIQUE ("UniqueColumn")
);

        `.trim());

	});

});

describe('Tables with references', () => {

	test('Table with reference to another table', () => {

		const result = sqlserverDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithReferenceToAnotherTable);

		expect(result).toBe(`

CREATE TABLE "TestTable1" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    "Table2Id" BIGINT NOT NULL,
    CONSTRAINT "TestTable1_pk" PRIMARY KEY ("Id")
);

CREATE TABLE "TestTable2" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    CONSTRAINT "TestTable2_pk" PRIMARY KEY ("Id")
);

ALTER TABLE "TestTable1" ADD CONSTRAINT "TestTable1_Table2Id_fk" FOREIGN KEY ("Table2Id") REFERENCES "TestTable2" ("Id");

        `.trim());

	});

	test('Table with nullable reference to another table', () => {

		const result = sqlserverDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithUniqueReferenceToAnotherTable);

		expect(result).toBe(`

CREATE TABLE "TestTable1" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    "Table2Id" BIGINT NOT NULL,
    CONSTRAINT "TestTable1_pk" PRIMARY KEY ("Id"),
    CONSTRAINT "TestTable1_Table2Id_unique" UNIQUE ("Table2Id")
);

CREATE TABLE "TestTable2" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    CONSTRAINT "TestTable2_pk" PRIMARY KEY ("Id")
);

ALTER TABLE "TestTable1" ADD CONSTRAINT "TestTable1_Table2Id_fk" FOREIGN KEY ("Table2Id") REFERENCES "TestTable2" ("Id");

        `.trim());

	});

	test('Table with unique reference to another table', () => {

		const result = sqlserverDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithNullableReferenceToAnotherTable);

		expect(result).toBe(`

CREATE TABLE "TestTable1" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    "Table2Id" BIGINT,
    CONSTRAINT "TestTable1_pk" PRIMARY KEY ("Id")
);

CREATE TABLE "TestTable2" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    CONSTRAINT "TestTable2_pk" PRIMARY KEY ("Id")
);

ALTER TABLE "TestTable1" ADD CONSTRAINT "TestTable1_Table2Id_fk" FOREIGN KEY ("Table2Id") REFERENCES "TestTable2" ("Id");

        `.trim());

	});

	test('Table with reference to another table with a custom ID', () => {

		const result = sqlserverDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableWithReferenceToAnotherTableWithCustomId);

		expect(result).toBe(`

CREATE TABLE "TestTable1" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    "Table2Id" BIGINT NOT NULL,
    CONSTRAINT "TestTable1_pk" PRIMARY KEY ("Id")
);

CREATE TABLE "TestTable2" (
    "CustomId" BIGINT NOT NULL IDENTITY(1, 1),
    CONSTRAINT "TestTable2_pk" PRIMARY KEY ("CustomId")
);

ALTER TABLE "TestTable1" ADD CONSTRAINT "TestTable1_Table2Id_fk" FOREIGN KEY ("Table2Id") REFERENCES "TestTable2" ("CustomId");

        `.trim());

	});

	test('Tables referencing each other', () => {

		const result = sqlserverDatabaseModelToCodeConverter.convertToCode(databaseModelWithTablesReferencingEachOther);

		expect(result).toBe(`

CREATE TABLE "TestTable1" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    "Table2Id" BIGINT NOT NULL,
    CONSTRAINT "TestTable1_pk" PRIMARY KEY ("Id")
);

CREATE TABLE "TestTable2" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    "Table1Id" BIGINT NOT NULL,
    CONSTRAINT "TestTable2_pk" PRIMARY KEY ("Id")
);

ALTER TABLE "TestTable1" ADD CONSTRAINT "TestTable1_Table2Id_fk" FOREIGN KEY ("Table2Id") REFERENCES "TestTable2" ("Id");

ALTER TABLE "TestTable2" ADD CONSTRAINT "TestTable2_Table1Id_fk" FOREIGN KEY ("Table1Id") REFERENCES "TestTable1" ("Id");

        `.trim());

	});

	test('Table referencing itself', () => {

		const result = sqlserverDatabaseModelToCodeConverter.convertToCode(databaseModelWithTableReferencingItself);

		expect(result).toBe(`

CREATE TABLE "TestTable" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    "SelfReferenceId" BIGINT NOT NULL,
    CONSTRAINT "TestTable_pk" PRIMARY KEY ("Id")
);

ALTER TABLE "TestTable" ADD CONSTRAINT "TestTable_SelfReferenceId_fk" FOREIGN KEY ("SelfReferenceId") REFERENCES "TestTable" ("Id");

        `.trim());

	});

});

describe('Config', () => {

	test('Full model with custom case formats and type bindings', () => {

		const result = new SqlServerDatabaseModelToCodeConverter({
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
CREATE SEQUENCE "Modifiers_Table_autoincremental_column_seq" START WITH 1;
CREATE TABLE "Modifiers_Table" (
    "the_id_of_modifiers_table" CUSTOM_IDENTIFIER_TYPE NOT NULL IDENTITY(1, 1),
    "not_null_column" CUSTOM_INT_TYPE NOT NULL,
    "unique_column" CUSTOM_INT_TYPE,
    "autoincremental_column" CUSTOM_INT_TYPE DEFAULT NEXT VALUE FOR "Modifiers_Table_autoincremental_column_seq",
    CONSTRAINT "Modifiers_Table_pk" PRIMARY KEY ("the_id_of_modifiers_table"),
    CONSTRAINT "Modifiers_Table_unique_column_unique" UNIQUE ("unique_column")
);

CREATE TABLE "Types_Table" (
    "the_id_of_types_table" CUSTOM_IDENTIFIER_TYPE NOT NULL IDENTITY(1, 1),
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
    CONSTRAINT "Types_Table_pk" PRIMARY KEY ("the_id_of_types_table")
);

CREATE TABLE "References_Table" (
    "the_id_of_references_table" CUSTOM_IDENTIFIER_TYPE NOT NULL IDENTITY(1, 1),
    "modifiers_id" CUSTOM_IDENTIFIER_TYPE NOT NULL,
    "types_id" CUSTOM_IDENTIFIER_TYPE,
    "references_id" CUSTOM_IDENTIFIER_TYPE NOT NULL,
    CONSTRAINT "References_Table_pk" PRIMARY KEY ("the_id_of_references_table"),
    CONSTRAINT "References_Table_references_id_unique" UNIQUE ("references_id")
);

ALTER TABLE "References_Table" ADD CONSTRAINT "References_Table_modifiers_id_fk" FOREIGN KEY ("modifiers_id") REFERENCES "Modifiers_Table" ("the_id_of_modifiers_table");
ALTER TABLE "References_Table" ADD CONSTRAINT "References_Table_types_id_fk" FOREIGN KEY ("types_id") REFERENCES "Types_Table" ("the_id_of_types_table");
ALTER TABLE "References_Table" ADD CONSTRAINT "References_Table_references_id_fk" FOREIGN KEY ("references_id") REFERENCES "References_Table" ("the_id_of_references_table");

        `.trim());

	});

});
