import {capitalizeWord, uncapitalizeWord} from '@/erdiagram/util/string-utils';
import {
	ENTITY_NAME_LINE_REGEX,
	ENTITY_PROPERTY_LINE_REGEX,
	RELATIONSHIP_LINE_REGEX
} from '@/erdiagram/parser/statement/statement-types-regexes';
import {Cardinality, Direction, EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {
	ParsedEntityPropertyDescriptor,
	ParsedRelationshipDescriptor
} from '@/erdiagram/parser/types/parsed-entity-relationship-model-types';
import ERDiagramSyntaxError from '@/erdiagram/parser/types/error/ERDiagramSyntaxError';
import ERDiagramUnknownTypeError from '@/erdiagram/parser/types/error/ERDiagramUnknownTypeError';

export function parseEntityNameStatement(line: string): string {

	const result = ENTITY_NAME_LINE_REGEX.exec(line);

	if (result == null) {
		throw new ERDiagramSyntaxError('Syntax error');
	}

	const [
		fullMatch,
		entityName
	] = result;

	return capitalizeWord(entityName);

}

export function parseEntityPropertyStatement(line: string): ParsedEntityPropertyDescriptor {

	const result = ENTITY_PROPERTY_LINE_REGEX.exec(line);

	if (result == null) {
		throw new ERDiagramSyntaxError('Syntax error');
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
		throw new ERDiagramUnknownTypeError('Unknown type: ' + type);
	}

	return {
		name: uncapitalizeWord(name),
		optional: modifiers.includes('?'),
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

export function parseRelationshipStatement(line: string): ParsedRelationshipDescriptor {

	const result = RELATIONSHIP_LINE_REGEX.exec(line);

	if (result == null) {
		throw new ERDiagramSyntaxError('Syntax error');
	}

	const [
		fullMatch,
		leftEntity,
		leftEntityAlias = leftEntity,
		leftCardinalityCharacter,
		direction,
		rightCardinalityCharacter,
		rightEntity,
		rightEntityAlias = rightEntity,
		relationshipName
	] = result;

	return {
		relationshipName: relationshipName ? capitalizeWord(relationshipName) : undefined,
		direction: direction === '->' ? Direction.LEFT_TO_RIGHT : (direction === '<-' ? Direction.RIGHT_TO_LEFT : Direction.BIDIRECTIONAL),
		leftMember: {
			entity: capitalizeWord(leftEntity),
			entityAlias: uncapitalizeWord(leftEntityAlias),
			cardinality: parseRelationshipMemberCardinality(leftCardinalityCharacter)
		},
		rightMember: {
			entity: capitalizeWord(rightEntity),
			entityAlias: uncapitalizeWord(rightEntityAlias),
			cardinality: parseRelationshipMemberCardinality(rightCardinalityCharacter)
		}
	};

}

function parseRelationshipMemberCardinality(leftCardinalityCharacter: string) {
	switch (leftCardinalityCharacter) {
		case '*':
			return Cardinality.MANY;
		case '?':
			return Cardinality.ZERO_OR_ONE;
		default:
			return Cardinality.ONE;
	}
}
