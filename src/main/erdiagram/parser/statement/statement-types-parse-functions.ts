import {capitalizeWord, uncapitalizeWord} from '@/erdiagram/util/string-utils';
import {
	ENTITY_NAME_LINE_REGEX,
	ENTITY_PROPERTY_LINE_REGEX,
	RELATIONSHIP_LINE_REGEX
} from '@/erdiagram/parser/statement/statement-types-regexes';
import pluralize from 'pluralize';

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

	return capitalizeWord(entityName);

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
		name: uncapitalizeWord(name),
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
		providedLeftEntityAlias,
		leftModifiers,
		leftCardinalityCharacter,
		direction,
		rightCardinalityCharacter,
		rightModifiers,
		rightEntity,
		providedRightEntityAlias,
		relationShipName
	] = result;

	const leftCardinality = leftCardinalityCharacter === '*' ? Cardinality.MANY : Cardinality.ONE;
	const rightCardinality = rightCardinalityCharacter === '*' ? Cardinality.MANY : Cardinality.ONE;

	const leftEntityAlias = providedLeftEntityAlias || (
			leftCardinality === Cardinality.MANY
					? pluralize(leftEntity)
					: leftEntity
	);
	const rightEntityAlias = providedRightEntityAlias || (
			rightCardinality === Cardinality.MANY
					? pluralize(rightEntity)
					: rightEntity
	);

	return {
		leftMember: {
			entity: capitalizeWord(leftEntity),
			entityAlias: uncapitalizeWord(leftEntityAlias),
			cardinality: leftCardinality,
			optional: leftModifiers.includes('?'),
			unique: leftModifiers.includes('!')
		},
		rightMember: {
			entity: capitalizeWord(rightEntity),
			entityAlias: uncapitalizeWord(rightEntityAlias),
			cardinality: rightCardinality,
			optional: rightModifiers.includes('?'),
			unique: rightModifiers.includes('!')
		},
		direction: direction === '->' ? Direction.RIGHT : (direction === '<-' ? Direction.LEFT : Direction.BOTH),
		relationShipName
	};

}
