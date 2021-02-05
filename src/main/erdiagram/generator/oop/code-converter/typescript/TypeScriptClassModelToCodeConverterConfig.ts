import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import ClassModelToCodeConverterConfig from '@/erdiagram/generator/oop/code-converter/ClassModelToCodeConverterConfig';
import TypeScriptType, {createTypeScriptType} from '@/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptType';

export default interface TypeScriptClassModelToCodeConverterConfig extends ClassModelToCodeConverterConfig<TypeScriptType> {

}

export const defaultTypeScriptClassModelToCodeConverterConfig: TypeScriptClassModelToCodeConverterConfig = {
	typesMap: {
		[EntityPropertyType.TEXT]: createTypeScriptType('string'),
		[EntityPropertyType.LONG]: createTypeScriptType('number'),
		[EntityPropertyType.INT]: createTypeScriptType('number'),
		[EntityPropertyType.SHORT]: createTypeScriptType('number'),
		[EntityPropertyType.DECIMAL]: createTypeScriptType('number'),
		[EntityPropertyType.BOOLEAN]: createTypeScriptType('boolean'),
		[EntityPropertyType.DATE]: createTypeScriptType('Date'),
		[EntityPropertyType.TIME]: createTypeScriptType('Date'),
		[EntityPropertyType.DATETIME]: createTypeScriptType('Date')
	}
};

export function mergeTypeScriptClassModelToCodeConverterConfigs(
		fullConfig: TypeScriptClassModelToCodeConverterConfig,
		partialConfig?: Partial<TypeScriptClassModelToCodeConverterConfig>
): TypeScriptClassModelToCodeConverterConfig {
	return {
		...fullConfig,
		...partialConfig,
		typesMap: {
			...fullConfig.typesMap,
			...partialConfig?.typesMap
		}
	};
}

export function mergeWithDefaultTypeScriptClassModelToCodeConverterConfig(
		config?: Partial<TypeScriptClassModelToCodeConverterConfig>
): TypeScriptClassModelToCodeConverterConfig {
	return mergeTypeScriptClassModelToCodeConverterConfigs(defaultTypeScriptClassModelToCodeConverterConfig, config);
}
