import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';

export default interface ClassModelToCodeConverterConfig<T> {
	// FIXME estas configuraciones no se pueden implementar porque es el ClassModelGenerator quien genera el ID
	// idFieldType: EntityPropertyType;
	// idNamingStrategy: IdNamingStrategy;
	typeBindings: Partial<Record<EntityPropertyType, T>>;
}
