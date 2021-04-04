import {
	ParsedEntityDescriptor,
	ParsedRelationshipDescriptor,
	ParsedStatementResult
} from '@/erdiagram/parser/types/parsed-entity-relationship-model-types';

export default interface ParseState {
	entities: ParsedEntityDescriptor[];
	relationships: ParsedRelationshipDescriptor[];
	entityBeingParsed: ParsedEntityDescriptor | null;
	statementResultToLineMap: Map<ParsedStatementResult, number>;
}
