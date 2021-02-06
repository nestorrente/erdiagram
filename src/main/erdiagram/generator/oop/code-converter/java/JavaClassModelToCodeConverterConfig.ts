import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import ClassModelToCodeConverterConfig from '@/erdiagram/generator/oop/code-converter/ClassModelToCodeConverterConfig';
import JavaType, {createJavaType} from '@/erdiagram/generator/oop/code-converter/java/type/JavaType';

export default interface JavaClassModelToCodeConverterConfig extends ClassModelToCodeConverterConfig<JavaType> {
	generatedClassesPackage?: string;
	useSpringNullabilityAnnotations: boolean;
}

export const defaultJavaClassModelToCodeConverterConfig: JavaClassModelToCodeConverterConfig = {
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

export function mergeJavaClassModelToCodeConverterConfigs(
		fullConfig: JavaClassModelToCodeConverterConfig,
		partialConfig?: Partial<JavaClassModelToCodeConverterConfig>
): JavaClassModelToCodeConverterConfig {
	return {
		...fullConfig,
		...partialConfig,
		typeMappings: {
			...fullConfig.typeMappings,
			...partialConfig?.typeMappings
		}
	};
}

export function mergeWithDefaultJavaClassModelToCodeConverterConfig(
		config?: Partial<JavaClassModelToCodeConverterConfig>
): JavaClassModelToCodeConverterConfig {
	return mergeJavaClassModelToCodeConverterConfigs(defaultJavaClassModelToCodeConverterConfig, config);
}
