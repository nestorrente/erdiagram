import {TypeScriptClassModelToCodeConverterConfigManager} from '@/erdiagram/converter/oop/code-converter/typescript/config/TypeScriptClassModelToCodeConverterConfigManager';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import parseTypeScriptType from '@/erdiagram/converter/oop/code-converter/typescript/type/parseTypeScriptType';
import TypeScriptClassModelToCodeConverterSerializableConfig
	from '@/erdiagram/converter/oop/code-converter/typescript/config/TypeScriptClassModelToCodeConverterSerializableConfig';
import TypeScriptClassModelToCodeConverterConfig
	from '@/erdiagram/converter/oop/code-converter/typescript/config/TypeScriptClassModelToCodeConverterConfig';
import {assertSameRecords} from '#/erdiagram/util/jest-utils';

const configManager = new TypeScriptClassModelToCodeConverterConfigManager();

describe('Serialization', () => {

	const config: TypeScriptClassModelToCodeConverterConfig = {
		typeBindings: {
			[EntityPropertyType.IDENTITY]: parseTypeScriptType('number'),
			[EntityPropertyType.TEXT]: parseTypeScriptType('string'),
			[EntityPropertyType.LONG]: parseTypeScriptType('number'),
			[EntityPropertyType.INT]: parseTypeScriptType('number'),
			[EntityPropertyType.SHORT]: parseTypeScriptType('number'),
			[EntityPropertyType.DECIMAL]: parseTypeScriptType('number'),
			[EntityPropertyType.BOOLEAN]: parseTypeScriptType('boolean'),
			[EntityPropertyType.DATE]: parseTypeScriptType('Date'),
			[EntityPropertyType.TIME]: parseTypeScriptType('Date'),
			[EntityPropertyType.DATETIME]: parseTypeScriptType('Date'),
			[EntityPropertyType.BLOB]: parseTypeScriptType('Uint8Array'),
		}
	};

	const serializableConfig: TypeScriptClassModelToCodeConverterSerializableConfig = {
		typeBindings: {
			[EntityPropertyType.IDENTITY]: 'number',
			[EntityPropertyType.TEXT]: 'string',
			[EntityPropertyType.LONG]: 'number',
			[EntityPropertyType.INT]: 'number',
			[EntityPropertyType.SHORT]: 'number',
			[EntityPropertyType.DECIMAL]: 'number',
			[EntityPropertyType.BOOLEAN]: 'boolean',
			[EntityPropertyType.DATE]: 'Date',
			[EntityPropertyType.TIME]: 'Date',
			[EntityPropertyType.DATETIME]: 'Date',
			[EntityPropertyType.BLOB]: 'Uint8Array',
		}
	};

	test(`Convert to serializable object`, () => {

		const result = configManager.convertToSerializableObject(config);

		expect(result).toStrictEqual(serializableConfig);

	});

	test(`Convert from serializable object`, () => {

		const result = configManager.convertFromSerializableObject(serializableConfig);

		const {
			typeBindings,
			...resultWithoutTypeBindings
		} = result;

		const {
			typeBindings: expectedTypeBindings,
			...expectedResultWithoutTypeBindings
		} = config;

		expect(resultWithoutTypeBindings).toStrictEqual(expectedResultWithoutTypeBindings);

		assertSameRecords(typeBindings, expectedTypeBindings, (actualType, expectedType) => {
			expect(actualType.format()).toBe(expectedType.format());
		});

	});

});
