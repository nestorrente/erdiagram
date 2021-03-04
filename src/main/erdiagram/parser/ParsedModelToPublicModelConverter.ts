import {
	EntityDescriptor,
	EntityPropertyDescriptor,
	EntityPropertyType,
	EntityRelationshipModel
} from '@/erdiagram/parser/entity-relationship-model-types';
import {
	ParsedEntityDescriptor,
	ParsedEntityRelationshipModel
} from '@/erdiagram/parser/parsed-entity-relationship-model-types';

export default class ParsedModelToPublicModelConverter {

	public convertParsedModelToPublicModel(parsedModel: ParsedEntityRelationshipModel): EntityRelationshipModel {
		return {
			entities: parsedModel.entities.map(parsedEntity => this.convertParsedEntityToPublicEntity(parsedEntity)),
			relationships: parsedModel.relationships
		};
	}

	private convertParsedEntityToPublicEntity(parsedEntity: ParsedEntityDescriptor): EntityDescriptor {

		const identifierProperty = this.getEntityIdentifierProperty(parsedEntity);

		return {
			name: parsedEntity.name,
			identifierPropertyName: identifierProperty?.name,
			properties: parsedEntity.properties.filter(property => property != identifierProperty)
		};

	}

	private getEntityIdentifierProperty(parsedEntity: ParsedEntityDescriptor): EntityPropertyDescriptor | undefined {
		return parsedEntity.properties.find(property => property.type === EntityPropertyType.IDENTIFIER);
	}

}
