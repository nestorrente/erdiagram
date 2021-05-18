import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {
	EntityRelationshipModelParseResult,
	ParsedEntityRelationshipModel
} from '@/erdiagram/parser/types/parsed-entity-relationship-model-types';
import EntityRelationshipModelParseResultValidatorErrorHandler
	from '@/erdiagram/parser/validator/EntityRelationshipModelParseResultValidatorErrorHandler';
import ERDiagramUnknownEntityError from '@/erdiagram/parser/types/error/ERDiagramUnknownEntityError';
import ERDiagramDuplicatedEntityNameError from '@/erdiagram/parser/types/error/ERDiagramDuplicatedEntityNameError';
import ERDiagramMultipleIdentitiesError from '@/erdiagram/parser/types/error/ERDiagramMultipleIdentitiesError';
import ERDiagramInvalidIdentityDefinitionError
	from '@/erdiagram/parser/types/error/ERDiagramInvalidIdentityDefinitionError';
import ERDiagramDuplicatedPropertyNameError from '@/erdiagram/parser/types/error/ERDiagramDuplicatedPropertyNameError';

export default class EntityRelationshipModelParseResultValidator {

	private readonly errorHandler: EntityRelationshipModelParseResultValidatorErrorHandler;

	constructor(
			private readonly allowUnknownEntities: boolean
	) {
		this.errorHandler = new EntityRelationshipModelParseResultValidatorErrorHandler();
	}

	public validateParseResult(parseResult: EntityRelationshipModelParseResult) {

		const {
			model,
			statementResultToLineMap
		} = parseResult;

		try {
			this.validateParsedModel(model);
		} catch (error) {
			this.errorHandler.handleValidationError(error, statementResultToLineMap);
		}

	}

	private validateParsedModel(model: ParsedEntityRelationshipModel) {

		this.validateNonRepeatedEntityNames(model);
		this.validateNonRepeatedPropertyNames(model);
		this.validateIdentityProperties(model);

		if (!this.allowUnknownEntities) {
			this.validateRelationshipsHaveNoUnknownEntities(model);
		}

	}

	private validateNonRepeatedEntityNames(model: ParsedEntityRelationshipModel) {

		const entityNames = new Set<string>();

		model.entities.forEach(entity => {

			const entityName = entity.name;

			if (entityNames.has(entityName)) {
				throw new ERDiagramDuplicatedEntityNameError(
						`Repeated entity "${entityName}"`,
						entity
				);
			}

			entityNames.add(entityName);

		});

	}

	private validateNonRepeatedPropertyNames(model: ParsedEntityRelationshipModel) {

		model.entities.forEach(entity => {

			const entityPropertyNames = new Set<string>();

			entity.properties.forEach(property => {

				const propertyName = property.name;

				if (entityPropertyNames.has(propertyName)) {
					throw new ERDiagramDuplicatedPropertyNameError(
							`Repeated property "${propertyName}" in "${entity.name}" entity`,
							entity,
							property
					);
				}

				entityPropertyNames.add(propertyName);

			});

		});

	}

	private validateIdentityProperties(model: ParsedEntityRelationshipModel) {

		model.entities.forEach(entity => {

			const identityProperties = entity.properties.filter(property => property.type === EntityPropertyType.IDENTITY);

			if (identityProperties.length > 1) {
				throw new ERDiagramMultipleIdentitiesError(
						`Entity ${entity.name} has more than one identity property`,
						entity,
						identityProperties
				);
			}

			const identityProperty = identityProperties[0];

			if (identityProperty != null) {

				if (identityProperty.optional) {
					throw new ERDiagramInvalidIdentityDefinitionError(
							'Optional modifier (?) cannot be used in identity properties',
							entity,
							identityProperty
					);
				}

				if (identityProperty.unique) {
					throw new ERDiagramInvalidIdentityDefinitionError(
							'Unique modifier (!) cannot be used in identity properties',
							entity,
							identityProperty
					);
				}

				if (identityProperty.length.length > 0) {
					throw new ERDiagramInvalidIdentityDefinitionError(
							'Identity properties cannot have a length',
							entity,
							identityProperty
					);
				}

			}

		});

	}

	private validateRelationshipsHaveNoUnknownEntities(model: ParsedEntityRelationshipModel) {

		const entityNames = model.entities.map(e => e.name);

		model.relationships.forEach(relationship => {
			if (!entityNames.includes(relationship.leftMember.entity)) {
				throw new ERDiagramUnknownEntityError(
						`Uknown entity "${relationship.leftMember.entity}" in relationship's left member`,
						relationship,
						relationship.leftMember
				);
			}
			if (!entityNames.includes(relationship.rightMember.entity)) {
				throw new ERDiagramUnknownEntityError(
						`Uknown entity "${relationship.rightMember.entity}" in relationship's right member`,
						relationship,
						relationship.rightMember
				);
			}
		});

	}

}
