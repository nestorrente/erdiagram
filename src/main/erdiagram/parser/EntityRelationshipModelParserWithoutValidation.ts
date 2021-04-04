import {
	EntityRelationshipModelParseResult,
	ParsedStatementResult
} from '@/erdiagram/parser/types/parsed-entity-relationship-model-types';
import EntityRelationshipModelLineParser from '@/erdiagram/parser/line/EntityRelationshipModelLineParser';
import ParseState from '@/erdiagram/parser/types/ParseState';

const LINE_SEPARATOR = '\n';

export default class EntityRelationshipModelParserWithoutValidation {

	private readonly lineParser: EntityRelationshipModelLineParser;

	constructor() {
		this.lineParser = new EntityRelationshipModelLineParser();
	}

	public parseModelWithoutValidation(code: string): EntityRelationshipModelParseResult {

		const state = this.createInitialParseState();

		this.parseCode(code, state);

		return this.mapParseStateToParseResult(state);

	}

	private createInitialParseState(): ParseState {
		return {
			entities: [],
			relationships: [],
			entityBeingParsed: null,
			statementResultToLineMap: new Map<ParsedStatementResult, number>()
		};
	}

	private parseCode(code: string, state: ParseState) {
		const lines = code.split(LINE_SEPARATOR);
		this.lineParser.parseLines(lines, state);
	}

	private mapParseStateToParseResult(state: ParseState): EntityRelationshipModelParseResult {

		const {
			entities,
			relationships,
			statementResultToLineMap
		} = state;

		return {
			model: {
				entities,
				relationships
			},
			statementResultToLineMap
		};

	}

}
