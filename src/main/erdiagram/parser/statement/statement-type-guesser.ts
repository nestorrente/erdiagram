import {
	ENTITY_NAME_LINE_REGEX,
	ENTITY_PROPERTY_LINE_REGEX,
	RELATIONSHIP_LINE_REGEX
} from '@/erdiagram/parser/statement/statement-types-regexes';

export enum StatementType {
	ENTITY_NAME = 'entityName',
	ENTITY_PROPERTY = 'entityProperty',
	RELATIONSHIP = 'relationship',
	BLANK_LINE = 'blankLine',
	UNKNOWN = 'unknown'
}

export function guessStatementType(line: string): StatementType {
	if (ENTITY_NAME_LINE_REGEX.test(line)) {
		return StatementType.ENTITY_NAME;
	} else if (ENTITY_PROPERTY_LINE_REGEX.test(line)) {
		return StatementType.ENTITY_PROPERTY;
	} else if (RELATIONSHIP_LINE_REGEX.test(line)) {
		return StatementType.RELATIONSHIP;
	} else if (isBlankLine(line)) {
		return StatementType.BLANK_LINE;
	} else {
		return StatementType.UNKNOWN;
	}
}

function isBlankLine(line: string) {
	return /^\s*(#.*)?$/.test(line);
}
