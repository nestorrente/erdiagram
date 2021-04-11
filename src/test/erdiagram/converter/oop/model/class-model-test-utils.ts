import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {ClassFieldDescriptor} from '@/erdiagram/converter/oop/model/class-model-types';

export function createIdClassField(name: string = 'id'): ClassFieldDescriptor {
	return {
		name,
		list: false,
		nullable: true,
		primitiveType: EntityPropertyType.IDENTITY
	};
}

export type PartialClassFieldDescriptor = Partial<Omit<ClassFieldDescriptor, 'name' | 'primitiveType' | 'entityType'>>;

export function createPrimitiveClassField(name: string, type: EntityPropertyType, options?: PartialClassFieldDescriptor): ClassFieldDescriptor {
	return {
		name,
		list: options?.list ?? false,
		nullable: options?.nullable ?? false,
		maxSize: options?.maxSize,
		primitiveType: type
	};
}

export function createEntityClassField(name: string, type: string, options?: PartialClassFieldDescriptor): ClassFieldDescriptor {
	return {
		name,
		list: options?.list ?? false,
		nullable: options?.nullable ?? false,
		entityType: type
	};
}
