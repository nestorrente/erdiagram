import {ClassModel} from '@/erdiagram/converter/oop/model/class-model-types';
import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import ClassModelGeneratorConfig, {PartialClassModelGeneratorConfig} from '@/erdiagram/converter/oop/model/config/ClassModelGeneratorConfig';
import classModelGeneratorConfigManager from '@/erdiagram/converter/oop/model/config/ClassModelGeneratorConfigManager';
import EntityToClassMapper from '@/erdiagram/converter/oop/model/class/EntityToClassMapper';

export default class ClassModelGenerator {

	private readonly config: ClassModelGeneratorConfig;
	private readonly entityToClassMapper: EntityToClassMapper;

	constructor(config?: PartialClassModelGeneratorConfig) {
		this.config = classModelGeneratorConfigManager.mergeWithDefaultConfig(config);
		this.entityToClassMapper = new EntityToClassMapper(this.config);
	}

	generateClassModel(model: EntityRelationshipModel): ClassModel {

		const {
			entities,
			relationships
		} = model;

		const classes = entities.map(entity => this.entityToClassMapper.mapEntityToClass(entity, relationships));

		return {
			classes
		};

	}

};
