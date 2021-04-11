export interface EntityRelationshipModel {
	entities: EntityDescriptor[];
	relationships: RelationshipDescriptor[];
}

export interface EntityDescriptor {
	name: string;
	identityPropertyName?: string;
	properties: EntityPropertyDescriptor[];
}

export interface EntityPropertyDescriptor {
	name: string;
	optional: boolean;
	unique: boolean;
	type: EntityPropertyType;
	length: number[];
}

export enum EntityPropertyType {
	IDENTITY = 'identity',
	BOOLEAN = 'bool',
	SHORT = 'short',
	INT = 'int',
	LONG = 'long',
	DECIMAL = 'decimal',
	TEXT = 'text',
	DATE = 'date',
	TIME = 'time',
	DATETIME = 'datetime',
	BLOB = 'blob'
}

export interface RelationshipDescriptor {
	leftMember: RelationshipMember;
	rightMember: RelationshipMember;
	direction: Direction;
	relationshipName?: string;
}

export interface RelationshipMember {
	entity: string;
	entityAlias: string;
	cardinality: Cardinality;
}

export enum Cardinality {
	MANY = 'many',
	ONE = 'one',
	ZERO_OR_ONE = 'zero_or_one'
}

export enum Direction {
	LEFT_TO_RIGHT = 'left_to_right',
	RIGHT_TO_LEFT = 'right_to_left',
	BIDIRECTIONAL = 'bidirectional'
}
