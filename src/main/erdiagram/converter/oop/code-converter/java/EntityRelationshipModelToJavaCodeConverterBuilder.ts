import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';
import JavaClassModelTransformer
	from '@/erdiagram/converter/oop/code-converter/java/model/transformer/JavaClassModelTransformer';
import JavaClassModelGenerator
	from '@/erdiagram/converter/oop/code-converter/java/model/generator/JavaClassModelGenerator';
import {PartialClassModelGeneratorConfig} from '@/erdiagram/converter/oop/model/config/ClassModelGeneratorConfig';
import {PartialJavaClassModelGeneratorConfig} from '@/erdiagram/converter/oop/code-converter/java/model/generator/config/JavaClassModelGeneratorConfig';
import EntityRelationshipModelToJavaCodeConverter
	from '@/erdiagram/converter/oop/code-converter/java/EntityRelationshipModelToJavaCodeConverter';
import JavaClassModelCodeGenerator
	from '@/erdiagram/converter/oop/code-converter/java/code/JavaClassModelCodeGenerator';
import JavaClassCodeGenerator from '@/erdiagram/converter/oop/code-converter/java/code/JavaClassCodeGenerator';
import JavaClassModelSourceFilesGenerator
	from '@/erdiagram/converter/oop/code-converter/java/code/JavaClassModelSourceFilesGenerator';

export default class EntityRelationshipModelToJavaCodeConverterBuilder {

	#classModelGeneratorConfig: PartialClassModelGeneratorConfig = {};
	#javaClassModelGeneratorConfig: PartialJavaClassModelGeneratorConfig = {};
	#javaClassModelTransformers: JavaClassModelTransformer[] = [];

	public withClassModelGeneratorConfig(config: PartialClassModelGeneratorConfig) {
		this.#classModelGeneratorConfig = config;
		return this;
	}

	public withJavaClassModelGeneratorConfig(config: PartialJavaClassModelGeneratorConfig) {
		this.#javaClassModelGeneratorConfig = config;
		return this;
	}

	public addJavaClassModelTransformers(...javaClassModelTransformers: JavaClassModelTransformer[]) {
		this.#javaClassModelTransformers.push(...javaClassModelTransformers);
		return this;
	}

	public build() {

		const classModelGenerator = new ClassModelGenerator(this.#classModelGeneratorConfig);
		const javaClassModelGenerator = new JavaClassModelGenerator(this.#javaClassModelGeneratorConfig);

		const javaClassCodeGenerator = new JavaClassCodeGenerator();
		const javaClassModelCodeGenerator = new JavaClassModelCodeGenerator(javaClassCodeGenerator);
		const javaClassModelSourceFilesGenerator = new JavaClassModelSourceFilesGenerator(javaClassCodeGenerator);

		return new EntityRelationshipModelToJavaCodeConverter(
				classModelGenerator,
				javaClassModelGenerator,
				[...this.#javaClassModelTransformers],
				javaClassModelCodeGenerator,
				javaClassModelSourceFilesGenerator
		);

	}

}
