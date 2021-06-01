import {ClassModel} from '@/erdiagram/converter/oop/model/class-model-types';
import JavaFieldTypeResolver from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaFieldTypeResolver';
import JavaClassModelGenerationResult
	from '@/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaClassModelGenerationResult';
import {PartialJavaClassModelGeneratorConfig} from '@/erdiagram/converter/oop/source-code-generator/java/model/generator/config/JavaClassModelGeneratorConfig';
import javaClassModelGeneratorConfigManager
	from '@/erdiagram/converter/oop/source-code-generator/java/model/generator/config/JavaClassModelGeneratorConfigManager';
import JavaClassModelDescriptorsRepositoryBuilder
	from '@/erdiagram/converter/oop/source-code-generator/java/model/generator/source/JavaClassModelDescriptorsRepositoryBuilder';
import JavaClassGenerator
	from '@/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaClassGenerator';

export default class JavaClassModelGenerator {

	private readonly _javaClassGenerator: JavaClassGenerator;

	constructor(config?: PartialJavaClassModelGeneratorConfig) {

		const fullConfig = javaClassModelGeneratorConfigManager.mergeWithDefaultConfig(config);

		const generatedClassesPackage = fullConfig.generatedClassesPackage;
		const typeResolver = new JavaFieldTypeResolver(fullConfig.typeBindings, generatedClassesPackage);

		this._javaClassGenerator = new JavaClassGenerator(generatedClassesPackage, typeResolver);

	}

	public generateJavaClassModel(classModel: ClassModel): JavaClassModelGenerationResult {

		const descriptorsRepositoryBuilder = new JavaClassModelDescriptorsRepositoryBuilder();

		const javaClasses = classModel.classes
				.map(classDescriptor => {
					const javaClass = this._javaClassGenerator.generateJavaClass(classDescriptor, event => {
						descriptorsRepositoryBuilder.addField(event.javaField, event.fieldDescriptor);
					});
					descriptorsRepositoryBuilder.addClass(javaClass, classDescriptor);
					return javaClass;
				});

		return {
			javaClassModel: {
				classes: javaClasses
			},
			javaClassModelDescriptorsRepository: descriptorsRepositoryBuilder.build()
		};

	}

}
