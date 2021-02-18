import {
	parseEntityNameStatement,
	parseEntityPropertyStatement,
	parseRelationshipStatement
} from '@/erdiagram/parser/statement/statement-types-parse-functions';
import {guessStatementType, StatementType} from '@/erdiagram/parser/statement/statement-type-guesser';
import {
	EntityDescriptor,
	EntityRelationshipModel,
	RelationshipDescriptor
} from '@/erdiagram/parser/entity-relationship-model-types';
import EntityRelationshipModelParserConfig from '@/erdiagram/parser/config/EntityRelationshipModelParserConfig';
import EntityRelationshipModelValidator from '@/erdiagram/parser/validator/EntityRelationshipModelValidator';
import entityRelationshipModelParserConfigManager
	from '@/erdiagram/parser/config/EntityRelationshipModelParserConfigManager';
import {ERDiagramSyntaxError} from '@/erdiagram/parser/errors';

export default class EntityRelationshipModelParser {

	private readonly config: EntityRelationshipModelParserConfig;
	private readonly validator: EntityRelationshipModelValidator;

	constructor(config?: Partial<EntityRelationshipModelParserConfig>) {
		this.config = entityRelationshipModelParserConfigManager.mergeWithDefaultConfig(config);
		this.validator = new EntityRelationshipModelValidator(this.config.allowUnknownEntities);
	}

	public parseModel(code: string): EntityRelationshipModel {
		const model = this.parseModelWithoutValidation(code);
		this.validator.validateModel(model);
		return model;
	}

	private parseModelWithoutValidation(code: string): EntityRelationshipModel {

		const lines = code.split('\n');

		const entities: EntityDescriptor[] = [];
		const relationships: RelationshipDescriptor[] = [];

		let parsingEntity = false;

		lines.forEach(line => {

			const statementType = guessStatementType(line);

			switch (statementType) {
				case StatementType.ENTITY_NAME:
					entities.push({
						name: parseEntityNameStatement(line),
						properties: []
					});
					parsingEntity = true;
					break;
				case StatementType.ENTITY_PROPERTY:
					if (!parsingEntity) {
						throw new ERDiagramSyntaxError('Unexpected entity property statement');
					}
					const lastEntity = entities[entities.length - 1];
					const entityPropertyDescriptor = parseEntityPropertyStatement(line);
					lastEntity.properties.push(entityPropertyDescriptor);
					break;
				case StatementType.RELATIONSHIP:
					const relationshipDescriptor = parseRelationshipStatement(line);
					relationships.push(relationshipDescriptor);
					parsingEntity = false;
					break;
				case StatementType.BLANK_LINE:
				case StatementType.COMMENT:
					// Ignore
					break;
				default:
					throw new ERDiagramSyntaxError(`Unknown statement type (${statementType}) for line: ${line}`);
			}

		});

		return {
			entities,
			relationships
		};

	}

}
