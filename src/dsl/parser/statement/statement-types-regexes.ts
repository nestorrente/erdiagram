import {joinRegExps} from '../../util/regex-utils';

const IDENTIFIER_REGEX = /[a-zA-Z_][a-zA-Z_0-9]*/;

// Entity name

export const ENTITY_NAME_LINE_REGEX = new RegExp(`^${IDENTIFIER_REGEX.source}$`);

// Entity property

const PROPERTY_NAME_REGEX = new RegExp(`(${IDENTIFIER_REGEX.source})`);
const OPTIONAL_PROPERTY_MODIFIER_REGEX = new RegExp(`(\\?)?`);

const PROPERTY_TYPE_NAME_REGEX = new RegExp(`(${IDENTIFIER_REGEX.source})`);
const PROPERTY_TYPE_LENGTH_REGEX = new RegExp(`(?:\\((\\d*)\\))?`);

const ENTITY_PROPERTY_REGEX = joinRegExps(PROPERTY_NAME_REGEX, OPTIONAL_PROPERTY_MODIFIER_REGEX, /\s+/, PROPERTY_TYPE_NAME_REGEX, PROPERTY_TYPE_LENGTH_REGEX);

export const ENTITY_PROPERTY_LINE_REGEX = new RegExp(`^\\s*${ENTITY_PROPERTY_REGEX.source}$`);

// Relationship

const DIRECTION_REGEX = /(<-|->|<->)/;
const CARDINALITY_REGEX = /([?1*])?/;
const DIRECTION_AND_CARDINALITY_REGEX = joinRegExps(CARDINALITY_REGEX, DIRECTION_REGEX, CARDINALITY_REGEX);

const ENTITY_AND_ALIAS_REGEX = new RegExp(`(${IDENTIFIER_REGEX.source})(?:\\s+(${IDENTIFIER_REGEX.source}))?`);

export const RELATIONSHIP_LINE_REGEX = new RegExp(`^${ENTITY_AND_ALIAS_REGEX.source}\\s*?${DIRECTION_AND_CARDINALITY_REGEX.source}\\s*?${ENTITY_AND_ALIAS_REGEX.source}(?:\\s+\\((${IDENTIFIER_REGEX.source})\\))?$`);

// Metadata

const METADATA_VALUE_REGEX = new RegExp(`(.*)`);
const METADATA_ENTRY_REGEX = new RegExp(`-\\s*(${IDENTIFIER_REGEX.source})\\s*:\\s*${METADATA_VALUE_REGEX.source}\\s*`);

export const METADATA_LINE_REGEX = new RegExp(`^\\s*${METADATA_ENTRY_REGEX.source}$`);
