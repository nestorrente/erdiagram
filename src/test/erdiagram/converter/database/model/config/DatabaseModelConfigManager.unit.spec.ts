import {DatabaseModelConfigManager} from '@/erdiagram/converter/database/model/config/DatabaseModelConfigManager';
import DatabaseModelConfig from '@/erdiagram/converter/database/model/config/DatabaseModelConfig';
import StandardIdNamingStrategies from '@/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies';
import IdNamingStrategy from '@/erdiagram/converter/common/id-naming-strategy/IdNamingStrategy';
import {capitalizeWord} from '@/erdiagram/util/string-utils';
import {JsonValue} from 'true-json';

const configManager = new DatabaseModelConfigManager();

describe('Serialization', () => {

	const config: DatabaseModelConfig = {
		usePluralTableNames: false,
		idNamingStrategy: StandardIdNamingStrategies.DEFAULT
	};

	const serializableConfig: JsonValue = {
		usePluralTableNames: false,
		idNamingStrategy: 'DEFAULT'
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

describe('Serialization of different ID naming strategies', () => {

	const testdata: [string, IdNamingStrategy, keyof typeof StandardIdNamingStrategies][] = [
		['Entity Name Prefix strategy', StandardIdNamingStrategies.ENTITY_NAME_PREFIX, 'ENTITY_NAME_PREFIX'],
		['Custom strategy', (entityName: string) => `idOf${capitalizeWord(entityName)}`, 'DEFAULT']
	];

	testdata.forEach(([testCaseDescription, idNamingStrategy, serializedIdNamingStrategy]) => {

		test(`Convert to serializable object (${testCaseDescription})`, () => {

			const result = configManager.convertToSerializableObject({
				usePluralTableNames: false,
				idNamingStrategy
			});

			expect(result).toStrictEqual({
				usePluralTableNames: false,
				idNamingStrategy: serializedIdNamingStrategy
			});

		});

		test(`Convert from serializable object (${testCaseDescription})`, () => {

			const result = configManager.convertFromSerializableObject({
				usePluralTableNames: false,
				idNamingStrategy: serializedIdNamingStrategy
			});

			expect(result).toStrictEqual<DatabaseModelConfig>({
				usePluralTableNames: false,
				idNamingStrategy: StandardIdNamingStrategies[serializedIdNamingStrategy]
			});

		});

	});

});
