import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import EntityRelationshipModelParserConfig from '@/erdiagram/parser/config/EntityRelationshipModelParserConfig';
import EntityRelationshipModelParseResultValidator
	from '@/erdiagram/parser/validator/EntityRelationshipModelParseResultValidator';
import entityRelationshipModelParserConfigManager
	from '@/erdiagram/parser/config/EntityRelationshipModelParserConfigManager';
import ParsedModelToPublicModelConverter from '@/erdiagram/parser/ParsedModelToPublicModelConverter';
import EntityRelationshipModelParserWithoutValidation
	from '@/erdiagram/parser/EntityRelationshipModelParserWithoutValidation';

export default class EntityRelationshipModelParser {

	private readonly config: EntityRelationshipModelParserConfig;
	private readonly entityRelationshipModelParserWithoutValidation: EntityRelationshipModelParserWithoutValidation;
	private readonly validator: EntityRelationshipModelParseResultValidator;
	private readonly parsedModelToPublicModelConverter: ParsedModelToPublicModelConverter;

	constructor(config?: Partial<EntityRelationshipModelParserConfig>) {
		this.config = entityRelationshipModelParserConfigManager.mergeWithDefaultConfig(config);
		this.entityRelationshipModelParserWithoutValidation = new EntityRelationshipModelParserWithoutValidation();
		this.validator = new EntityRelationshipModelParseResultValidator(this.config.allowUnknownEntities);
		this.parsedModelToPublicModelConverter = new ParsedModelToPublicModelConverter();
	}

	public parseModel(code: string): EntityRelationshipModel {

		const parseResult = this.entityRelationshipModelParserWithoutValidation.parseModelWithoutValidation(code);

		this.validator.validateParseResult(parseResult);

		return this.parsedModelToPublicModelConverter.convertParsedModelToPublicModel(parseResult.model);

	}

}
