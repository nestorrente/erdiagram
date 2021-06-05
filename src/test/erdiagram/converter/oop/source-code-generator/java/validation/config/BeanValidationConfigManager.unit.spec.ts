import NotNullTextValidationStrategy
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullTextValidationStrategy';
import NotNullBlobValidationStrategy
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullBlobValidationStrategy';
import {JsonValue} from 'true-json';
import {BeanValidationConfigManager} from '../../../../../../../../main/erdiagram/converter/oop/source-code-generator/java/validation/config/BeanValidationConfigManager';
import BeanValidationConfig
	from '../../../../../../../../main/erdiagram/converter/oop/source-code-generator/java/validation/config/BeanValidationConfig';

const configManager = new BeanValidationConfigManager();

describe('Serialization', () => {

	const config: BeanValidationConfig = {
		notNullTextValidationStrategy: NotNullTextValidationStrategy.NOT_BLANK,
		notNullBlobValidationStrategy: NotNullBlobValidationStrategy.NOT_EMPTY,
		annotateGetters: true
	};

	const serializableConfig: JsonValue = {
		notNullTextValidationStrategy: NotNullTextValidationStrategy.NOT_BLANK,
		notNullBlobValidationStrategy: NotNullBlobValidationStrategy.NOT_EMPTY,
		annotateGetters: true
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
