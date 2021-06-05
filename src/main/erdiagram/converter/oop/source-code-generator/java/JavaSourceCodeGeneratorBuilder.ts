import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';
import JavaClassModelTransformer
	from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/JavaClassModelTransformer';
import JavaClassModelGenerator
	from '@/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaClassModelGenerator';
import {PartialClassModelGeneratorConfig} from '@/erdiagram/converter/oop/model/config/ClassModelGeneratorConfig';
import {PartialJavaClassModelGeneratorConfig} from '@/erdiagram/converter/oop/source-code-generator/java/model/generator/config/JavaClassModelGeneratorConfig';
import JavaSourceCodeGenerator from '@/erdiagram/converter/oop/source-code-generator/java/JavaSourceCodeGenerator';
import JavaClassModelCodeGenerator
	from '@/erdiagram/converter/oop/source-code-generator/java/code/JavaClassModelCodeGenerator';
import JavaClassCodeGenerator from '@/erdiagram/converter/oop/source-code-generator/java/code/JavaClassCodeGenerator';
import JavaClassModelSourceFilesGenerator
	from '@/erdiagram/converter/oop/source-code-generator/java/code/JavaClassModelSourceFilesGenerator';
import JavaClassUsedTypesCompiler
	from '@/erdiagram/converter/oop/source-code-generator/java/type/import/JavaClassUsedTypesCompiler';
import JavaAnnotationUsedTypesCompiler
	from '@/erdiagram/converter/oop/source-code-generator/java/type/import/JavaAnnotationUsedTypesCompiler';

export default class JavaSourceCodeGeneratorBuilder {

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

		// TODO find a better way to instantiate this stateless components
		const javaAnnotationUsedTypesCompiler = new JavaAnnotationUsedTypesCompiler();
		const javaClassUsedTypesCompiler = new JavaClassUsedTypesCompiler(javaAnnotationUsedTypesCompiler);
		const javaClassCodeGenerator = new JavaClassCodeGenerator(javaClassUsedTypesCompiler);

		const javaClassModelCodeGenerator = new JavaClassModelCodeGenerator(javaClassCodeGenerator);
		const javaClassModelSourceFilesGenerator = new JavaClassModelSourceFilesGenerator(javaClassCodeGenerator);

		return new JavaSourceCodeGenerator(
				classModelGenerator,
				javaClassModelGenerator,
				[...this._javaClassModelTransformers],
				javaClassModelCodeGenerator,
				javaClassModelSourceFilesGenerator
		);

	}

}
