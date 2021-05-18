import ERDiagramEntityError from '@/erdiagram/parser/types/error/ERDiagramEntityError';
import {
	ParsedEntityDescriptor,
	ParsedEntityPropertyDescriptor
} from '@/erdiagram/parser/types/parsed-entity-relationship-model-types';

export default class ERDiagramEntityPropertyError extends ERDiagramEntityError {

	constructor(
			message: string,
			entity: ParsedEntityDescriptor,
			public readonly property: ParsedEntityPropertyDescriptor
	) {
		super(message, entity);
	}

}
