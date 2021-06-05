import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';
import SourceCodeGenerator from '@/erdiagram/converter/SourceCodeGenerator';
import TypeScriptClassModelToCodeConverter
	from '@/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptClassModelToCodeConverter';
import TypeScriptSourceCodeGeneratorBuilder
	from '@/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptSourceCodeGeneratorBuilder';

export default class TypeScriptSourceCodeGenerator implements SourceCodeGenerator {

	private readonly _classModelGenerator: ClassModelGenerator;
	private readonly _typeScriptClassModelToCodeConverter: TypeScriptClassModelToCodeConverter;

	constructor(
			classModelGenerator: ClassModelGenerator,
			typeScriptClassModelToCodeConverter: TypeScriptClassModelToCodeConverter
	) {
		this._classModelGenerator = classModelGenerator;
		this._typeScriptClassModelToCodeConverter = typeScriptClassModelToCodeConverter;
	}

	generateSourceCode(entityRelationshipModel: EntityRelationshipModel): string {
		const classModel = this._classModelGenerator.generateClassModel(entityRelationshipModel);
		return this._typeScriptClassModelToCodeConverter.convertToCode(classModel);
	}

	static withDefaultConfig() {
		return this.builder().build();
	}

	static builder() {
		return new TypeScriptSourceCodeGeneratorBuilder();
	}

}
