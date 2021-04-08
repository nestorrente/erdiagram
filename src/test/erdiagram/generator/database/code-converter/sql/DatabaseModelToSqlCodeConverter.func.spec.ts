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
} from '#/erdiagram/generator/database/code-converter/common/test-database-models';
import DatabaseModelToSqlCodeConverter
	from '@/erdiagram/generator/database/code-converter/sql/DatabaseModelToSqlCodeConverter';
import MysqlDialect from '@/erdiagram/generator/database/code-converter/sql/dialect/mysql/MysqlDialect';
import OracleDialect from '@/erdiagram/generator/database/code-converter/sql/dialect/oracle/OracleDialect';
import PostgresqlDialect from '@/erdiagram/generator/database/code-converter/sql/dialect/postgresql/PostgresqlDialect';
import SqlServerDialect from '@/erdiagram/generator/database/code-converter/sql/dialect/sqlserver/SqlServerDialect';
import {DatabaseModel} from '@/erdiagram/generator/database/model/database-model-types';
import SqlDialectConfig from '@/erdiagram/generator/database/code-converter/sql/dialect/common/config/SqlDialectConfig';
import SqlDialect from '@/erdiagram/generator/database/code-converter/sql/dialect/common/SqlDialect';
import StandardCaseFormats from '@/erdiagram/generator/common/case-format/StandardCaseFormats';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import SqliteDialect
	from '../../../../../../main/erdiagram/generator/database/code-converter/sql/dialect/sqlite/SqliteDialect';

type SqlDialectId = 'mysql' | 'oracle' | 'postgresql' | 'sqlite' | 'sqlserver';
type SqlDialectFactory = (config?: Partial<SqlDialectConfig>) => SqlDialect;
type SqlDialectTuple = [SqlDialectId, SqlDialectFactory];

const SQL_DIALECTS: SqlDialectTuple[] = [
	['mysql', config => new MysqlDialect(config)],
	['oracle', config => new OracleDialect(config)],
	['postgresql', config => new PostgresqlDialect(config)],
	['sqlserver', config => new SqlServerDialect(config)],
	['sqlite', config => new SqliteDialect(config)]
];

describe('Tables without references', () => {

	executeTestCaseForAllDialects(
			'Table without columns nor references',
			'table_without_columns_nor_references.sql',
			databaseModelWithTableWithoutColumnsNorReferences
	);

	executeTestCaseForAllDialects(
			'Table with columns of all types',
			'table_with_columns_of_all_types.sql',
			databaseModelWithTableWithColumnsOfAllTypes
	);

	executeTestCaseForAllDialects(
			'Table with custom ID',
			'table_with_custom_id.sql',
			databaseModelWithTableWithCustomId
	);

	executeTestCaseForAllDialects(
			'Table with columns with modifiers',
			'table_with_columns_with_modifiers.sql',
			databaseModelWithTablesWithColumnsWithModifiers
	);

});

describe('Tables with references', () => {

	executeTestCaseForAllDialects(
			'Table with reference to another table',
			'table_with_reference_to_another_table.sql',
			databaseModelWithTableWithReferenceToAnotherTable
	);

	executeTestCaseForAllDialects(
			'Table with nullable reference to another table',
			'table_with_nullable_reference_to_another_table.sql',
			databaseModelWithTableWithNullableReferenceToAnotherTable
	);

	executeTestCaseForAllDialects(
			'Table with unique reference to another table',
			'table_with_unique_reference_to_another_table.sql',
			databaseModelWithTableWithUniqueReferenceToAnotherTable
	);

	executeTestCaseForAllDialects(
			'Table with reference to another table with a custom ID',
			'table_with_reference_to_another_table_with_a_custom_id.sql',
			databaseModelWithTableWithReferenceToAnotherTableWithCustomId
	);

	executeTestCaseForAllDialects(
			'Tables referencing each other',
			'tables_referencing_each_other.sql',
			databaseModelWithTablesReferencingEachOther
	);

	executeTestCaseForAllDialects(
			'Table referencing itself',
			'table_referencing_itself.sql',
			databaseModelWithTableReferencingItself
	);

});

describe('Config', () => {

	const typeBindings = {
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
	};

	executeTestCaseForAllDialects(
			'Full model with custom case formats and type bindings',
			'full_model_with_custom_case_formats_and_type_bindings.sql',
			fullDatabaseModel,
			{
				mysql: {
					tableNameCaseFormat: StandardCaseFormats.CAPITALIZED_UNDERSCORE,
					columnNameCaseFormat: StandardCaseFormats.LOWER_UNDERSCORE,
					typeBindings
				},
				oracle: {
					tableNameCaseFormat: StandardCaseFormats.CAPITALIZED_UNDERSCORE,
					columnNameCaseFormat: StandardCaseFormats.LOWER_UNDERSCORE,
					typeBindings
				},
				postgresql: {
					tableNameCaseFormat: StandardCaseFormats.UPPER_UNDERSCORE,
					columnNameCaseFormat: StandardCaseFormats.CAPITALIZED_UNDERSCORE,
					typeBindings
				},
				sqlite: {
					tableNameCaseFormat: StandardCaseFormats.UPPER_UNDERSCORE,
					columnNameCaseFormat: StandardCaseFormats.CAPITALIZED_UNDERSCORE,
					typeBindings
				},
				sqlserver: {
					tableNameCaseFormat: StandardCaseFormats.CAPITALIZED_UNDERSCORE,
					columnNameCaseFormat: StandardCaseFormats.LOWER_UNDERSCORE,
					typeBindings
				}
			}
	);

});

function executeTestCaseForAllDialects(testCaseDescription: string, expectedResultFile: string, databaseModel: DatabaseModel, configByDialect?: Record<SqlDialectId, Partial<SqlDialectConfig>>) {
	SQL_DIALECTS.forEach(([sqlDialectId, sqlDialectFactory]) => {
		test(`${testCaseDescription} [${sqlDialectId}]`, () => {

			const config = configByDialect?.[sqlDialectId];
			const sqlDialect = sqlDialectFactory(config);

			executeTestCaseForDialect(
					expectedResultFile,
					databaseModel,
					sqlDialectId,
					sqlDialect
			);

		});
	});
}

function executeTestCaseForDialect(expectedResultFile: string, databaseModel: DatabaseModel, sqlDialectId: string, sqlDialect: SqlDialect) {

	const databaseModelToCodeConverter = new DatabaseModelToSqlCodeConverter(sqlDialect);

	const result = databaseModelToCodeConverter.convertToCode(databaseModel);

	const expectedResult = getTestExpectedResult(expectedResultFile, sqlDialectId);

	expect(result).toBe(expectedResult);

}

function getTestExpectedResult(expectedResultFile: string, sqlDialectId: string): string {
	return require(`!!raw-loader!#/erdiagram/generator/database/code-converter/sql/DatabaseModelToSqlCodeConverter_func_spec_expected_results/${sqlDialectId}/${expectedResultFile}`);
}
