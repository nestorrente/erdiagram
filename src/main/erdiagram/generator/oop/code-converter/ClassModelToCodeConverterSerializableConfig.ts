import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';

export default interface ClassModelToCodeConverterSerializableConfig {
	typeBindings: Record<EntityPropertyType, string>;
}
