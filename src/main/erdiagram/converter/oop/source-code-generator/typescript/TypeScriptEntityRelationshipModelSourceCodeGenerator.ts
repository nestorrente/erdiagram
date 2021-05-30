import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';
import EntityRelationshipModelSourceCodeGenerator
	from '@/erdiagram/converter/EntityRelationshipModelSourceCodeGenerator';
import TypeScriptClassModelToCodeConverter
	from '@/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptClassModelToCodeConverter';
import TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder
	from '@/erdiagram/converter/oop/source-code-generator/typescript/TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder';

export default class TypeScriptEntityRelationshipModelSourceCodeGenerator
		implements EntityRelationshipModelSourceCodeGenerator {

	readonly #classModelGenerator: ClassModelGenerator;
	readonly #typeScriptClassModelToCodeConverter: TypeScriptClassModelToCodeConverter;

	constructor(
			classModelGenerator: ClassModelGenerator,
			typeScriptClassModelToCodeConverter: TypeScriptClassModelToCodeConverter
	) {
		this.#classModelGenerator = classModelGenerator;
		this.#typeScriptClassModelToCodeConverter = typeScriptClassModelToCodeConverter;
	}

	generateSourceCode(entityRelationshipModel: EntityRelationshipModel): string {
		const classModel = this.#classModelGenerator.generateClassModel(entityRelationshipModel);
		return this.#typeScriptClassModelToCodeConverter.convertToCode(classModel);
	}

	static withDefaultConfig() {
		return this.builder().build();
	}

	static builder() {
		return new TypeScriptEntityRelationshipModelSourceCodeGeneratorBuilder();
	}

}
