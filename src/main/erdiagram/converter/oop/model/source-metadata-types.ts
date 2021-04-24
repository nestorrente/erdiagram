import {
	EntityDescriptor,
	EntityPropertyDescriptor,
	RelationshipDescriptor,
	RelationshipMember
} from '@/erdiagram/parser/types/entity-relationship-model-types';

export enum SourceType {
	ENTITY = 'entity',
	ENTITY_IDENTITY = 'entity_identity',
	ENTITY_PROPERTY = 'entity_property',
	RELATIONSHIP = 'relationship',
	RELATIONSHIP_TARGET = 'relationship_target'
}

export interface SourceMetadata<T extends SourceType = SourceType> {
	readonly sourceType: T;
}

export interface EntitySourceMetadata extends SourceMetadata<SourceType.ENTITY> {
	entity: EntityDescriptor;
}

export interface EntityIdentitySourceMetadata extends SourceMetadata<SourceType.ENTITY_IDENTITY> {
	entity: EntityDescriptor;
}

export interface EntityPropertySourceMetadata extends SourceMetadata<SourceType.ENTITY_PROPERTY> {
	entity: EntityDescriptor;
	property: EntityPropertyDescriptor;
}

export interface RelationshipSourceMetadata extends SourceMetadata<SourceType.RELATIONSHIP> {
	relationship: RelationshipDescriptor;
}

export interface RelationshipTargetSourceMetadata extends SourceMetadata<SourceType.RELATIONSHIP_TARGET> {
	relationship: RelationshipDescriptor;
	targetMember: RelationshipMember;
}

export type OmitSource<T> = Omit<T, 'sourceMetadata'>;
