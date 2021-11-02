import ERDiagramError from '@/erdiagram/parser/types/error/ERDiagramError';
import ERDiagramParseLineError from '@/erdiagram/parser/types/error/ERDiagramParseLineError';

export default class EntityRelationshipModelLineParserErrorHandler {

	public handleLineError(error: unknown, lineIndex: number): never {

		/* istanbul ignore else */
		if (error instanceof ERDiagramError) {
			throw new ERDiagramParseLineError(error, lineIndex);
		}

		/* istanbul ignore next */
		throw error;

	}

}
