import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';

export default interface ClassModelToCodeConverterSerializableConfig {
	typeBindings: Record<EntityPropertyType, string>;
}
