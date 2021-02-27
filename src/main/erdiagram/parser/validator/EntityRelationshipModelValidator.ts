import {EntityRelationshipModel} from '@/erdiagram/parser/entity-relationship-model-types';
import {ERDiagramDuplicatedPropertyNameError, ERDiagramUnknownEntityError} from '@/erdiagram/parser/errors';

export default class EntityRelationshipModelValidator {

	constructor(
			private readonly allowUnknownEntities: boolean
	) {

	}

	public validateModel(model: EntityRelationshipModel) {

		if (!this.allowUnknownEntities) {
			this.validateRelationshipsHaveNoUnknownEntities(model);
		}

		this.validateNonRepeatedPropertyNames(model);

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

	private validateNonRepeatedPropertyNames(model: EntityRelationshipModel) {

		model.entities.forEach(entity => {

			const entityPropertyNames = new Set<string>();

			if (entity.identifierPropertyName) {
				entityPropertyNames.add(entity.identifierPropertyName);
			}

			entity.properties.forEach(property => {

				const propertyName = property.name;

				if (entityPropertyNames.has(propertyName)) {
					throw new ERDiagramDuplicatedPropertyNameError(`Repeated property "${propertyName}" in "${entity.name}" entity`);
				}

				entityPropertyNames.add(propertyName);

			});

		});

	}

}
