import {ClassModel} from '@/erdiagram/converter/oop/model/class-model-types';
import JavaFieldTypeResolver from '@/erdiagram/converter/oop/code-converter/java/type/JavaFieldTypeResolver';
import JavaClassModelGenerationResult
	from '@/erdiagram/converter/oop/code-converter/java/model/generator/JavaClassModelGenerationResult';
import {PartialJavaClassModelGeneratorConfig} from '@/erdiagram/converter/oop/code-converter/java/model/generator/config/JavaClassModelGeneratorConfig';
import javaClassModelGeneratorConfigManager
	from '@/erdiagram/converter/oop/code-converter/java/model/generator/config/JavaClassModelGeneratorConfigManager';
import JavaClassModelDescriptorsRepositoryBuilder
	from '@/erdiagram/converter/oop/code-converter/java/model/generator/source/JavaClassModelDescriptorsRepositoryBuilder';
import JavaClassGenerator from '@/erdiagram/converter/oop/code-converter/java/model/generator/JavaClassGenerator';

export default class JavaClassModelGenerator {

	readonly #javaClassGenerator: JavaClassGenerator;

	constructor(config?: PartialJavaClassModelGeneratorConfig) {

		const fullConfig = javaClassModelGeneratorConfigManager.mergeWithDefaultConfig(config);

		const generatedClassesPackage = fullConfig.generatedClassesPackage;
		const typeResolver = new JavaFieldTypeResolver(fullConfig.typeBindings, generatedClassesPackage);

		this.#javaClassGenerator = new JavaClassGenerator(generatedClassesPackage, typeResolver);

	}

	public generateJavaClassModel(classModel: ClassModel): JavaClassModelGenerationResult {

		const descriptorsRepositoryBuilder = new JavaClassModelDescriptorsRepositoryBuilder();

		const javaClasses = classModel.classes
				.map(classDescriptor => {
					const javaClass = this.#javaClassGenerator.generateJavaClass(classDescriptor, event => {
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
