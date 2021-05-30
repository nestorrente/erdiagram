import {OracleDialectConfigManager} from '@/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/config/OracleDialectConfigManager';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import OracleDialectConfig
	from '@/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/config/OracleDialectConfig';
import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';
import CaseFormat from '@/erdiagram/converter/common/case-format/CaseFormat';
import {JsonValue} from 'true-json';

const configManager = new OracleDialectConfigManager();

const defaultTypeBindings: Record<EntityPropertyType, string> = {
	[EntityPropertyType.IDENTITY]: 'NUMBER',
	[EntityPropertyType.TEXT]: 'VARCHAR2',
	[EntityPropertyType.LONG]: 'NUMBER',
	[EntityPropertyType.INT]: 'NUMBER',
	[EntityPropertyType.SHORT]: 'NUMBER',
	[EntityPropertyType.DECIMAL]: 'NUMBER',
	[EntityPropertyType.BOOLEAN]: 'NUMBER(1, 0)',
	[EntityPropertyType.DATE]: 'DATE',
	[EntityPropertyType.TIME]: 'TIMESTAMP',
	[EntityPropertyType.DATETIME]: 'TIMESTAMP',
	[EntityPropertyType.BLOB]: 'BLOB'
};

const defaultTableNameCaseFormatKey: keyof typeof StandardCaseFormats = 'UPPER_UNDERSCORE';
const defaultColumnNameCaseFormatKey: keyof typeof StandardCaseFormats = 'UPPER_UNDERSCORE';

describe('Serialization', () => {

	const config: OracleDialectConfig = {
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

			expect(result).toStrictEqual<OracleDialectConfig>({
				typeBindings: defaultTypeBindings,
				tableNameCaseFormat: StandardCaseFormats[serializedTableNameCaseFormat],
				columnNameCaseFormat: StandardCaseFormats[serializedColumnNameCaseFormat],
			});

		});

	});

});
