import StandardIdNamingStrategies from '@/erdiagram/generator/common/id-naming-strategy/StandardIdNamingStrategies';
import {EntityPropertyType} from '@/erdiagram/parser/statement/statement-types-parse-functions';
import ClassModelToCodeConverterConfig from '@/erdiagram/generator/oop/code-converter/ClassModelToCodeConverterConfig';
import TypeScriptType, {createTypeScriptType} from '@/erdiagram/generator/oop/code-converter/typescript/type/TypeScriptType';

export default interface TypeScriptClassModelToCodeConverterConfig extends ClassModelToCodeConverterConfig<TypeScriptType> {

}

export const defaultTypeScriptClassModelToCodeConverterConfig: TypeScriptClassModelToCodeConverterConfig = {
	idFieldType: EntityPropertyType.LONG,
	idNamingStrategy: StandardIdNamingStrategies.DEFAULT,
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

export function mergeWithDefaultTypeScriptClassModelToCodeConverterConfig(
		config?: Partial<TypeScriptClassModelToCodeConverterConfig>
): TypeScriptClassModelToCodeConverterConfig {
	return {
		...defaultTypeScriptClassModelToCodeConverterConfig,
		...config,
		typesMap: {
			...defaultTypeScriptClassModelToCodeConverterConfig.typesMap,
			...config?.typesMap
		}
	};
}
