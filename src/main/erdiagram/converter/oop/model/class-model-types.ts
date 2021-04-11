import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';

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
	maxSize?: number;
	// Find a better way to represent when a field is an entity or a built-in type
	primitiveType?: EntityPropertyType;
	entityType?: string;
}
