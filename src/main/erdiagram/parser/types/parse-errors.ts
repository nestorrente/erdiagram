import {RelationshipMember} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {
	ParsedEntityDescriptor,
	ParsedEntityPropertyDescriptor,
	ParsedRelationshipDescriptor
} from '@/erdiagram/parser/types/parsed-entity-relationship-model-types';

export class ERDiagramError extends Error {

}

export class ERDiagramParseLineError extends ERDiagramError {

	constructor(
			private readonly cause: ERDiagramError,
			public readonly lineIndex: number
	) {
		super(cause.message);
	}

	get lineNumber() {
		return this.lineIndex + 1;
	}

}

export class ERDiagramSyntaxError extends ERDiagramError {

}

export class ERDiagramUnknownTypeError extends ERDiagramError {

}

export class ERDiagramRelationshipError extends ERDiagramError {

	constructor(
			message: string,
			public readonly relationship: ParsedRelationshipDescriptor
	) {
		super(message);
	}

}

export class ERDiagramUnknownEntityError extends ERDiagramRelationshipError {

	constructor(
			message: string,
			relationship: ParsedRelationshipDescriptor,
			public readonly member: RelationshipMember
	) {
		super(message, relationship);
	}

}

export class ERDiagramEntityError extends ERDiagramError {

	constructor(
			message: string,
			public readonly entity: ParsedEntityDescriptor
	) {
		super(message);
	}

}

export class ERDiagramDuplicatedEntityNameError extends ERDiagramEntityError {

}

export class ERDiagramEntityPropertyError extends ERDiagramEntityError {

	constructor(
			message: string,
			entity: ParsedEntityDescriptor,
			public readonly property: ParsedEntityPropertyDescriptor
	) {
		super(message, entity);
	}

}

export class ERDiagramMultipleIdentitiesError extends ERDiagramEntityPropertyError {

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

export class ERDiagramInvalidIdentityDefinitionError extends ERDiagramEntityPropertyError {

}

export class ERDiagramDuplicatedPropertyNameError extends ERDiagramEntityPropertyError {

}
