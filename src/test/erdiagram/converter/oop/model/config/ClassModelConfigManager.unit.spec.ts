import {ClassModelConfigManager} from '@/erdiagram/converter/oop/model/config/ClassModelConfigManager';
import ClassModelConfig from '@/erdiagram/converter/oop/model/config/ClassModelConfig';
import IdNamingStrategy from '@/erdiagram/converter/common/id-naming-strategy/IdNamingStrategy';
import StandardIdNamingStrategies from '@/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies';
import {capitalizeWord} from '@/erdiagram/util/string-utils';

const configManager = new ClassModelConfigManager();

describe('Serialization', () => {

	test(`Convert to serializable object`, () => {

		const result = configManager.convertToSerializableObject({
			idNamingStrategy: StandardIdNamingStrategies.DEFAULT
		});

		expect(result).toStrictEqual({
			idNamingStrategy: 'DEFAULT'
		});

	});

	test(`Convert from serializable object`, () => {

		const result = configManager.convertFromSerializableObject({
			idNamingStrategy: 'DEFAULT'
		});

		expect(result).toStrictEqual<ClassModelConfig>({
			idNamingStrategy: StandardIdNamingStrategies.DEFAULT
		});

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
				idNamingStrategy
			});

			expect(result).toStrictEqual({
				idNamingStrategy: serializedIdNamingStrategy
			});

		});

		test(`Convert from serializable object (${testCaseDescription})`, () => {

			const result = configManager.convertFromSerializableObject({
				idNamingStrategy: serializedIdNamingStrategy
			});

			expect(result).toStrictEqual<ClassModelConfig>({
				idNamingStrategy: StandardIdNamingStrategies[serializedIdNamingStrategy]
			});

		});

	});

});
