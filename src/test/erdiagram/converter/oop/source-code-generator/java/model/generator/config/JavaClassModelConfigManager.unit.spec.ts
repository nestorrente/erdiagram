import {JavaClassModelConfigManager} from '@/erdiagram/converter/oop/source-code-generator/java/model/generator/config/JavaClassModelConfigManager';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import parseJavaType from '@/erdiagram/converter/oop/source-code-generator/java/type/parseJavaType';
import JavaClassModelConfig
	from '@/erdiagram/converter/oop/source-code-generator/java/model/generator/config/JavaClassModelConfig';
import {JsonValue} from 'true-json';

const configManager = new JavaClassModelConfigManager();

describe('Serialization', () => {

	const config: JavaClassModelConfig = {
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
		generatedClassesPackage: 'com.example.erdiagram'
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
		generatedClassesPackage: 'com.example.erdiagram'
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
