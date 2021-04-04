import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {
	ERDiagramDuplicatedEntityNameError,
	ERDiagramDuplicatedPropertyNameError,
	ERDiagramInvalidIdentifierDefinitionError,
	ERDiagramMultipleIdentifiersError,
	ERDiagramUnknownEntityError
} from '@/erdiagram/parser/types/parse-errors';
import {
	EntityRelationshipModelParseResult,
	ParsedEntityRelationshipModel
} from '@/erdiagram/parser/types/parsed-entity-relationship-model-types';
import EntityRelationshipModelParseResultValidatorErrorHandler
	from '@/erdiagram/parser/validator/EntityRelationshipModelParseResultValidatorErrorHandler';

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
		} catch(error) {
			this.errorHandler.handleValidationError(error, statementResultToLineMap);
		}

	}

	private validateParsedModel(model: ParsedEntityRelationshipModel) {

		this.validateNonRepeatedEntityNames(model);
		this.validateNonRepeatedPropertyNames(model);
		this.validateIdentifierProperties(model);

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

	private validateIdentifierProperties(model: ParsedEntityRelationshipModel) {

		model.entities.forEach(entity => {

			const identifierProperties = entity.properties.filter(property => property.type === EntityPropertyType.IDENTIFIER);

			if (identifierProperties.length > 1) {
				throw new ERDiagramMultipleIdentifiersError(
						`Entity ${entity.name} has more than one identifier property`,
						entity,
						identifierProperties
				);
			}

			const identifierProperty = identifierProperties[0];

			if (identifierProperty != null) {

				if (identifierProperty.autoincremental) {
					throw new ERDiagramInvalidIdentifierDefinitionError(
							'Autoincremental modifier (+) cannot be used in identifier properties',
							entity,
							identifierProperty
					);
				}

				if (identifierProperty.optional) {
					throw new ERDiagramInvalidIdentifierDefinitionError(
							'Optional modifier (?) cannot be used in identifier properties',
							entity,
							identifierProperty
					);
				}

				if (identifierProperty.unique) {
					throw new ERDiagramInvalidIdentifierDefinitionError(
							'Unique modifier (!) cannot be used in identifier properties',
							entity,
							identifierProperty
					);
				}

				if (identifierProperty.length.length > 0) {
					throw new ERDiagramInvalidIdentifierDefinitionError(
							'Identifier properties cannot have a length',
							entity,
							identifierProperty
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
