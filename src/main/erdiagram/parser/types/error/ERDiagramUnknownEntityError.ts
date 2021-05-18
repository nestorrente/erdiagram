import ERDiagramRelationshipError from '@/erdiagram/parser/types/error/ERDiagramRelationshipError';
import {ParsedRelationshipDescriptor} from '@/erdiagram/parser/types/parsed-entity-relationship-model-types';
import {RelationshipMember} from '@/erdiagram/parser/types/entity-relationship-model-types';

export default class ERDiagramUnknownEntityError extends ERDiagramRelationshipError {

	constructor(
			message: string,
			relationship: ParsedRelationshipDescriptor,
			public readonly member: RelationshipMember
	) {
		super(message, relationship);
	}

}
