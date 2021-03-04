import {RelationshipMember} from '@/erdiagram/parser/entity-relationship-model-types';
import {
	ParsedEntityDescriptor,
	ParsedEntityPropertyDescriptor,
	ParsedRelationshipDescriptor
} from '@/erdiagram/parser/parsed-entity-relationship-model-types';

export class ERDiagramError extends Error {

}

export class ERDiagramParseLineError extends ERDiagramError {

	constructor(
			private readonly cause: ERDiagramError,
			private readonly lineIndex: number
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

export class ERDiagramMultipleIdentifiersError extends ERDiagramEntityPropertyError {

	public readonly identifierProperties: ParsedEntityPropertyDescriptor[];

	constructor(
			message: string,
			entity: ParsedEntityDescriptor,
			identifierProperties: ParsedEntityPropertyDescriptor[]
	) {
		const firstDuplicateApparition = identifierProperties[1];
		super(message, entity, firstDuplicateApparition);
		this.identifierProperties = identifierProperties;
	}

}

export class ERDiagramInvalidIdentifierDefinitionError extends ERDiagramEntityPropertyError {

}

export class ERDiagramDuplicatedPropertyNameError extends ERDiagramEntityPropertyError {

}
