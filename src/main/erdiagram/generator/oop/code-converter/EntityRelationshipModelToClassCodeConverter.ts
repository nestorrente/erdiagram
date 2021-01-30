import {EntityRelationshipModel} from '@/erdiagram/parser/er-model-parser';
import EntityRelationshipModelToCodeConverter from '@/erdiagram/generator/entity-relationship-to-code-converter';
import ClassModelToCodeConverter from '@/erdiagram/generator/oop/code-converter/ClassModelToCodeConverter';
import classModelGenerator from '@/erdiagram/generator/oop/class-model/ClassModelGenerator';

export default class EntityRelationshipModelToClassCodeConverter implements EntityRelationshipModelToCodeConverter {

	private readonly classModelToCodeConverter: ClassModelToCodeConverter;

	constructor(classModelToCodeConverter: ClassModelToCodeConverter) {
		this.classModelToCodeConverter = classModelToCodeConverter;
	}

	public generateCode(entityRelationshipModel: EntityRelationshipModel): string {
		const classModel = classModelGenerator.generateClassModel(entityRelationshipModel);
		return this.classModelToCodeConverter.generateCode(classModel);
	}

}
