import {
	ERDiagramEntityError,
	ERDiagramEntityPropertyError,
	ERDiagramParseLineError,
	ERDiagramRelationshipError
} from '@/erdiagram/parser/types/parse-errors';
import {ParsedStatementResult} from '@/erdiagram/parser/types/parsed-entity-relationship-model-types';

export default class EntityRelationshipModelParseResultValidatorErrorHandler {

	public handleValidationError(error: Error, statementResultToLineMap: Map<ParsedStatementResult, number>): never {

		if (error instanceof ERDiagramEntityPropertyError) {
			throw new ERDiagramParseLineError(error, statementResultToLineMap.get(error.property)!);
		}

		if (error instanceof ERDiagramEntityError) {
			throw new ERDiagramParseLineError(error, statementResultToLineMap.get(error.entity)!);
		}

		/* istanbul ignore else */
		if (error instanceof ERDiagramRelationshipError) {
			throw new ERDiagramParseLineError(error, statementResultToLineMap.get(error.relationship)!);
		}

		/* istanbul ignore next */
		throw error;

	}

}
