import {capitalize, uncapitalize} from '../../util/string-utils';
import {ENTITY_NAME_LINE_REGEX, ENTITY_PROPERTY_LINE_REGEX, RELATIONSHIP_LINE_REGEX} from './statement-types-regexes';

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
	relationShipName: string;
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
	length?: number;
}

export enum EntityPropertyType {
	TEXT = 'text',
	LONG = 'long',
	INT = 'int',
	SHORT = 'short',
	DECIMAL = 'decimal',
	BOOLEAN = 'bool',
	DATE = 'date',
	TIME = 'time',
	DATETIME = 'datetime'
}

export function parseEntityNameStatement(line: string): string {

	const result = ENTITY_NAME_LINE_REGEX.exec(line);

	if (result == null) {
		throw new Error('Syntax error');
	}

	const [entityName] = result;

	return entityName;

}

export function parseEntityPropertyStatement(line: string): EntityPropertyDescriptor {

	const result = ENTITY_PROPERTY_LINE_REGEX.exec(line);

	if (result == null) {
		throw new Error('Syntax error');
	}

	const [
		fullMatch,
		name,
		modifiers,
		type,
		length
	] = result;

	const mappedType = type.toLowerCase() as EntityPropertyType;

	if (!Object.values(EntityPropertyType).includes(mappedType)) {
		throw new Error('Unknown type: ' + type);
	}

	return {
		name,
		optional: modifiers.includes('?'),
		autoincremental: modifiers.includes('+'),
		unique: modifiers.includes('!'),
		type: mappedType,
		length: length ? parseInt(length, 10) : undefined
	};

}

export function parseRelationshipStatement(line: string): RelationshipDescriptor {

	const result = RELATIONSHIP_LINE_REGEX.exec(line);

	if (result == null) {
		throw new Error('Syntax error');
	}

	const [
		fullMatch,
		leftEntity,
		leftEntityAlias = uncapitalize(leftEntity),
		leftModifiers,
		leftCardinality,
		direction,
		rightCardinality,
		rightModifiers,
		rightEntity,
		rightEntityAlias = uncapitalize(rightEntity),
		relationShipName = `${leftEntity}${capitalize(rightEntity)}`
	] = result;

	return {
		leftMember: {
			entity: leftEntity,
			entityAlias: leftEntityAlias,
			cardinality: leftCardinality === '*' ? Cardinality.MANY : Cardinality.ONE,
			optional: leftModifiers.includes('?'),
			unique: leftModifiers.includes('!')
		},
		rightMember: {
			entity: rightEntity,
			entityAlias: rightEntityAlias,
			cardinality: rightCardinality === '*' ? Cardinality.MANY : Cardinality.ONE,
			optional: rightModifiers.includes('?'),
			unique: rightModifiers.includes('!')
		},
		direction: direction === '->' ? Direction.RIGHT : (direction === '<-' ? Direction.LEFT : Direction.BOTH),
		relationShipName
	};

}
