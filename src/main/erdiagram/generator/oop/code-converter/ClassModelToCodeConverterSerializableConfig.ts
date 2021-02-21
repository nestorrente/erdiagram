import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';

export default interface ClassModelToCodeConverterSerializableConfig {
	// FIXME estas configuraciones no se pueden implementar porque es el ClassModelGenerator quien genera el ID
	// idFieldType: EntityPropertyType;
	// idNamingStrategy: string;
	typeBindings: Record<EntityPropertyType, string>;
}
