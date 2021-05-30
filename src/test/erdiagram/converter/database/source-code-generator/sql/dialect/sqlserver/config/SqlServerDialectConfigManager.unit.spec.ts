import {SqlServerDialectConfigManager} from '@/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/config/SqlServerDialectConfigManager';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import SqlServerDialectConfig
	from '@/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/config/SqlServerDialectConfig';
import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';
import CaseFormat from '@/erdiagram/converter/common/case-format/CaseFormat';
import {JsonValue} from 'true-json';

const configManager = new SqlServerDialectConfigManager();

const defaultTypeBindings: Record<EntityPropertyType, string> = {
	[EntityPropertyType.IDENTITY]: 'BIGINT',
	[EntityPropertyType.TEXT]: 'NVARCHAR',
	[EntityPropertyType.LONG]: 'BIGINT',
	[EntityPropertyType.INT]: 'INT',
	[EntityPropertyType.SHORT]: 'SMALLINT',
	[EntityPropertyType.DECIMAL]: 'DECIMAL',
	[EntityPropertyType.BOOLEAN]: 'BIT',
	[EntityPropertyType.DATE]: 'DATE',
	[EntityPropertyType.TIME]: 'TIME',
	[EntityPropertyType.DATETIME]: 'DATETIME2',
	[EntityPropertyType.BLOB]: 'VARBINARY(MAX)'
};

const defaultTableNameCaseFormatKey: keyof typeof StandardCaseFormats = 'UPPER_CAMEL';
const defaultColumnNameCaseFormatKey: keyof typeof StandardCaseFormats = 'UPPER_CAMEL';

describe('Serialization', () => {

	const config: SqlServerDialectConfig = {
		typeBindings: defaultTypeBindings,
		tableNameCaseFormat: StandardCaseFormats[defaultTableNameCaseFormatKey],
		columnNameCaseFormat: StandardCaseFormats[defaultColumnNameCaseFormatKey],
	};

	const serializableConfig: JsonValue = {
		typeBindings: defaultTypeBindings,
		tableNameCaseFormat: defaultTableNameCaseFormatKey,
		columnNameCaseFormat: defaultColumnNameCaseFormatKey,
	};

	test(`Convert to serializable object`, () => {

		const result = configManager.convertToSerializableObject(config);

		expect(result).toStrictEqual(serializableConfig);

	});

	test(`Convert from serializable object`, () => {

		const result = configManager.convertFromSerializableObject(serializableConfig);

		expect(result).toStrictEqual(config);

	});

});

describe('Serialization of other case formats', () => {

	const noopCaseFormat: CaseFormat = {
		splitWords(text: string): string[] {
			return [text];
		},
		joinWords(words: string[]): string {
			return words.join('');
		}
	};

	const testData: [string, CaseFormat, keyof typeof StandardCaseFormats, keyof typeof StandardCaseFormats][] = [
		['Lower camel case format', StandardCaseFormats.LOWER_CAMEL, 'LOWER_CAMEL', 'LOWER_CAMEL'],
		['Upper camel case format', StandardCaseFormats.UPPER_CAMEL, 'UPPER_CAMEL', 'UPPER_CAMEL'],
		['Lower underscore case format', StandardCaseFormats.LOWER_UNDERSCORE, 'LOWER_UNDERSCORE', 'LOWER_UNDERSCORE'],
		['Upper underscore case format', StandardCaseFormats.UPPER_UNDERSCORE, 'UPPER_UNDERSCORE', 'UPPER_UNDERSCORE'],
		['Capitalized underscore case format', StandardCaseFormats.CAPITALIZED_UNDERSCORE, 'CAPITALIZED_UNDERSCORE', 'CAPITALIZED_UNDERSCORE'],
		['No-op case format', noopCaseFormat, defaultTableNameCaseFormatKey, defaultColumnNameCaseFormatKey],
	];

	testData.forEach(([testCaseDescription, caseFormat, serializedTableNameCaseFormat, serializedColumnNameCaseFormat]) => {

		test(`Convert to serializable object (${testCaseDescription})`, () => {

			const result = configManager.convertToSerializableObject({
				typeBindings: defaultTypeBindings,
				tableNameCaseFormat: caseFormat,
				columnNameCaseFormat: caseFormat,
			});

			expect(result).toStrictEqual({
				typeBindings: defaultTypeBindings,
				tableNameCaseFormat: serializedTableNameCaseFormat,
				columnNameCaseFormat: serializedColumnNameCaseFormat,
			});

		});

		test(`Convert from serializable object (${testCaseDescription})`, () => {

			const result = configManager.convertFromSerializableObject({
				typeBindings: defaultTypeBindings,
				tableNameCaseFormat: serializedTableNameCaseFormat,
				columnNameCaseFormat: serializedColumnNameCaseFormat,
			});

			expect(result).toStrictEqual<SqlServerDialectConfig>({
				typeBindings: defaultTypeBindings,
				tableNameCaseFormat: StandardCaseFormats[serializedTableNameCaseFormat],
				columnNameCaseFormat: StandardCaseFormats[serializedColumnNameCaseFormat],
			});

		});

	});

});
