import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';
import JavaClassModelTransformer
	from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/JavaClassModelTransformer';
import JavaClassModelGenerator
	from '@/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaClassModelGenerator';
import {PartialClassModelGeneratorConfig} from '@/erdiagram/converter/oop/model/config/ClassModelGeneratorConfig';
import {PartialJavaClassModelGeneratorConfig} from '@/erdiagram/converter/oop/source-code-generator/java/model/generator/config/JavaClassModelGeneratorConfig';
import JavaEntityRelationshipModelSourceCodeGenerator
	from '@/erdiagram/converter/oop/source-code-generator/java/JavaEntityRelationshipModelSourceCodeGenerator';
import JavaClassModelCodeGenerator
	from '@/erdiagram/converter/oop/source-code-generator/java/code/JavaClassModelCodeGenerator';
import JavaClassCodeGenerator from '@/erdiagram/converter/oop/source-code-generator/java/code/JavaClassCodeGenerator';
import JavaClassModelSourceFilesGenerator
	from '@/erdiagram/converter/oop/source-code-generator/java/code/JavaClassModelSourceFilesGenerator';

export default class JavaEntityRelationshipModelSourceCodeGeneratorBuilder {

	private _classModelGeneratorConfig: PartialClassModelGeneratorConfig = {};
	private _javaClassModelGeneratorConfig: PartialJavaClassModelGeneratorConfig = {};
	private _javaClassModelTransformers: JavaClassModelTransformer[] = [];

	public configureClassModel(config: PartialClassModelGeneratorConfig) {
		this._classModelGeneratorConfig = config;
		return this;
	}

	public configureJavaCode(config: PartialJavaClassModelGeneratorConfig) {
		this._javaClassModelGeneratorConfig = config;
		return this;
	}

	public addTransformers(...javaClassModelTransformers: JavaClassModelTransformer[]) {
		this._javaClassModelTransformers.push(...javaClassModelTransformers);
		return this;
	}

	public build() {

		const classModelGenerator = new ClassModelGenerator(this._classModelGeneratorConfig);
		const javaClassModelGenerator = new JavaClassModelGenerator(this._javaClassModelGeneratorConfig);

		const javaClassCodeGenerator = new JavaClassCodeGenerator();
		const javaClassModelCodeGenerator = new JavaClassModelCodeGenerator(javaClassCodeGenerator);
		const javaClassModelSourceFilesGenerator = new JavaClassModelSourceFilesGenerator(javaClassCodeGenerator);

		return new JavaEntityRelationshipModelSourceCodeGenerator(
				classModelGenerator,
				javaClassModelGenerator,
				[...this._javaClassModelTransformers],
				javaClassModelCodeGenerator,
				javaClassModelSourceFilesGenerator
		);

	}

}
