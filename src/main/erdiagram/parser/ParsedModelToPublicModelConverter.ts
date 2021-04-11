import {
	EntityDescriptor,
	EntityPropertyDescriptor,
	EntityPropertyType,
	EntityRelationshipModel
} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {
	ParsedEntityDescriptor,
	ParsedEntityRelationshipModel
} from '@/erdiagram/parser/types/parsed-entity-relationship-model-types';

export default class ParsedModelToPublicModelConverter {

	public convertParsedModelToPublicModel(parsedModel: ParsedEntityRelationshipModel): EntityRelationshipModel {
		return {
			entities: parsedModel.entities.map(parsedEntity => this.convertParsedEntityToPublicEntity(parsedEntity)),
			relationships: parsedModel.relationships
		};
	}

	private convertParsedEntityToPublicEntity(parsedEntity: ParsedEntityDescriptor): EntityDescriptor {

		const identityProperty = this.getEntityIdentityProperty(parsedEntity);

		return {
			name: parsedEntity.name,
			identityPropertyName: identityProperty?.name,
			properties: parsedEntity.properties.filter(property => property != identityProperty)
		};

	}

	private getEntityIdentityProperty(parsedEntity: ParsedEntityDescriptor): EntityPropertyDescriptor | undefined {
		return parsedEntity.properties.find(property => property.type === EntityPropertyType.IDENTITY);
	}

}
