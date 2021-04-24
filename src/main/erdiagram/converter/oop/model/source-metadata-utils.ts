import {
	EntityIdentitySourceMetadata,
	EntityPropertySourceMetadata,
	EntitySourceMetadata,
	RelationshipSourceMetadata,
	RelationshipTargetSourceMetadata,
	SourceMetadata,
	SourceType
} from '@/erdiagram/converter/oop/model/source-metadata-types';

export function isEntitySourceMetadata(sourceMetadata: SourceMetadata): sourceMetadata is EntitySourceMetadata {
	return sourceMetadata.sourceType === SourceType.ENTITY;
}

export function isEntityIdentitySourceMetadata(sourceMetadata: SourceMetadata): sourceMetadata is EntityIdentitySourceMetadata {
	return sourceMetadata.sourceType === SourceType.ENTITY_IDENTITY;
}

export function isEntityPropertySourceMetadata(sourceMetadata: SourceMetadata): sourceMetadata is EntityPropertySourceMetadata {
	return sourceMetadata.sourceType === SourceType.ENTITY_PROPERTY;
}

export function isRelationshipSourceMetadata(sourceMetadata: SourceMetadata): sourceMetadata is RelationshipSourceMetadata {
	return sourceMetadata.sourceType === SourceType.RELATIONSHIP;
}

export function isRelationshipMemberSourceMetadata(sourceMetadata: SourceMetadata): sourceMetadata is RelationshipTargetSourceMetadata {
	return sourceMetadata.sourceType === SourceType.RELATIONSHIP_TARGET;
}
