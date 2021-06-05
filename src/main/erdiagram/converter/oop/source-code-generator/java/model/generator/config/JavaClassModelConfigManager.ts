import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import AbstractConfigManager from '@/erdiagram/common/config/AbstractConfigManager';
import parseJavaType from '@/erdiagram/converter/oop/source-code-generator/java/type/parseJavaType';
import {JsonAdapter, JsonAdapters} from 'true-json';
import JavaType from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaType';
import JavaClassModelConfig, {PartialJavaClassModelConfig} from '@/erdiagram/converter/oop/source-code-generator/java/model/generator/config/JavaClassModelConfig';

export class JavaClassModelConfigManager
		extends AbstractConfigManager<JavaClassModelConfig, PartialJavaClassModelConfig> {

	getDefaultConfig(): JavaClassModelConfig {
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
			}
		};
	}

	mergeConfigs(fullConfig: JavaClassModelConfig, partialConfig?: PartialJavaClassModelConfig): JavaClassModelConfig {
		return {
			...fullConfig,
			...partialConfig,
			typeBindings: {
				...fullConfig.typeBindings,
				...partialConfig?.typeBindings
			}
		};
	}

	protected getJsonAdapter(): JsonAdapter<JavaClassModelConfig> {
		return JsonAdapters.object<JavaClassModelConfig>({
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

const javaClassModelConfigManager = new JavaClassModelConfigManager();
export default javaClassModelConfigManager;
