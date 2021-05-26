import {ClassDescriptor, ClassModel} from '@/erdiagram/converter/oop/model/class-model-types';
import {JavaClass, JavaVisibility} from '@/erdiagram/converter/oop/code-converter/java/model/java-class-model-types';
import JavaFieldTypeResolver from '@/erdiagram/converter/oop/code-converter/java/type/JavaFieldTypeResolver';
import JavaClassModelGenerationResult
	from '@/erdiagram/converter/oop/code-converter/java/model/generator/JavaClassModelGenerationResult';
import JavaFieldGenerator from '@/erdiagram/converter/oop/code-converter/java/model/generator/JavaFieldGenerator';
import {PartialJavaClassModelGeneratorConfig} from '@/erdiagram/converter/oop/code-converter/java/model/generator/config/JavaClassModelGeneratorConfig';
import javaClassModelGeneratorConfigManager
	from '@/erdiagram/converter/oop/code-converter/java/model/generator/config/JavaClassModelGeneratorConfigManager';
import JavaClassModelDescriptorsRepositoryBuilder
	from '@/erdiagram/converter/oop/code-converter/java/model/generator/source/JavaClassModelDescriptorsRepositoryBuilder';

export default class JavaClassModelGenerator {

	readonly #generatedClassesPackage?: string;
	readonly #javaFieldGenerator: JavaFieldGenerator;

	constructor(config?: PartialJavaClassModelGeneratorConfig) {

		const fullConfig = javaClassModelGeneratorConfigManager.mergeWithDefaultConfig(config);

		this.#generatedClassesPackage = fullConfig.generatedClassesPackage;

		const typeResolver = new JavaFieldTypeResolver(fullConfig.typeBindings, fullConfig.generatedClassesPackage);
		this.#javaFieldGenerator = new JavaFieldGenerator(typeResolver);

	}

	public generateJavaClassModel(classModel: ClassModel): JavaClassModelGenerationResult {

		const descriptorsRepositoryBuilder = new JavaClassModelDescriptorsRepositoryBuilder();

		const javaClasses = classModel.classes
				.map(classDescriptor => {
					const javaClass = this.generateJavaClass(classDescriptor, descriptorsRepositoryBuilder);
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

	private generateJavaClass(classDescriptor: ClassDescriptor, descriptorsRepositoryBuilder: JavaClassModelDescriptorsRepositoryBuilder): JavaClass {
		return {
			packageName: this.#generatedClassesPackage,
			visibility: JavaVisibility.PUBLIC,
			name: classDescriptor.name,
			annotations: [],
			fields: classDescriptor.fields.map(fieldDescriptor => {
				const javaField = this.#javaFieldGenerator.generateJavaField(fieldDescriptor);
				descriptorsRepositoryBuilder.addField(javaField, fieldDescriptor);
				return javaField;
			})
		};
	}

}
