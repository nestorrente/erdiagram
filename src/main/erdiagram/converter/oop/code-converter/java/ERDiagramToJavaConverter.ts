import AbstractERDiagramToCodeConverter from '@/erdiagram/converter/AbstractERDiagramToCodeConverter';
import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';
import JavaClassModelToCodeConverter from '@/erdiagram/converter/oop/code-converter/java/JavaClassModelToCodeConverter';

export default class ERDiagramToJavaConverter extends AbstractERDiagramToCodeConverter {

	private readonly classModelGenerator: ClassModelGenerator;

	constructor() {
		super();
		this.classModelGenerator = new ClassModelGenerator({});
		const javaClassModelToCodeConverter = new JavaClassModelToCodeConverter({});
	}

	protected convertModel(erModel: EntityRelationshipModel): string {
		this.classModelGenerator.generateClassModel(erModel);
		return '';
	}

}
