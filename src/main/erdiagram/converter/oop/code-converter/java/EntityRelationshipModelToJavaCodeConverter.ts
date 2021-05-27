import EntityRelationshipModelToCodeConverter from '@/erdiagram/converter/EntityRelationshipModelToCodeConverter';
import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';
import JavaClassModelTransformer
	from '@/erdiagram/converter/oop/code-converter/java/model/transformer/JavaClassModelTransformer';
import JavaClassModelGenerator
	from '@/erdiagram/converter/oop/code-converter/java/model/generator/JavaClassModelGenerator';
import JavaClassModelCodeGenerator
	from '@/erdiagram/converter/oop/code-converter/java/code/JavaClassModelCodeGenerator';
import ApplyTransformersCommand
	from '@/erdiagram/converter/oop/code-converter/java/model/transformer/ApplyTransformersCommand';
import {SetupContext} from '@/erdiagram/converter/oop/code-converter/java/model/transformer/java-class-model-transformer-context-types';
import EntityRelationshipModelToJavaCodeConverterBuilder
	from '@/erdiagram/converter/oop/code-converter/java/EntityRelationshipModelToJavaCodeConverterBuilder';

export default class EntityRelationshipModelToJavaCodeConverter implements EntityRelationshipModelToCodeConverter {

	readonly #classModelGenerator: ClassModelGenerator;
	readonly #javaClassModelGenerator: JavaClassModelGenerator;
	readonly #javaClassModelTransformers: JavaClassModelTransformer[];
	readonly #javaClassModelCodeGenerator: JavaClassModelCodeGenerator;

	constructor(
			classModelGenerator: ClassModelGenerator,
			javaClassModelGenerator: JavaClassModelGenerator,
			javaClassModelTransformers: JavaClassModelTransformer[]
	) {
		this.#classModelGenerator = classModelGenerator;
		this.#javaClassModelGenerator = javaClassModelGenerator;
		this.#javaClassModelTransformers = javaClassModelTransformers;
		this.#javaClassModelCodeGenerator = new JavaClassModelCodeGenerator();
	}

	convertToCode(entityRelationshipModel: EntityRelationshipModel): string {

		const classModel = this.#classModelGenerator.generateClassModel(entityRelationshipModel);

		const {
			javaClassModel,
			javaClassModelDescriptorsRepository
		} = this.#javaClassModelGenerator.generateJavaClassModel(classModel);

		// FIXME too much dependencies?
		const applyTransformersCommandContext: SetupContext = {
			entityRelationshipModel,
			classModel,
			javaClassModel
		};
		new ApplyTransformersCommand(
				applyTransformersCommandContext,
				javaClassModelDescriptorsRepository,
				this.#javaClassModelTransformers
		).execute();

		return this.#javaClassModelCodeGenerator.generateCode(javaClassModel);

	}

	static withDefaultConfig() {
		return this.builder().build();
	}

	static builder() {
		return new EntityRelationshipModelToJavaCodeConverterBuilder();
	}

}
