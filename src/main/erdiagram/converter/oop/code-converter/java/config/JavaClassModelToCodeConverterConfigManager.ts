import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import JavaClassModelToCodeConverterConfig
	from '@/erdiagram/converter/oop/code-converter/java/config/JavaClassModelToCodeConverterConfig';
import parseJavaType from '@/erdiagram/converter/oop/code-converter/java/type/parseJavaType';
import {mapValues} from '@/erdiagram/util/record-utils';
import JavaClassModelToCodeConverterSerializableConfig
	from '@/erdiagram/converter/oop/code-converter/java/config/JavaClassModelToCodeConverterSerializableConfig';

export class JavaClassModelToCodeConverterConfigManager
		extends AbstractComponentConfigManager<JavaClassModelToCodeConverterConfig, Partial<JavaClassModelToCodeConverterConfig>, JavaClassModelToCodeConverterSerializableConfig> {

	getDefaultConfig(): JavaClassModelToCodeConverterConfig {
		return {
			typeBindings: {
				[EntityPropertyType.IDENTIFIER]: parseJavaType('java.lang.Long'),
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

	convertToSerializableObject(fullConfig: JavaClassModelToCodeConverterConfig): JavaClassModelToCodeConverterSerializableConfig {
		return {
			...fullConfig,
			typeBindings: mapValues(fullConfig.typeBindings, javaType => javaType!.formatCanonical()),
		};
	}

	convertFromSerializableObject(serializableConfig: JavaClassModelToCodeConverterSerializableConfig): JavaClassModelToCodeConverterConfig {
		return {
			...serializableConfig,
			typeBindings: mapValues(serializableConfig.typeBindings, parseJavaType),
		};
	}

}

const javaClassModelToCodeConverterConfigManager = new JavaClassModelToCodeConverterConfigManager();
export default javaClassModelToCodeConverterConfigManager;
