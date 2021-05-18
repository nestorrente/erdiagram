import ERDiagramError from '@/erdiagram/parser/types/error/ERDiagramError';
import {ParsedEntityDescriptor} from '@/erdiagram/parser/types/parsed-entity-relationship-model-types';

export default class ERDiagramEntityError extends ERDiagramError {

	constructor(
			message: string,
			public readonly entity: ParsedEntityDescriptor
	) {
		super(message);
	}

}
