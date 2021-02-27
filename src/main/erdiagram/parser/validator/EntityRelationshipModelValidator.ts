import {EntityRelationshipModel} from '@/erdiagram/parser/entity-relationship-model-types';
import {ERDiagramUnknownEntityError} from '@/erdiagram/parser/errors';

export default class EntityRelationshipModelValidator {

	constructor(
			private readonly allowUnknownEntities: boolean
	) {

	}

	public validateModel(model: EntityRelationshipModel) {
		if (!this.allowUnknownEntities) {
			this.validateRelationshipsHaveNoUnknownEntities(model);
		}
	}

	private validateRelationshipsHaveNoUnknownEntities(model: EntityRelationshipModel) {

		const entityNames = model.entities.map(e => e.name);

		model.relationships.forEach(relationship => {
			if (!entityNames.includes(relationship.leftMember.entity)) {
				throw new ERDiagramUnknownEntityError(`Uknown entity in relationship's left side: ${relationship.leftMember.entity}`);
			}
			if (!entityNames.includes(relationship.rightMember.entity)) {
				throw new ERDiagramUnknownEntityError(`Uknown entity in relationship's right side: ${relationship.rightMember.entity}`);
			}
		});

	}

}
