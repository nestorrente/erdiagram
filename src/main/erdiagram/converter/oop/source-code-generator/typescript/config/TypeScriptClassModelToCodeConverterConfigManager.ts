import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import TypeScriptClassModelToCodeConverterConfig, {PartialTypeScriptClassModelToCodeConverterConfig} from '@/erdiagram/converter/oop/source-code-generator/typescript/config/TypeScriptClassModelToCodeConverterConfig';
import parseTypeScriptType from '@/erdiagram/converter/oop/source-code-generator/typescript/type/parseTypeScriptType';
import {JsonAdapter, JsonAdapters} from 'true-json';
import TypeScriptType from '@/erdiagram/converter/oop/source-code-generator/typescript/type/TypeScriptType';

export class TypeScriptClassModelToCodeConverterConfigManager
		extends AbstractComponentConfigManager<TypeScriptClassModelToCodeConverterConfig, PartialTypeScriptClassModelToCodeConverterConfig> {

	getDefaultConfig(): TypeScriptClassModelToCodeConverterConfig {
		return {
			typeBindings: {
				[EntityPropertyType.IDENTITY]: parseTypeScriptType('number'),
				[EntityPropertyType.TEXT]: parseTypeScriptType('string'),
				[EntityPropertyType.LONG]: parseTypeScriptType('number'),
				[EntityPropertyType.INT]: parseTypeScriptType('number'),
				[EntityPropertyType.SHORT]: parseTypeScriptType('number'),
				[EntityPropertyType.DECIMAL]: parseTypeScriptType('number'),
				[EntityPropertyType.BOOLEAN]: parseTypeScriptType('boolean'),
				[EntityPropertyType.DATE]: parseTypeScriptType('Date'),
				[EntityPropertyType.TIME]: parseTypeScriptType('Date'),
				[EntityPropertyType.DATETIME]: parseTypeScriptType('Date'),
				[EntityPropertyType.BLOB]: parseTypeScriptType('Uint8Array'),
			}
		};
	}

	mergeConfigs(fullConfig: TypeScriptClassModelToCodeConverterConfig, partialConfig?: PartialTypeScriptClassModelToCodeConverterConfig): TypeScriptClassModelToCodeConverterConfig {
		return {
			...fullConfig,
			...partialConfig,
			typeBindings: {
				...fullConfig.typeBindings,
				...partialConfig?.typeBindings
			}
		};
	}

	protected getJsonAdapter(): JsonAdapter<TypeScriptClassModelToCodeConverterConfig> {
		return JsonAdapters.object<TypeScriptClassModelToCodeConverterConfig>({
			typeBindings: JsonAdapters.record(JsonAdapters.custom<TypeScriptType, string>({
				adaptToJson(value) {
					return value.format();
				},
				recoverFromJson(value) {
					return parseTypeScriptType(value);
				}
			}))
		});
	}

}

const typescriptClassModelToCodeConverterConfigManager = new TypeScriptClassModelToCodeConverterConfigManager();
export default typescriptClassModelToCodeConverterConfigManager;
