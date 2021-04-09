import EntityRelationshipModelToCodeConverter from '@/erdiagram/converter/EntityRelationshipModelToCodeConverter';
import ClassModelToCodeConverter from '@/erdiagram/converter/oop/code-converter/ClassModelToCodeConverter';
import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';

export default class EntityRelationshipModelToClassCodeConverter implements EntityRelationshipModelToCodeConverter {

	constructor(
			private readonly classModelGenerator: ClassModelGenerator,
			private readonly classModelToCodeConverter: ClassModelToCodeConverter
	) {

	}

	public convertToCode(entityRelationshipModel: EntityRelationshipModel): string {
		const classModel = this.classModelGenerator.generateClassModel(entityRelationshipModel);
		return this.classModelToCodeConverter.convertToCode(classModel);
	}

}
