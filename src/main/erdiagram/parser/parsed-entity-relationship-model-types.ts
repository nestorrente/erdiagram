import {Direction, EntityPropertyType, RelationshipMember} from '@/erdiagram/parser/entity-relationship-model-types';

export type ParsedStatementResult =
		ParsedEntityDescriptor
		| ParsedEntityPropertyDescriptor
		| ParsedRelationshipDescriptor;

export interface ParsedEntityRelationshipModel {
	entities: ParsedEntityDescriptor[];
	relationships: ParsedRelationshipDescriptor[];
}

export interface ParsedEntityDescriptor {
	name: string;
	properties: ParsedEntityPropertyDescriptor[];
}

export interface ParsedEntityPropertyDescriptor {
	name: string;
	optional: boolean;
	autoincremental: boolean;
	unique: boolean;
	type: EntityPropertyType;
	length: number[];
}

export interface ParsedRelationshipDescriptor {
	leftMember: RelationshipMember;
	rightMember: RelationshipMember;
	direction: Direction;
	relationshipName?: string;
}
