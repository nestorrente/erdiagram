import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import {createJavaType} from '@/erdiagram/generator/oop/code-converter/java/type/JavaType';
import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import JavaClassModelToCodeConverterConfig
	from '@/erdiagram/generator/oop/code-converter/java/config/JavaClassModelToCodeConverterConfig';

export class JavaClassModelToCodeConverterConfigManager extends AbstractComponentConfigManager<JavaClassModelToCodeConverterConfig> {

	getDefaultConfig(): JavaClassModelToCodeConverterConfig {
		return {
			typeMappings: {
				[EntityPropertyType.TEXT]: createJavaType('String', 'java.lang'),
				[EntityPropertyType.LONG]: createJavaType('Long', 'java.lang'),
				[EntityPropertyType.INT]: createJavaType('Integer', 'java.lang'),
				[EntityPropertyType.SHORT]: createJavaType('Short', 'java.lang'),
				[EntityPropertyType.DECIMAL]: createJavaType('BigDecimal', 'java.math'),
				[EntityPropertyType.BOOLEAN]: createJavaType('Boolean', 'java.lang'),
				[EntityPropertyType.DATE]: createJavaType('LocalDate', 'java.util.time'),
				[EntityPropertyType.TIME]: createJavaType('LocalTime', 'java.util.time'),
				[EntityPropertyType.DATETIME]: createJavaType('LocalDateTime', 'java.util.time')
			},
			useSpringNullabilityAnnotations: false
		};
	}

	mergeConfigs(fullConfig: JavaClassModelToCodeConverterConfig, partialConfig?: Partial<JavaClassModelToCodeConverterConfig>): JavaClassModelToCodeConverterConfig {
		return {
			...fullConfig,
			...partialConfig,
			typeMappings: {
				...fullConfig.typeMappings,
				...partialConfig?.typeMappings
			}
		};
	}

}

const javaClassModelToCodeConverterConfigManager = new JavaClassModelToCodeConverterConfigManager();
export default javaClassModelToCodeConverterConfigManager;
