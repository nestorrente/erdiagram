import {
	Direction,
	EntityPropertyType,
	RelationshipMember
} from '@/erdiagram/parser/types/entity-relationship-model-types';

export interface EntityRelationshipModelParseResult {
	model: ParsedEntityRelationshipModel;
	statementResultToLineMap: Map<ParsedStatementResult, number>;
}

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
