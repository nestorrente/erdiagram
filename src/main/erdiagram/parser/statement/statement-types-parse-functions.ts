import {capitalizeWord, uncapitalizeWord} from '@/erdiagram/util/string-utils';
import {
	ENTITY_NAME_LINE_REGEX,
	ENTITY_PROPERTY_LINE_REGEX,
	RELATIONSHIP_LINE_REGEX
} from '@/erdiagram/parser/statement/statement-types-regexes';
import {
	Cardinality,
	Direction,
	EntityPropertyDescriptor,
	EntityPropertyType,
	RelationshipDescriptor
} from '@/erdiagram/parser/entity-relationship-model-types';

export function parseEntityNameStatement(line: string): string {

	const result = ENTITY_NAME_LINE_REGEX.exec(line);

	if (result == null) {
		throw new Error('Syntax error');
	}

	const [
		fullMatch,
		entityName
	] = result;

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
		length: parsePropertyLength(length)
	};

}

function parsePropertyLength(length: string): number[] {

	if (!length) {
		return [];
	}

	return length.split(',')
			.map(lengthNumber => parseInt(lengthNumber.trim(), 10));

}

export function parseRelationshipStatement(line: string): RelationshipDescriptor {

	const result = RELATIONSHIP_LINE_REGEX.exec(line);

	if (result == null) {
		throw new Error('Syntax error');
	}

	const [
		fullMatch,
		leftEntity,
		leftEntityAlias = leftEntity,
		leftModifiers,
		leftCardinalityCharacter,
		direction,
		rightCardinalityCharacter,
		rightModifiers,
		rightEntity,
		rightEntityAlias = rightEntity,
		relationShipName
	] = result;

	return {
		leftMember: {
			entity: capitalizeWord(leftEntity),
			entityAlias: uncapitalizeWord(leftEntityAlias),
			cardinality: leftCardinalityCharacter === '*' ? Cardinality.MANY : Cardinality.ONE,
			optional: leftModifiers.includes('?'),
			unique: leftModifiers.includes('!')
		},
		rightMember: {
			entity: capitalizeWord(rightEntity),
			entityAlias: uncapitalizeWord(rightEntityAlias),
			cardinality: rightCardinalityCharacter === '*' ? Cardinality.MANY : Cardinality.ONE,
			optional: rightModifiers.includes('?'),
			unique: rightModifiers.includes('!')
		},
		direction: direction === '->' ? Direction.RIGHT : (direction === '<-' ? Direction.LEFT : Direction.BOTH),
		relationShipName
	};

}
