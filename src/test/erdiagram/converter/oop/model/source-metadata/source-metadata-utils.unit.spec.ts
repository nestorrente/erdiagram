import {
	EntityIdentitySourceMetadata,
	EntityPropertySourceMetadata,
	EntityRelationshipModelSourceMetadata,
	EntitySourceMetadata,
	RelationshipMemberSourceMetadata,
	RelationshipSourceMetadata,
	SourceMetadata,
	SourceType
} from '@/erdiagram/converter/oop/model/source-metadata/source-metadata-types';
import {
	dummySourceEntity,
	dummySourceEntityRelationshipModel,
	dummySourceProperty,
	dummySourceRelationship,
	dummySourceRelationshipMember
} from '#/erdiagram/converter/common/source-metadata-instances';
import {
	isEntityIdentitySourceMetadata,
	isEntityPropertySourceMetadata,
	isEntityRelationshipModelSourceMetadata,
	isEntitySourceMetadata,
	isRelationshipMemberSourceMetadata,
	isRelationshipSourceMetadata
} from '@/erdiagram/converter/oop/model/source-metadata/source-metadata-utils';

const ENTITY_RELATIONSHIP_MODEL_SOURCE_METADATA: EntityRelationshipModelSourceMetadata = {
	sourceType: SourceType.ENTITY_RELATIONSHIP_MODEL,
	entityRelationshipModel: dummySourceEntityRelationshipModel
};

const ENTITY_SOURCE_METADATA: EntitySourceMetadata = {
	sourceType: SourceType.ENTITY,
	entity: dummySourceEntity
};

const ENTITY_IDENTITY_SOURCE_METADATA: EntityIdentitySourceMetadata = {
	sourceType: SourceType.ENTITY_IDENTITY,
	entity: dummySourceEntity
};

const ENTITY_PROPERTY_SOURCE_METADATA: EntityPropertySourceMetadata = {
	sourceType: SourceType.ENTITY_PROPERTY,
	entity: dummySourceEntity,
	property: dummySourceProperty
};

const RELATIONSHIP_SOURCE_METADATA: RelationshipSourceMetadata = {
	sourceType: SourceType.RELATIONSHIP,
	relationship: dummySourceRelationship
};

const RELATIONSHIP_MEMBER_SOURCE_METADATA: RelationshipMemberSourceMetadata = {
	sourceType: SourceType.RELATIONSHIP_MEMBER,
	relationship: dummySourceRelationship,
	referencedMember: dummySourceRelationshipMember
};

describe('is{SourceType}SourceMetadata() methods', () => {

	const testsData: [SourceMetadata, [boolean, boolean, boolean, boolean, boolean, boolean]][] = [
		[ENTITY_RELATIONSHIP_MODEL_SOURCE_METADATA, [true, false, false, false, false, false]],
		[ENTITY_SOURCE_METADATA, [false, true, false, false, false, false]],
		[ENTITY_IDENTITY_SOURCE_METADATA, [false, false, true, false, false, false]],
		[ENTITY_PROPERTY_SOURCE_METADATA, [false, false, false, true, false, false]],
		[RELATIONSHIP_SOURCE_METADATA, [false, false, false, false, true, false]],
		[RELATIONSHIP_MEMBER_SOURCE_METADATA, [false, false, false, false, false, true]],
	];

	testsData.forEach(([sourceMetadata, expectedResults]) => {

		const [
			isEntityRelationshipModelSourceMetadataExpectedResult,
			isEntitySourceMetadataExpectedResult,
			isEntityIdentitySourceMetadataExpectedResult,
			isEntityPropertySourceMetadataExpectedResult,
			isRelationshipSourceMetadataExpectedResult,
			isRelationshipMemberSourceMetadataExpectedResult
		] = expectedResults;

		test(`Source metadata of type "${sourceMetadata.sourceType}"`, () => {
			expect(isEntityRelationshipModelSourceMetadata(sourceMetadata)).toBe(isEntityRelationshipModelSourceMetadataExpectedResult);
			expect(isEntitySourceMetadata(sourceMetadata)).toBe(isEntitySourceMetadataExpectedResult);
			expect(isEntityIdentitySourceMetadata(sourceMetadata)).toBe(isEntityIdentitySourceMetadataExpectedResult);
			expect(isEntityPropertySourceMetadata(sourceMetadata)).toBe(isEntityPropertySourceMetadataExpectedResult);
			expect(isRelationshipSourceMetadata(sourceMetadata)).toBe(isRelationshipSourceMetadataExpectedResult);
			expect(isRelationshipMemberSourceMetadata(sourceMetadata)).toBe(isRelationshipMemberSourceMetadataExpectedResult);
		});

	});

});
