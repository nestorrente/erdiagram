import {TypeScriptConfigManager} from '@/erdiagram/converter/oop/source-code-generator/typescript/config/TypeScriptConfigManager';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import parseTypeScriptType from '@/erdiagram/converter/oop/source-code-generator/typescript/type/parseTypeScriptType';
import TypeScriptConfig from '@/erdiagram/converter/oop/source-code-generator/typescript/config/TypeScriptConfig';
import {JsonValue} from 'true-json';

const configManager = new TypeScriptConfigManager();

describe('Serialization', () => {

	const config: TypeScriptConfig = {
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

	const serializableConfig: JsonValue = {
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

		expect(result).toStrictEqual(config);

	});

});
