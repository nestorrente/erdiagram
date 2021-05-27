import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import JavaClassModelToCodeConverterConfig, {PartialJavaClassModelToCodeConverterConfig} from '@/erdiagram/converter/oop/code-converter/java/config/JavaClassModelToCodeConverterConfig';
import parseJavaType from '@/erdiagram/converter/oop/code-converter/java/type/parseJavaType';
import NotNullTextValidationStrategy
	from '@/erdiagram/converter/oop/code-converter/java/validation/strategy/NotNullTextValidationStrategy';
import NotNullBlobValidationStrategy
	from '@/erdiagram/converter/oop/code-converter/java/validation/strategy/NotNullBlobValidationStrategy';
import {JsonAdapter, JsonAdapters} from 'true-json';
import JavaType from '@/erdiagram/converter/oop/code-converter/java/type/JavaType';

export class JavaClassModelToCodeConverterConfigManager
		extends AbstractComponentConfigManager<JavaClassModelToCodeConverterConfig, PartialJavaClassModelToCodeConverterConfig> {

	getDefaultConfig(): JavaClassModelToCodeConverterConfig {
		return {
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
	}

	mergeConfigs(fullConfig: JavaClassModelToCodeConverterConfig, partialConfig?: PartialJavaClassModelToCodeConverterConfig): JavaClassModelToCodeConverterConfig {
		return {
			...fullConfig,
			...partialConfig,
			typeBindings: {
				...fullConfig.typeBindings,
				...partialConfig?.typeBindings
			}
		};
	}

	protected getJsonAdapter(): JsonAdapter<JavaClassModelToCodeConverterConfig> {
		return JsonAdapters.object<JavaClassModelToCodeConverterConfig>({
			typeBindings: JsonAdapters.record(JsonAdapters.custom<JavaType, string>({
				adaptToJson(value) {
					return value.formatCanonical();
				},
				recoverFromJson(value) {
					return parseJavaType(value);
				}
			}))
		});
	}

}

const javaClassModelToCodeConverterConfigManager = new JavaClassModelToCodeConverterConfigManager();
export default javaClassModelToCodeConverterConfigManager;
