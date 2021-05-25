import {JavaClass, JavaField} from '@/erdiagram/converter/oop/code-converter/java/model/java-class-model-types';
import {ClassDescriptor, ClassFieldDescriptor} from '@/erdiagram/converter/oop/model/class-model-types';
import JavaClassModelDescriptorsRepository
	from '@/erdiagram/converter/oop/code-converter/java/model/generator/source/JavaClassModelDescriptorsRepository';

export default class JavaClassModelDescriptorsRepositoryBuilder {

	readonly #classDescriptorsMap = new Map<JavaClass, ClassDescriptor>();
	readonly #fieldDescriptorsMap = new Map<JavaField, ClassFieldDescriptor>();

	public addClass(javaClass: JavaClass, classDescriptor: ClassDescriptor): this {
		this.#classDescriptorsMap.set(javaClass, classDescriptor);
		return this;
	}

	public addField(javaField: JavaField, fieldDescriptor: ClassFieldDescriptor): this {
		this.#fieldDescriptorsMap.set(javaField, fieldDescriptor);
		return this;
	}

	public build(): JavaClassModelDescriptorsRepository {
		return new JavaClassModelDescriptorsRepository(
				new Map(this.#classDescriptorsMap.entries()),
				new Map(this.#fieldDescriptorsMap.entries())
		);
	}

}
