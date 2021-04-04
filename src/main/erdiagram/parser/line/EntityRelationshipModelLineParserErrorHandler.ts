import {ERDiagramError, ERDiagramParseLineError} from '@/erdiagram/parser/types/parse-errors';

export default class EntityRelationshipModelLineParserErrorHandler {

	public handleLineError(error: Error, lineIndex: number): never {

		/* istanbul ignore else */
		if (error instanceof ERDiagramError) {
			throw new ERDiagramParseLineError(error, lineIndex);
		}

		/* istanbul ignore next */
		throw error;

	}

}
