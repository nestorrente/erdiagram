import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import AbstractConfigManager from '@/erdiagram/common/config/AbstractConfigManager';
import TypeScriptConfig, {PartialTypeScriptConfig} from '@/erdiagram/converter/oop/source-code-generator/typescript/config/TypeScriptConfig';
import parseTypeScriptType from '@/erdiagram/converter/oop/source-code-generator/typescript/type/parseTypeScriptType';
import {JsonAdapter, JsonAdapters} from 'true-json';
import TypeScriptType from '@/erdiagram/converter/oop/source-code-generator/typescript/type/TypeScriptType';

export class TypeScriptConfigManager extends AbstractConfigManager<TypeScriptConfig, PartialTypeScriptConfig> {

	getDefaultConfig(): TypeScriptConfig {
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

	mergeConfigs(fullConfig: TypeScriptConfig, partialConfig?: PartialTypeScriptConfig): TypeScriptConfig {
		return {
			...fullConfig,
			...partialConfig,
			typeBindings: {
				...fullConfig.typeBindings,
				...partialConfig?.typeBindings
			}
		};
	}

	protected getJsonAdapter(): JsonAdapter<TypeScriptConfig> {
		return JsonAdapters.object<TypeScriptConfig>({
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

const typescriptConfigManager = new TypeScriptConfigManager();
export default typescriptConfigManager;
