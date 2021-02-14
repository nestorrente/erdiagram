import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import TypeScriptClassModelToCodeConverterConfig
	from '@/erdiagram/generator/oop/code-converter/typescript/config/TypeScriptClassModelToCodeConverterConfig';
import parseTypeScriptType from '@/erdiagram/generator/oop/code-converter/typescript/type/parseTypeScriptType';
import TypeScriptClassModelToCodeConverterSerializedConfig
	from '@/erdiagram/generator/oop/code-converter/typescript/config/TypeScriptClassModelToCodeConverterSerializedConfig';
import {mapValues} from '@/erdiagram/util/record-utils';

export class TypeScriptClassModelToCodeConverterConfigManager
		extends AbstractComponentConfigManager<TypeScriptClassModelToCodeConverterConfig, Partial<TypeScriptClassModelToCodeConverterConfig>, TypeScriptClassModelToCodeConverterSerializedConfig> {

	getDefaultConfig(): TypeScriptClassModelToCodeConverterConfig {
		return {
			typeMappings: {
				[EntityPropertyType.TEXT]: parseTypeScriptType('string'),
				[EntityPropertyType.LONG]: parseTypeScriptType('number'),
				[EntityPropertyType.INT]: parseTypeScriptType('number'),
				[EntityPropertyType.SHORT]: parseTypeScriptType('number'),
				[EntityPropertyType.DECIMAL]: parseTypeScriptType('number'),
				[EntityPropertyType.BOOLEAN]: parseTypeScriptType('boolean'),
				[EntityPropertyType.DATE]: parseTypeScriptType('Date'),
				[EntityPropertyType.TIME]: parseTypeScriptType('Date'),
				[EntityPropertyType.DATETIME]: parseTypeScriptType('Date'),
				[EntityPropertyType.BLOB]: parseTypeScriptType('number[]'),
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

	protected prepareBeforeSerializing(fullConfig: TypeScriptClassModelToCodeConverterConfig): TypeScriptClassModelToCodeConverterSerializedConfig {
		return {
			...fullConfig,
			typeMappings: mapValues(fullConfig.typeMappings, typeScriptType => typeScriptType!.format()),
		};
	}

	protected processAfterDeserializing(serializedConfig: TypeScriptClassModelToCodeConverterSerializedConfig): TypeScriptClassModelToCodeConverterConfig {
		return {
			...serializedConfig,
			typeMappings: mapValues(serializedConfig.typeMappings, parseTypeScriptType),
		};
	}

}

const typescriptClassModelToCodeConverterConfigManager = new TypeScriptClassModelToCodeConverterConfigManager();
export default typescriptClassModelToCodeConverterConfigManager;
