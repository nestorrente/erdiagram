import {JavaClass, JavaField} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import {ClassDescriptor, ClassFieldDescriptor} from '@/erdiagram/converter/oop/model/class-model-types';
import JavaClassModelDescriptorsRepository
	from '@/erdiagram/converter/oop/source-code-generator/java/model/generator/source/JavaClassModelDescriptorsRepository';

export default class JavaClassModelDescriptorsRepositoryBuilder {

	private readonly _classDescriptorsMap = new Map<JavaClass, ClassDescriptor>();
	private readonly _fieldDescriptorsMap = new Map<JavaField, ClassFieldDescriptor>();

	public addClass(javaClass: JavaClass, classDescriptor: ClassDescriptor): this {
		this._classDescriptorsMap.set(javaClass, classDescriptor);
		return this;
	}

	public addField(javaField: JavaField, fieldDescriptor: ClassFieldDescriptor): this {
		this._fieldDescriptorsMap.set(javaField, fieldDescriptor);
		return this;
	}

	public build(): JavaClassModelDescriptorsRepository {
		return new JavaClassModelDescriptorsRepository(
				new Map(this._classDescriptorsMap.entries()),
				new Map(this._fieldDescriptorsMap.entries())
		);
	}

}
