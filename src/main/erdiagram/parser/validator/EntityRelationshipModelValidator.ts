import {EntityRelationshipModel} from '@/erdiagram/parser/entity-relationship-model-types';
import {ERDiagramUnknownEntityError} from '@/erdiagram/parser/errors';

export default class EntityRelationshipModelValidator {

	constructor(
			private readonly allowUnknownEntities: boolean
	) {

	}

	public validateModel(model: EntityRelationshipModel) {

		if (this.allowUnknownEntities) {
			return;
		}

		const entityNames = model.entities.map(e => e.name);

		model.relationships.forEach(r => {
			if (!entityNames.includes(r.leftMember.entity)) {
				throw new ERDiagramUnknownEntityError(`Uknown entity in relationship's left side: ${r.leftMember.entity}`);
			}
			if (!entityNames.includes(r.rightMember.entity)) {
				throw new ERDiagramUnknownEntityError(`Uknown entity in relationship's right side: ${r.rightMember.entity}`);
			}
		});

	}

}
