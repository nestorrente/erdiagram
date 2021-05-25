import {
	Cardinality,
	Direction,
	EntityDescriptor,
	EntityPropertyDescriptor,
	EntityPropertyType,
	EntityRelationshipModel,
	RelationshipDescriptor,
	RelationshipMember
} from '@/erdiagram/parser/types/entity-relationship-model-types';

export const dummySourceProperty: EntityPropertyDescriptor = {
	name: 'dummySourceProperty',
	type: EntityPropertyType.BOOLEAN,
	length: [],
	optional: false,
	unique: false
};

export const dummySourceEntity: EntityDescriptor = {
	name: 'DummySourceEntity',
	properties: [
		dummySourceProperty
	]
};

export const dummySourceRelationshipMember: RelationshipMember = {
	entity: dummySourceEntity.name,
	cardinality: Cardinality.MANY,
	entityAlias: 'dummySourceEntity'
};

export const dummySourceRelationship: RelationshipDescriptor = {
	direction: Direction.BIDIRECTIONAL,
	leftMember: dummySourceRelationshipMember,
	rightMember: dummySourceRelationshipMember
};

export const dummySourceEntityRelationshipModel: EntityRelationshipModel = {
	entities: [dummySourceEntity],
	relationships: [dummySourceRelationship]
};
