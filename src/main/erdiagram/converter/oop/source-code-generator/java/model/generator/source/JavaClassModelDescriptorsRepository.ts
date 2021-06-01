import {JavaClass, JavaField} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import {ClassDescriptor, ClassFieldDescriptor} from '@/erdiagram/converter/oop/model/class-model-types';
import JavaClassModelDescriptorsRepositoryBuilder
	from '@/erdiagram/converter/oop/source-code-generator/java/model/generator/source/JavaClassModelDescriptorsRepositoryBuilder';

export default class JavaClassModelDescriptorsRepository {

	private readonly _classDescriptorsMap: Map<JavaClass, ClassDescriptor>;
	private readonly _fieldDescriptorsMap: Map<JavaField, ClassFieldDescriptor>;

	constructor(
			classDescriptorsMap: Map<JavaClass, ClassDescriptor>,
			fieldDescriptorsMap: Map<JavaField, ClassFieldDescriptor>
	) {
		this._classDescriptorsMap = classDescriptorsMap;
		this._fieldDescriptorsMap = fieldDescriptorsMap;
	}

	public getClassDescriptor(javaClass: JavaClass): ClassDescriptor {

		const classDescriptor = this._classDescriptorsMap.get(javaClass);

		if (classDescriptor == null) {
			throw new Error(`Cannot find descriptor for Java class "${javaClass.name}"`);
		}

		return classDescriptor;

	}

	public getFieldDescriptor(javaField: JavaField): ClassFieldDescriptor {

		const fieldDescriptor = this._fieldDescriptorsMap.get(javaField);

		if (fieldDescriptor == null) {
			throw new Error(`Cannot find descriptor for Java field "${javaField.name}"`);
		}

		return fieldDescriptor;

	}

	static builder() {
		return new JavaClassModelDescriptorsRepositoryBuilder();
	}

}
