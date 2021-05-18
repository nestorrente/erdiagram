import ERDiagramError from '@/erdiagram/parser/types/error/ERDiagramError';
import {ParsedRelationshipDescriptor} from '@/erdiagram/parser/types/parsed-entity-relationship-model-types';

export default class ERDiagramRelationshipError extends ERDiagramError {

	constructor(
			message: string,
			public readonly relationship: ParsedRelationshipDescriptor
	) {
		super(message);
	}

}
