import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';
import JavaEntityRelationshipModelSourceCodeGeneratorBuilder
	from '@/erdiagram/converter/oop/code-converter/java/JavaEntityRelationshipModelSourceCodeGeneratorBuilder';
import EntityRelationshipModelSourceCodeGenerator
	from '@/erdiagram/converter/EntityRelationshipModelSourceCodeGenerator';
import TypeScriptClassModelToCodeConverter
	from '@/erdiagram/converter/oop/code-converter/typescript/TypeScriptClassModelToCodeConverter';

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
		return new JavaEntityRelationshipModelSourceCodeGeneratorBuilder();
	}

}
