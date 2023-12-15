import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';
import JavaClassModelTransformer
	from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/JavaClassModelTransformer';
import JavaClassModelGenerator
	from '@/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaClassModelGenerator';
import JavaClassModelCodeGenerator
	from '@/erdiagram/converter/oop/source-code-generator/java/code/JavaClassModelCodeGenerator';
import ApplyTransformersCommand
	from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/ApplyTransformersCommand';
import {SetupContext} from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/java-class-model-transformer-context-types';
import JavaSourceCodeGeneratorBuilder
	from '@/erdiagram/converter/oop/source-code-generator/java/JavaSourceCodeGeneratorBuilder';
import SourceFileInfo from '@/erdiagram/converter/common/SourceFileInfo';
import JavaClassModelSourceFilesGenerator
	from '@/erdiagram/converter/oop/source-code-generator/java/code/JavaClassModelSourceFilesGenerator';
import MultipleFileSourceCodeGenerator from '@/erdiagram/converter/MultipleFileSourceCodeGenerator';
import {JavaClassModel} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';

export default class JavaSourceCodeGenerator implements MultipleFileSourceCodeGenerator {

	private readonly _classModelGenerator: ClassModelGenerator;
	private readonly _javaClassModelGenerator: JavaClassModelGenerator;
	private readonly _javaClassModelTransformers: JavaClassModelTransformer[];
	private readonly _javaClassModelCodeGenerator: JavaClassModelCodeGenerator;
	private readonly _javaClassModelSourceFilesGenerator: JavaClassModelSourceFilesGenerator;

	// FIXME too many dependencies?
	constructor(
			classModelGenerator: ClassModelGenerator,
			javaClassModelGenerator: JavaClassModelGenerator,
			javaClassModelTransformers: JavaClassModelTransformer[],
			javaClassModelCodeGenerator: JavaClassModelCodeGenerator,
			javaClassModelSourceFilesGenerator: JavaClassModelSourceFilesGenerator
	) {
		this._classModelGenerator = classModelGenerator;
		this._javaClassModelGenerator = javaClassModelGenerator;
		this._javaClassModelTransformers = javaClassModelTransformers;
		this._javaClassModelCodeGenerator = javaClassModelCodeGenerator;
		this._javaClassModelSourceFilesGenerator = javaClassModelSourceFilesGenerator;
	}

	generateSourceCode(entityRelationshipModel: EntityRelationshipModel): string {
		const javaClassModel = this.getJavaClassModel(entityRelationshipModel);
		return this._javaClassModelCodeGenerator.generateCode(javaClassModel);
	}

	generateSourceFiles(entityRelationshipModel: EntityRelationshipModel): SourceFileInfo[] {
		const javaClassModel = this.getJavaClassModel(entityRelationshipModel);
		return this._javaClassModelSourceFilesGenerator.generateSourceFiles(javaClassModel);
	}

	private getJavaClassModel(entityRelationshipModel: EntityRelationshipModel): JavaClassModel {

		const classModel = this._classModelGenerator.generateClassModel(entityRelationshipModel);

		const {
			javaClassModel,
			javaClassModelDescriptorsRepository
		} = this._javaClassModelGenerator.generateJavaClassModel(classModel);

		const applyTransformersCommandContext: SetupContext = {
			entityRelationshipModel,
			classModel,
			javaClassModel
		};

		new ApplyTransformersCommand(
				applyTransformersCommandContext,
				javaClassModelDescriptorsRepository,
				this._javaClassModelTransformers
		).execute();

		return javaClassModel;

	}

	static withDefaultConfig() {
		return this.builder().build();
	}

	static builder() {
		return new JavaSourceCodeGeneratorBuilder();
	}

}
