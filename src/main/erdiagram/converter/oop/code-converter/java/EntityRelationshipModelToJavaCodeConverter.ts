import EntityRelationshipModelToCodeConverter from '@/erdiagram/converter/EntityRelationshipModelToCodeConverter';
import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';
import JavaClassModelTransformer
	from '@/erdiagram/converter/oop/code-converter/java/model/transformer/JavaClassModelTransformer';
import JavaClassModelGenerator
	from '@/erdiagram/converter/oop/code-converter/java/model/generator/JavaClassModelGenerator';
import JavaClassModelToCodeConverter from '@/erdiagram/converter/oop/code-converter/java/JavaClassModelToCodeConverter';
import ApplyTransformersCommand
	from '@/erdiagram/converter/oop/code-converter/java/model/transformer/ApplyTransformersCommand';
import {PartialClassModelGeneratorConfig} from '@/erdiagram/converter/oop/model/config/ClassModelGeneratorConfig';
import {PartialJavaClassModelGeneratorConfig} from '@/erdiagram/converter/oop/code-converter/java/model/generator/config/JavaClassModelGeneratorConfig';
import {SetupContext} from '@/erdiagram/converter/oop/code-converter/java/model/transformer/java-class-model-transformer-context-types';

// TODO make a builder that allows to specify the config for the different dependencies, then create this object
export default class EntityRelationshipModelToJavaCodeConverter implements EntityRelationshipModelToCodeConverter {

	readonly #classModelGenerator: ClassModelGenerator;
	readonly #javaClassModelGenerator: JavaClassModelGenerator;
	readonly #javaClassModelTransformers: JavaClassModelTransformer[];
	readonly #javaClassModelToCodeConverter: JavaClassModelToCodeConverter;

	constructor(
			classModelGenerator: ClassModelGenerator,
			javaClassModelGenerator: JavaClassModelGenerator,
			javaClassModelTransformers: JavaClassModelTransformer[],
			javaClassModelToCodeConverter: JavaClassModelToCodeConverter
	) {
		this.#classModelGenerator = classModelGenerator;
		this.#javaClassModelGenerator = javaClassModelGenerator;
		this.#javaClassModelTransformers = javaClassModelTransformers;
		this.#javaClassModelToCodeConverter = javaClassModelToCodeConverter;
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

		return this.#javaClassModelToCodeConverter.convertToCode(javaClassModel);

	}

	static withDefaultConfig() {
		return this.builder().build();
	}

	static builder() {
		return new EntityRelationshipModelToJavaCodeConverterBuilder();
	}

}

export class EntityRelationshipModelToJavaCodeConverterBuilder {

	#classModelGeneratorConfig: PartialClassModelGeneratorConfig = {};
	#javaClassModelGeneratorConfig: PartialJavaClassModelGeneratorConfig = {};
	#javaClassModelTransformers: JavaClassModelTransformer[] = [];
	// FIXME create a config for this component?
	// #javaClassModelToCodeConverter: PartialJavaClassModelToCodeConverterConfig;
	#generatedClassesPackage?: string;

	public withClassModelGeneratorConfig(config: PartialClassModelGeneratorConfig): this {
		this.#classModelGeneratorConfig = config;
		return this;
	}

	public withJavaClassModelGeneratorConfig(config: PartialJavaClassModelGeneratorConfig): this {
		this.#javaClassModelGeneratorConfig = config;
		return this;
	}

	public withGeneratedClassesPackage(generatedClassesPackage: string): this {
		this.#generatedClassesPackage = generatedClassesPackage;
		return this;
	}

	public addJavaClassModelTransformers(...javaClassModelTransformers: JavaClassModelTransformer[]): this {
		this.#javaClassModelTransformers.push(...javaClassModelTransformers);
		return this;
	}

	public build() {
		return new EntityRelationshipModelToJavaCodeConverter(
				new ClassModelGenerator(this.#classModelGeneratorConfig),
				new JavaClassModelGenerator(this.#javaClassModelGeneratorConfig),
				[...this.#javaClassModelTransformers],
				new JavaClassModelToCodeConverter(this.#generatedClassesPackage)
		);
	}

}
