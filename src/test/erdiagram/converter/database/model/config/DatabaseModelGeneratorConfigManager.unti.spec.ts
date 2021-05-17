import {DatabaseModelGeneratorConfigManager} from '@/erdiagram/converter/database/model/config/DatabaseModelGeneratorConfigManager';
import DatabaseModelGeneratorConfig from '@/erdiagram/converter/database/model/config/DatabaseModelGeneratorConfig';
import DatabaseModelGeneratorSerializableConfig
	from '@/erdiagram/converter/database/model/config/DatabaseModelGeneratorSerializableConfig';
import StandardIdNamingStrategies from '@/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies';
import IdNamingStrategy from '@/erdiagram/converter/common/id-naming-strategy/IdNamingStrategy';
import {capitalizeWord} from '@/erdiagram/util/string-utils';

const configManager = new DatabaseModelGeneratorConfigManager();

describe('Serialization', () => {

	const config: DatabaseModelGeneratorConfig = {
		usePluralTableNames: false,
		idNamingStrategy: StandardIdNamingStrategies.DEFAULT
	};

	const serializableConfig: DatabaseModelGeneratorSerializableConfig = {
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

			expect(result).toStrictEqual<DatabaseModelGeneratorSerializableConfig>({
				usePluralTableNames: false,
				idNamingStrategy: serializedIdNamingStrategy
			});

		});

		test(`Convert from serializable object (${testCaseDescription})`, () => {

			const result = configManager.convertFromSerializableObject({
				usePluralTableNames: false,
				idNamingStrategy: serializedIdNamingStrategy
			});

			expect(result).toStrictEqual<DatabaseModelGeneratorConfig>({
				usePluralTableNames: false,
				idNamingStrategy: StandardIdNamingStrategies[serializedIdNamingStrategy]
			});

		});

	});

});
