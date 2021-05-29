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
import SourceFileInfo from '@/erdiagram/converter/common/SourceFileInfo';
import JavaClassModelSourceFilesGenerator
	from '@/erdiagram/converter/oop/code-converter/java/code/JavaClassModelSourceFilesGenerator';
import EntityRelationshipModelToSourceFilesConverter
	from '@/erdiagram/converter/EntityRelationshipModelToSourceFilesConverter';
import {JavaClassModel} from '@/erdiagram/converter/oop/code-converter/java/model/java-class-model-types';

export default class EntityRelationshipModelToJavaCodeConverter
		implements EntityRelationshipModelToCodeConverter, EntityRelationshipModelToSourceFilesConverter {

	readonly #classModelGenerator: ClassModelGenerator;
	readonly #javaClassModelGenerator: JavaClassModelGenerator;
	readonly #javaClassModelTransformers: JavaClassModelTransformer[];
	readonly #javaClassModelCodeGenerator: JavaClassModelCodeGenerator;
	readonly #javaClassModelSourceFilesGenerator: JavaClassModelSourceFilesGenerator;

	constructor(
			classModelGenerator: ClassModelGenerator,
			javaClassModelGenerator: JavaClassModelGenerator,
			javaClassModelTransformers: JavaClassModelTransformer[],
			javaClassModelCodeGenerator: JavaClassModelCodeGenerator,
			javaClassModelSourceFilesGenerator: JavaClassModelSourceFilesGenerator
	) {
		this.#classModelGenerator = classModelGenerator;
		this.#javaClassModelGenerator = javaClassModelGenerator;
		this.#javaClassModelTransformers = javaClassModelTransformers;
		this.#javaClassModelCodeGenerator = javaClassModelCodeGenerator;
		this.#javaClassModelSourceFilesGenerator = javaClassModelSourceFilesGenerator;
	}

	convertToCode(entityRelationshipModel: EntityRelationshipModel): string {
		const javaClassModel = this.getJavaClassModel(entityRelationshipModel);

		return this.#javaClassModelCodeGenerator.generateCode(javaClassModel);

	}

	convertToSourceFiles(model: EntityRelationshipModel): SourceFileInfo[] {
		// TODO implement
		return [];
	}

	private getJavaClassModel(entityRelationshipModel: EntityRelationshipModel): JavaClassModel {

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

		return javaClassModel;

	}

	static withDefaultConfig() {
		return this.builder().build();
	}

	static builder() {
		return new EntityRelationshipModelToJavaCodeConverterBuilder();
	}

}
