import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import {createTypeScriptType} from '@/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptType';
import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import TypeScriptClassModelToCodeConverterConfig
	from '@/erdiagram/generator/oop/code-converter/typescript/config/TypeScriptClassModelToCodeConverterConfig';

export class TypeScriptClassModelToCodeConverterConfigManager extends AbstractComponentConfigManager<TypeScriptClassModelToCodeConverterConfig> {

	getDefaultConfig(): TypeScriptClassModelToCodeConverterConfig {
		return {
			typeMappings: {
				[EntityPropertyType.TEXT]: createTypeScriptType('string'),
				[EntityPropertyType.LONG]: createTypeScriptType('number'),
				[EntityPropertyType.INT]: createTypeScriptType('number'),
				[EntityPropertyType.SHORT]: createTypeScriptType('number'),
				[EntityPropertyType.DECIMAL]: createTypeScriptType('number'),
				[EntityPropertyType.BOOLEAN]: createTypeScriptType('boolean'),
				[EntityPropertyType.DATE]: createTypeScriptType('Date'),
				[EntityPropertyType.TIME]: createTypeScriptType('Date'),
				[EntityPropertyType.DATETIME]: createTypeScriptType('Date'),
				[EntityPropertyType.BLOB]: createTypeScriptType('number[]'),
			}
		};
	}

	mergeConfigs(fullConfig: TypeScriptClassModelToCodeConverterConfig, partialConfig?: Partial<TypeScriptClassModelToCodeConverterConfig>): TypeScriptClassModelToCodeConverterConfig {
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

const typescriptClassModelToCodeConverterConfigManager = new TypeScriptClassModelToCodeConverterConfigManager();
export default typescriptClassModelToCodeConverterConfigManager;
