import {MysqlDialectConfigManager} from '@/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/config/MysqlDialectConfigManager';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import MysqlDialectConfig
	from '@/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/config/MysqlDialectConfig';
import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';
import CaseFormat from '@/erdiagram/converter/common/case-format/CaseFormat';
import {JsonValue} from 'true-json';

const configManager = new MysqlDialectConfigManager();

const defaultTypeBindings: Record<EntityPropertyType, string> = {
	[EntityPropertyType.IDENTITY]: 'BIGINT',
	[EntityPropertyType.TEXT]: 'VARCHAR',
	[EntityPropertyType.LONG]: 'BIGINT',
	[EntityPropertyType.INT]: 'INT',
	[EntityPropertyType.SHORT]: 'SHORT',
	[EntityPropertyType.DECIMAL]: 'DECIMAL',
	[EntityPropertyType.BOOLEAN]: 'BOOLEAN',
	[EntityPropertyType.DATE]: 'DATE',
	[EntityPropertyType.TIME]: 'TIME',
	[EntityPropertyType.DATETIME]: 'TIMESTAMP',
	[EntityPropertyType.BLOB]: 'BLOB'
};

const defaultTableNameCaseFormatKey: keyof typeof StandardCaseFormats = 'UPPER_CAMEL';
const defaultColumnNameCaseFormatKey: keyof typeof StandardCaseFormats = 'LOWER_CAMEL';

describe('Serialization', () => {

	const config: MysqlDialectConfig = {
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

			expect(result).toStrictEqual<MysqlDialectConfig>({
				typeBindings: defaultTypeBindings,
				tableNameCaseFormat: StandardCaseFormats[serializedTableNameCaseFormat],
				columnNameCaseFormat: StandardCaseFormats[serializedColumnNameCaseFormat],
			});

		});

	});

});
