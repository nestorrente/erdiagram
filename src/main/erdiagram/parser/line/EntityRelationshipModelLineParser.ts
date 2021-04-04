import {
	parseEntityNameStatement,
	parseEntityPropertyStatement,
	parseRelationshipStatement
} from '@/erdiagram/parser/statement/statement-types-parse-functions';
import {guessStatementType, StatementType} from '@/erdiagram/parser/statement/statement-type-guesser';
import {ERDiagramSyntaxError} from '@/erdiagram/parser/types/parse-errors';
import {ParsedEntityDescriptor} from '@/erdiagram/parser/types/parsed-entity-relationship-model-types';
import ParseState from '@/erdiagram/parser/types/ParseState';
import EntityRelationshipModelLineParserErrorHandler
	from '@/erdiagram/parser/line/EntityRelationshipModelLineParserErrorHandler';

export default class EntityRelationshipModelLineParser {

	private readonly errorHandler: EntityRelationshipModelLineParserErrorHandler;

	constructor() {
		this.errorHandler = new EntityRelationshipModelLineParserErrorHandler();
	}

	public parseLines(lines: string[], state: ParseState) {
		lines.forEach((line, lineIndex) => {
			try {
				this.parseLine(line, lineIndex, state);
			} catch (error) {
				this.errorHandler.handleLineError(error, lineIndex);
			}
		});
	}

	private parseLine(line: string, lineIndex: number, state: ParseState) {

		const statementType = guessStatementType(line);

		switch (statementType) {
			case StatementType.ENTITY_NAME:
				this.parseEntityNameLine(line, state, lineIndex);
				break;
			case StatementType.ENTITY_PROPERTY:
				this.parseEntityPropertyLine(state, line, lineIndex);
				break;
			case StatementType.RELATIONSHIP:
				this.parseRelationshipLine(line, state, lineIndex);
				break;
			case StatementType.BLANK_LINE:
				// Ignore
				break;
			default:
				throw new ERDiagramSyntaxError(`Unknown statement type`);
		}

	}

	private parseEntityNameLine(line: string, state: ParseState, lineIndex: number) {

		const entityDescriptor: ParsedEntityDescriptor = {
			name: parseEntityNameStatement(line),
			properties: []
		};

		state.entities.push(entityDescriptor);
		state.entityBeingParsed = entityDescriptor;
		state.statementResultToLineMap.set(entityDescriptor, lineIndex);

	}

	private parseEntityPropertyLine(state: ParseState, line: string, lineIndex: number) {

		if (state.entityBeingParsed == null) {
			throw new ERDiagramSyntaxError('Unexpected entity property statement');
		}

		const entityPropertyDescriptor = parseEntityPropertyStatement(line);

		state.entityBeingParsed.properties.push(entityPropertyDescriptor);
		state.statementResultToLineMap.set(entityPropertyDescriptor, lineIndex);

	}

	private parseRelationshipLine(line: string, state: ParseState, lineIndex: number) {

		const relationshipDescriptor = parseRelationshipStatement(line);

		state.relationships.push(relationshipDescriptor);
		state.entityBeingParsed = null;
		state.statementResultToLineMap.set(relationshipDescriptor, lineIndex);

	}

}
