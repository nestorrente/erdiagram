import {
	parseEntityNameStatement,
	parseEntityPropertyStatement,
	parseRelationshipStatement
} from '@/erdiagram/parser/statement/statement-types-parse-functions';
import {guessStatementType, StatementType} from '@/erdiagram/parser/statement/statement-type-guesser';
import {EntityRelationshipModel} from '@/erdiagram/parser/entity-relationship-model-types';
import EntityRelationshipModelParserConfig from '@/erdiagram/parser/config/EntityRelationshipModelParserConfig';
import ParsedEntityRelationshipModelValidator
	from '@/erdiagram/parser/validator/ParsedEntityRelationshipModelValidator';
import entityRelationshipModelParserConfigManager
	from '@/erdiagram/parser/config/EntityRelationshipModelParserConfigManager';
import {
	ERDiagramEntityError,
	ERDiagramEntityPropertyError,
	ERDiagramError,
	ERDiagramParseLineError,
	ERDiagramRelationshipError,
	ERDiagramSyntaxError
} from '@/erdiagram/parser/parse-errors';
import {
	ParsedEntityDescriptor,
	ParsedEntityRelationshipModel,
	ParsedRelationshipDescriptor,
	ParsedStatementResult
} from '@/erdiagram/parser/parsed-entity-relationship-model-types';
import ParsedModelToPublicModelConverter from '@/erdiagram/parser/ParsedModelToPublicModelConverter';

interface ParseState {
	entities: ParsedEntityDescriptor[];
	relationships: ParsedRelationshipDescriptor[];
	entityBeingParsed: ParsedEntityDescriptor | null;
	statementResultToLineMap: Map<ParsedStatementResult, number>;
}

interface ParseResult {
	model: ParsedEntityRelationshipModel;
	statementResultToLineMap: Map<ParsedStatementResult, number>;
}

export default class EntityRelationshipModelParser {

	private readonly config: EntityRelationshipModelParserConfig;
	private readonly validator: ParsedEntityRelationshipModelValidator;
	private readonly parsedModelToPublicModelConverter: ParsedModelToPublicModelConverter;

	constructor(config?: Partial<EntityRelationshipModelParserConfig>) {
		this.config = entityRelationshipModelParserConfigManager.mergeWithDefaultConfig(config);
		this.validator = new ParsedEntityRelationshipModelValidator(this.config.allowUnknownEntities);
		this.parsedModelToPublicModelConverter = new ParsedModelToPublicModelConverter();
	}

	public parseModel(code: string): EntityRelationshipModel {
		const {
			model,
			statementResultToLineMap
		} = this.parseModelWithoutValidation(code);
		try {
			this.validator.validateParsedModel(model);
		} catch (error) {
			this.handleValidationError(error, statementResultToLineMap);
		}
		return this.parsedModelToPublicModelConverter.convertParsedModelToPublicModel(model);
	}

	private parseModelWithoutValidation(code: string): ParseResult {

		const lines = code.split('\n');

		const state: ParseState = {
			entities: [],
			relationships: [],
			entityBeingParsed: null,
			statementResultToLineMap: new Map<ParsedStatementResult, number>()
		};

		lines.forEach((line, lineIndex) => {
			try {
				this.parseLine(line, lineIndex, state);
			} catch (error) {
				this.handleLineError(error, lineIndex);
			}
		});

		return {
			model: {
				entities: state.entities,
				relationships: state.relationships
			},
			statementResultToLineMap: state.statementResultToLineMap
		};

	}

	private parseLine(line: string, lineIndex: number, state: ParseState) {

		const statementType = guessStatementType(line);

		switch (statementType) {
			case StatementType.ENTITY_NAME:

				const entityDescriptor: ParsedEntityDescriptor = {
					name: parseEntityNameStatement(line),
					properties: []
				};

				state.entities.push(entityDescriptor);
				state.entityBeingParsed = entityDescriptor;
				state.statementResultToLineMap.set(entityDescriptor, lineIndex);

				break;
			case StatementType.ENTITY_PROPERTY:

				if (state.entityBeingParsed == null) {
					throw new ERDiagramSyntaxError('Unexpected entity property statement');
				}

				const entityPropertyDescriptor = parseEntityPropertyStatement(line);

				state.entityBeingParsed.properties.push(entityPropertyDescriptor);
				state.statementResultToLineMap.set(entityPropertyDescriptor, lineIndex);

				break;
			case StatementType.RELATIONSHIP:

				const relationshipDescriptor = parseRelationshipStatement(line);

				state.relationships.push(relationshipDescriptor);
				state.entityBeingParsed = null;
				state.statementResultToLineMap.set(relationshipDescriptor, lineIndex);

				break;
			case StatementType.BLANK_LINE:
				// Ignore
				break;
			default:
				throw new ERDiagramSyntaxError(`Unknown statement type`);
		}

	}

	private handleLineError(error: Error, lineIndex: number): never {

		if (error instanceof ERDiagramError) {
			throw new ERDiagramParseLineError(error, lineIndex);
		}

		throw error;

	}

	private handleValidationError(error: Error, statementResultToLineMap: Map<ParsedStatementResult, number>): never {

		if (error instanceof ERDiagramParseLineError) {
			throw error;
		}

		if (error instanceof ERDiagramEntityPropertyError) {
			throw new ERDiagramParseLineError(error, statementResultToLineMap.get(error.property)!);
		}

		if (error instanceof ERDiagramEntityError) {
			throw new ERDiagramParseLineError(error, statementResultToLineMap.get(error.entity)!);
		}

		if (error instanceof ERDiagramRelationshipError) {
			throw new ERDiagramParseLineError(error, statementResultToLineMap.get(error.relationship)!);
		}

		throw error;

	}

}
