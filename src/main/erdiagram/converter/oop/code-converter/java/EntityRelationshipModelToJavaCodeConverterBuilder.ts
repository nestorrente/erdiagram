import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';
import JavaClassModelTransformer
	from '@/erdiagram/converter/oop/code-converter/java/model/transformer/JavaClassModelTransformer';
import JavaClassModelGenerator
	from '@/erdiagram/converter/oop/code-converter/java/model/generator/JavaClassModelGenerator';
import {PartialClassModelGeneratorConfig} from '@/erdiagram/converter/oop/model/config/ClassModelGeneratorConfig';
import {PartialJavaClassModelGeneratorConfig} from '@/erdiagram/converter/oop/code-converter/java/model/generator/config/JavaClassModelGeneratorConfig';
import EntityRelationshipModelToJavaCodeConverter
	from '@/erdiagram/converter/oop/code-converter/java/EntityRelationshipModelToJavaCodeConverter';

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
		return new EntityRelationshipModelToJavaCodeConverter(
				new ClassModelGenerator(this.#classModelGeneratorConfig),
				new JavaClassModelGenerator(this.#javaClassModelGeneratorConfig),
				[...this.#javaClassModelTransformers]
		);
	}

}
