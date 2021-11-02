import {ParsedStatementResult} from '@/erdiagram/parser/types/parsed-entity-relationship-model-types';
import ERDiagramParseLineError from '@/erdiagram/parser/types/error/ERDiagramParseLineError';
import ERDiagramRelationshipError from '@/erdiagram/parser/types/error/ERDiagramRelationshipError';
import ERDiagramEntityError from '@/erdiagram/parser/types/error/ERDiagramEntityError';
import ERDiagramEntityPropertyError from '@/erdiagram/parser/types/error/ERDiagramEntityPropertyError';

export default class EntityRelationshipModelParseResultValidatorErrorHandler {

	public handleValidationError(error: unknown, statementResultToLineMap: Map<ParsedStatementResult, number>): never {

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
