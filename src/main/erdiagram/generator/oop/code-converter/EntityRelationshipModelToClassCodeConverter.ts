import EntityRelationshipModelToCodeConverter from '@/erdiagram/generator/EntityRelationshipModelToCodeConverter';
import ClassModelToCodeConverter from '@/erdiagram/generator/oop/code-converter/ClassModelToCodeConverter';
import {EntityRelationshipModel} from '@/erdiagram/parser/entity-relationship-model-types';
import ClassModelGenerator from '@/erdiagram/generator/oop/model/ClassModelGenerator';

export default class EntityRelationshipModelToClassCodeConverter implements EntityRelationshipModelToCodeConverter {

	constructor(
			private readonly classModelGenerator: ClassModelGenerator,
			private readonly classModelToCodeConverter: ClassModelToCodeConverter
	) {

	}

	public generateCode(entityRelationshipModel: EntityRelationshipModel): string {
		const classModel = this.classModelGenerator.generateClassModel(entityRelationshipModel);
		return this.classModelToCodeConverter.generateCode(classModel);
	}

}
