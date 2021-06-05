import TypeScriptType from '@/erdiagram/converter/oop/source-code-generator/typescript/type/TypeScriptType';
import {WithPartial} from '@/erdiagram/util/types';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';

export default interface TypeScriptConfig {
	typeBindings: Record<EntityPropertyType, TypeScriptType>;
}

export type PartialTypeScriptConfig = Partial<WithPartial<TypeScriptConfig, 'typeBindings'>>;
