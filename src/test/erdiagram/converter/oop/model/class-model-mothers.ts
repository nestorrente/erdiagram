import {
	EntityDescriptor,
	EntityPropertyDescriptor,
	EntityPropertyType,
	RelationshipDescriptor,
	RelationshipMember
} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {ClassDescriptor, ClassFieldDescriptor} from '@/erdiagram/converter/oop/model/class-model-types';
import {SourceType} from '@/erdiagram/converter/oop/model/source-metadata/source-metadata-types';
import {
	dummySourceEntity,
	dummySourceProperty,
	dummySourceRelationship,
	dummySourceRelationshipMember
} from '#/erdiagram/converter/common/source-metadata-instances';

export type PartialClassDescriptor = Partial<Omit<ClassDescriptor, 'name' | 'sourceMetadata'> & {
	sourceEntity: EntityDescriptor;
}>;

export function createClass(name: string, options?: PartialClassDescriptor): ClassDescriptor {
	return {
		name,
		fields: options?.fields ?? [],
		sourceMetadata: {
			sourceType: SourceType.ENTITY,
			entity: options?.sourceEntity ?? dummySourceEntity
		}
	};
}

export type PartialIdClassFieldDescriptor = Partial<{
	name: string;
	sourceEntity: EntityDescriptor;
}>;

export function createIdClassField(options?: PartialIdClassFieldDescriptor): ClassFieldDescriptor {
	return {
		name: options?.name ?? 'id',
		list: false,
		nullable: true,
		primitiveType: EntityPropertyType.IDENTITY,
		sourceMetadata: {
			sourceType: SourceType.ENTITY_IDENTITY,
			entity: options?.sourceEntity ?? dummySourceEntity
		}
	};
}

export type PartialPrimitiveClassFieldDescriptor = Partial<Omit<ClassFieldDescriptor, 'name' | 'primitiveType' | 'entityType' | 'sourceMetadata'> & {
	sourceEntity: EntityDescriptor;
	sourceProperty: EntityPropertyDescriptor;
}>;

export function createPrimitiveClassField(name: string, type: EntityPropertyType, options?: PartialPrimitiveClassFieldDescriptor): ClassFieldDescriptor {
	return {
		name,
		list: options?.list ?? false,
		nullable: options?.nullable ?? false,
		maxSize: options?.maxSize,
		primitiveType: type,
		sourceMetadata: {
			sourceType: SourceType.ENTITY_PROPERTY,
			entity: options?.sourceEntity ?? dummySourceEntity,
			property: options?.sourceProperty ?? dummySourceProperty
		}
	};
}

export type PartialEntityClassFieldDescriptor = Partial<Omit<ClassFieldDescriptor, 'name' | 'primitiveType' | 'entityType' | 'sourceMetadata'> & {
	sourceRelationship: RelationshipDescriptor;
	sourceTargetMember: RelationshipMember;
}>;

export function createEntityClassField(name: string, type: string, options?: PartialEntityClassFieldDescriptor): ClassFieldDescriptor {
	return {
		name,
		list: options?.list ?? false,
		nullable: options?.nullable ?? false,
		entityType: type,
		sourceMetadata: {
			sourceType: SourceType.RELATIONSHIP_MEMBER,
			relationship: options?.sourceRelationship ?? dummySourceRelationship,
			referencedMember: options?.sourceTargetMember ?? dummySourceRelationshipMember
		}
	};
}
