import {joinRegExps} from '@/erdiagram/util/regex-utils';

const IDENTIFIER_REGEX = /[a-zA-Z_][a-zA-Z_0-9]*/;
const OPTIONAL_TRAILING_SPACES_AND_COMMENT = /\s*(#.*)?$/;

// Entity name

export const ENTITY_NAME_LINE_REGEX = new RegExp(`^(${IDENTIFIER_REGEX.source})${OPTIONAL_TRAILING_SPACES_AND_COMMENT.source}`);

// Entity property

const PROPERTY_NAME_REGEX = new RegExp(`(${IDENTIFIER_REGEX.source})`);
const PROPERTY_MODIFIERS_REGEX = new RegExp(`([?!]*)`);

const PROPERTY_TYPE_NAME_REGEX = new RegExp(`(${IDENTIFIER_REGEX.source})`);
const PROPERTY_TYPE_LENGTH_REGEX = new RegExp(`(?:\\((\\s*\\d+\\s*(?:,\\s*\\d+\\s*)*)\\))?`);

const ENTITY_PROPERTY_REGEX = joinRegExps(PROPERTY_NAME_REGEX, PROPERTY_MODIFIERS_REGEX, /\s+/, PROPERTY_TYPE_NAME_REGEX, PROPERTY_TYPE_LENGTH_REGEX);

export const ENTITY_PROPERTY_LINE_REGEX = new RegExp(`^\\s+${ENTITY_PROPERTY_REGEX.source}${OPTIONAL_TRAILING_SPACES_AND_COMMENT.source}`);

// Relationship

const RELATIONSHIP_DIRECTION_REGEX = /(<-|->|<->)/;
const RELATIONSHIP_CARDINALITY_REGEX = /([?1*])?/;
const DIRECTION_AND_CARDINALITY_REGEX = joinRegExps(RELATIONSHIP_CARDINALITY_REGEX, RELATIONSHIP_DIRECTION_REGEX, RELATIONSHIP_CARDINALITY_REGEX);

const ENTITY_AND_ALIAS_REGEX = new RegExp(`(${IDENTIFIER_REGEX.source})(?:\\s+(${IDENTIFIER_REGEX.source}))?`);

export const RELATIONSHIP_LINE_REGEX = new RegExp(`^${ENTITY_AND_ALIAS_REGEX.source}\\s*?${DIRECTION_AND_CARDINALITY_REGEX.source}\\s*?${ENTITY_AND_ALIAS_REGEX.source}(?:\\s+\\(\\s*(${IDENTIFIER_REGEX.source})\\s*\\))?${OPTIONAL_TRAILING_SPACES_AND_COMMENT.source}`);
