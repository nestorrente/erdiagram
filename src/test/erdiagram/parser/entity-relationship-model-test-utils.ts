import {
	EntityDescriptor,
	EntityPropertyDescriptor,
	EntityPropertyType
} from '../../../main/erdiagram/parser/entity-relationship-model-types';

export function createEntityWithoutProperties(name: string): EntityDescriptor {
	return {
		name,
		identifierPropertyName: undefined,
		properties: []
	};
}

export function createSimpleEntityProperty(name: string, type: EntityPropertyType, length: number[] = []): EntityPropertyDescriptor {
	return {
		name,
		type,
		length,
		optional: false,
		unique: false,
		autoincremental: false
	};
}
