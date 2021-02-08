export interface EntityRelationshipModel {
	entities: EntityDescriptor[];
	relationships: RelationshipDescriptor[];
}

export enum Cardinality {
	MANY = 'many',
	ONE = 'one'
}

export enum Direction {
	LEFT = 'left',
	RIGHT = 'right',
	BOTH = 'both'
}

export interface RelationshipDescriptor {
	leftMember: RelationshipMember;
	rightMember: RelationshipMember;
	direction: Direction;
	relationShipName?: string;
}

export interface RelationshipMember {
	entity: string;
	entityAlias: string;
	cardinality: Cardinality;
	optional: boolean;
	unique: boolean;
}

export interface EntityDescriptor {
	name: string;
	properties: EntityPropertyDescriptor[];
}

export interface EntityPropertyDescriptor {
	name: string;
	optional: boolean;
	autoincremental: boolean;
	unique: boolean;
	type: EntityPropertyType;
	length: number[];
}

export enum EntityPropertyType {
	BOOLEAN = 'bool',
	SHORT = 'short',
	INT = 'int',
	LONG = 'long',
	DECIMAL = 'decimal',
	TEXT = 'text',
	DATE = 'date',
	TIME = 'time',
	DATETIME = 'datetime'
}