import {JavaClassModelToCodeConverterConfigManager} from '@/erdiagram/converter/oop/code-converter/java/config/JavaClassModelToCodeConverterConfigManager';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import parseJavaType from '@/erdiagram/converter/oop/code-converter/java/type/parseJavaType';
import NotNullTextValidationStrategy
	from '@/erdiagram/converter/oop/code-converter/java/annotation/validation/NotNullTextValidationStrategy';
import NotNullBlobValidationStrategy
	from '@/erdiagram/converter/oop/code-converter/java/annotation/validation/NotNullBlobValidationStrategy';
import JavaClassModelToCodeConverterConfig
	from '@/erdiagram/converter/oop/code-converter/java/config/JavaClassModelToCodeConverterConfig';
import {assertSameRecords} from '#/erdiagram/util/jest-utils';
import {JsonValue} from 'true-json';

const configManager = new JavaClassModelToCodeConverterConfigManager();

describe('Serialization', () => {

	const config: JavaClassModelToCodeConverterConfig = {
		typeBindings: {
			[EntityPropertyType.IDENTITY]: parseJavaType('java.lang.Long'),
			[EntityPropertyType.TEXT]: parseJavaType('java.lang.String'),
			[EntityPropertyType.LONG]: parseJavaType('java.lang.Long'),
			[EntityPropertyType.INT]: parseJavaType('java.lang.Integer'),
			[EntityPropertyType.SHORT]: parseJavaType('java.lang.Short'),
			[EntityPropertyType.DECIMAL]: parseJavaType('java.math.BigDecimal'),
			[EntityPropertyType.BOOLEAN]: parseJavaType('java.lang.Boolean'),
			[EntityPropertyType.DATE]: parseJavaType('java.time.LocalDate'),
			[EntityPropertyType.TIME]: parseJavaType('java.time.LocalTime'),
			[EntityPropertyType.DATETIME]: parseJavaType('java.time.LocalDateTime'),
			[EntityPropertyType.BLOB]: parseJavaType('byte[]')
		},
		useValidationAnnotations: false,
		notNullTextValidationStrategy: NotNullTextValidationStrategy.NOT_NULL,
		notNullBlobValidationStrategy: NotNullBlobValidationStrategy.NOT_NULL
	};

	const serializableConfig: JsonValue = {
		typeBindings: {
			[EntityPropertyType.IDENTITY]: 'java.lang.Long',
			[EntityPropertyType.TEXT]: 'java.lang.String',
			[EntityPropertyType.LONG]: 'java.lang.Long',
			[EntityPropertyType.INT]: 'java.lang.Integer',
			[EntityPropertyType.SHORT]: 'java.lang.Short',
			[EntityPropertyType.DECIMAL]: 'java.math.BigDecimal',
			[EntityPropertyType.BOOLEAN]: 'java.lang.Boolean',
			[EntityPropertyType.DATE]: 'java.time.LocalDate',
			[EntityPropertyType.TIME]: 'java.time.LocalTime',
			[EntityPropertyType.DATETIME]: 'java.time.LocalDateTime',
			[EntityPropertyType.BLOB]: 'byte[]'
		},
		useValidationAnnotations: false,
		notNullTextValidationStrategy: NotNullTextValidationStrategy.NOT_NULL,
		notNullBlobValidationStrategy: NotNullBlobValidationStrategy.NOT_NULL
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
			expect(actualType.formatCanonical()).toBe(expectedType.formatCanonical());
		});

	});

});
