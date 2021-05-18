import ERDiagramEntityPropertyError from '@/erdiagram/parser/types/error/ERDiagramEntityPropertyError';
import {
	ParsedEntityDescriptor,
	ParsedEntityPropertyDescriptor
} from '@/erdiagram/parser/types/parsed-entity-relationship-model-types';

export default class ERDiagramMultipleIdentitiesError extends ERDiagramEntityPropertyError {

	public readonly identityProperties: ParsedEntityPropertyDescriptor[];

	constructor(
			message: string,
			entity: ParsedEntityDescriptor,
			identityProperties: ParsedEntityPropertyDescriptor[]
	) {
		const firstDuplicateApparition = identityProperties[1];
		super(message, entity, firstDuplicateApparition);
		this.identityProperties = identityProperties;
	}

}
