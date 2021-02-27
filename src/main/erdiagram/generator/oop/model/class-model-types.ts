import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';

export interface ClassModel {
	classes: ClassDescriptor[];
}

export interface ClassDescriptor {
	name: string;
	fields: ClassFieldDescriptor[];
}

export interface ClassFieldDescriptor {
	name: string;
	nullable: boolean;
	list: boolean;
	// Find a better way to represent when a field is an entity or a built-in type
	primitiveType?: EntityPropertyType;
	entityType?: string;
}
