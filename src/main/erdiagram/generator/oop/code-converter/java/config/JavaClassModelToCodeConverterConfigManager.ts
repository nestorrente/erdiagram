import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import JavaClassModelToCodeConverterConfig
	from '@/erdiagram/generator/oop/code-converter/java/config/JavaClassModelToCodeConverterConfig';
import parseJavaType from '@/erdiagram/generator/oop/code-converter/java/type/parseJavaType';
import {mapValues} from '@/erdiagram/util/record-utils';
import JavaClassModelToCodeConverterSerializedConfig
	from '@/erdiagram/generator/oop/code-converter/java/config/JavaClassModelToCodeConverterSerializedConfig';

export class JavaClassModelToCodeConverterConfigManager
		extends AbstractComponentConfigManager<JavaClassModelToCodeConverterConfig, Partial<JavaClassModelToCodeConverterConfig>, JavaClassModelToCodeConverterSerializedConfig> {

	getDefaultConfig(): JavaClassModelToCodeConverterConfig {
		return {
			typeBindings: {
				[EntityPropertyType.TEXT]: parseJavaType('java.lang.String'),
				[EntityPropertyType.LONG]: parseJavaType('java.lang.Long'),
				[EntityPropertyType.INT]: parseJavaType('java.lang.Integer'),
				[EntityPropertyType.SHORT]: parseJavaType('java.lang.Short'),
				[EntityPropertyType.DECIMAL]: parseJavaType('java.math.BigDecimal'),
				[EntityPropertyType.BOOLEAN]: parseJavaType('java.lang.Boolean'),
				[EntityPropertyType.DATE]: parseJavaType('java.util.time.LocalDate'),
				[EntityPropertyType.TIME]: parseJavaType('java.util.time.LocalTime'),
				[EntityPropertyType.DATETIME]: parseJavaType('java.util.time.LocalDateTime'),
				[EntityPropertyType.BLOB]: parseJavaType('byte[]')
			},
			useSpringNullabilityAnnotations: false
		};
	}

	mergeConfigs(fullConfig: JavaClassModelToCodeConverterConfig, partialConfig?: Partial<JavaClassModelToCodeConverterConfig>): JavaClassModelToCodeConverterConfig {
		return {
			...fullConfig,
			...partialConfig,
			typeBindings: {
				...fullConfig.typeBindings,
				...partialConfig?.typeBindings
			}
		};
	}

	convertToSerializableObject(fullConfig: JavaClassModelToCodeConverterConfig): JavaClassModelToCodeConverterSerializedConfig {
		return {
			...fullConfig,
			typeBindings: mapValues(fullConfig.typeBindings, javaType => javaType!.formatCanonical()),
		};
	}

	convertFromSerializableObject(serializedConfig: JavaClassModelToCodeConverterSerializedConfig): JavaClassModelToCodeConverterConfig {
		return {
			...serializedConfig,
			typeBindings: mapValues(serializedConfig.typeBindings, parseJavaType),
		};
	}

}

const javaClassModelToCodeConverterConfigManager = new JavaClassModelToCodeConverterConfigManager();
export default javaClassModelToCodeConverterConfigManager;
