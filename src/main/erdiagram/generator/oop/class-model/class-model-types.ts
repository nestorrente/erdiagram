import {EntityPropertyType} from '@/erdiagram/parser/statement/statement-types-parse-functions';

export interface ClassModel {
	classes: ClassDescriptor[];
}

export interface ClassDescriptor {
	name: string;
	fields: FieldDescriptor[];
}

export interface FieldDescriptor {
	name: string;
	nullable: boolean;
	list: boolean;
	// Find a better way to represent when a field is an entity or a built-in type
	primitiveType?: EntityPropertyType;
	entityType?: string;
}
