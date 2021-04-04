import {ClassModel} from '@/erdiagram/generator/oop/model/class-model-types';
import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import ClassModelGeneratorConfig from '@/erdiagram/generator/oop/model/config/ClassModelGeneratorConfig';
import classModelGeneratorConfigManager from '@/erdiagram/generator/oop/model/config/ClassModelGeneratorConfigManager';
import EntityToClassMapper from '@/erdiagram/generator/oop/model/class/EntityToClassMapper';

export default class ClassModelGenerator {

	private readonly config: ClassModelGeneratorConfig;
	private readonly entityToClassMapper: EntityToClassMapper;

	constructor(config?: Partial<ClassModelGeneratorConfig>) {
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
