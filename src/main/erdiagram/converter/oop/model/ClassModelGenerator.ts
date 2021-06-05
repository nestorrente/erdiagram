import {ClassModel} from '@/erdiagram/converter/oop/model/class-model-types';
import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import ClassModelConfig, {PartialClassModelConfig} from '@/erdiagram/converter/oop/model/config/ClassModelConfig';
import classModelConfigManager from '@/erdiagram/converter/oop/model/config/ClassModelConfigManager';
import EntityToClassMapper from '@/erdiagram/converter/oop/model/class/EntityToClassMapper';

export default class ClassModelGenerator {

	private readonly config: ClassModelConfig;
	private readonly entityToClassMapper: EntityToClassMapper;

	constructor(config?: PartialClassModelConfig) {
		this.config = classModelConfigManager.mergeWithDefaultConfig(config);
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
