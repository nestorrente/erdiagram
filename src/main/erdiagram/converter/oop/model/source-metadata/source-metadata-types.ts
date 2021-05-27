import {
	EntityDescriptor,
	EntityPropertyDescriptor,
	EntityRelationshipModel,
	RelationshipDescriptor,
	RelationshipMember
} from '@/erdiagram/parser/types/entity-relationship-model-types';

export enum SourceType {
	ENTITY_RELATIONSHIP_MODEL = 'entity_relationship_model',
	ENTITY = 'entity',
	ENTITY_IDENTITY = 'entity_identity',
	ENTITY_PROPERTY = 'entity_property',
	RELATIONSHIP = 'relationship',
	RELATIONSHIP_MEMBER = 'relationship_member'
}

export interface SourceMetadata<T extends SourceType = SourceType> {
	readonly sourceType: T;
}

export interface EntityRelationshipModelSourceMetadata extends SourceMetadata<SourceType.ENTITY_RELATIONSHIP_MODEL> {
	entityRelationshipModel: EntityRelationshipModel;
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

export interface RelationshipMemberSourceMetadata extends SourceMetadata<SourceType.RELATIONSHIP_MEMBER> {
	relationship: RelationshipDescriptor;
	referencedMember: RelationshipMember;
}

export type OmitSource<T> = Omit<T, 'sourceMetadata'>;
