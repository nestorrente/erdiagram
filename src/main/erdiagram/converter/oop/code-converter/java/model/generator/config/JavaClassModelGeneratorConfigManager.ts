import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import parseJavaType from '@/erdiagram/converter/oop/code-converter/java/type/parseJavaType';
import {JsonAdapter, JsonAdapters} from 'true-json';
import JavaType from '@/erdiagram/converter/oop/code-converter/java/type/JavaType';
import JavaClassModelGeneratorConfig, {PartialJavaClassModelGeneratorConfig} from '@/erdiagram/converter/oop/code-converter/java/model/generator/config/JavaClassModelGeneratorConfig';

export class JavaClassModelGeneratorConfigManager
		extends AbstractComponentConfigManager<JavaClassModelGeneratorConfig, PartialJavaClassModelGeneratorConfig> {

	getDefaultConfig(): JavaClassModelGeneratorConfig {
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

	mergeConfigs(fullConfig: JavaClassModelGeneratorConfig, partialConfig?: PartialJavaClassModelGeneratorConfig): JavaClassModelGeneratorConfig {
		return {
			...fullConfig,
			...partialConfig,
			typeBindings: {
				...fullConfig.typeBindings,
				...partialConfig?.typeBindings
			}
		};
	}

	protected getJsonAdapter(): JsonAdapter<JavaClassModelGeneratorConfig> {
		return JsonAdapters.object<JavaClassModelGeneratorConfig>({
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

const javaClassModelGeneratorConfigManager = new JavaClassModelGeneratorConfigManager();
export default javaClassModelGeneratorConfigManager;
