import {ClassDescriptor, ClassFieldDescriptor} from '@/erdiagram/converter/oop/model/class-model-types';
import {
	JavaClass,
	JavaField,
	JavaVisibility
} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import JavaFieldTypeResolver from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaFieldTypeResolver';
import JavaFieldGenerator
	from '@/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaFieldGenerator';

interface FieldGeneratedEvent {
	javaField: JavaField;
	fieldDescriptor: ClassFieldDescriptor;
}

type FieldGeneratedEventListener = (event: FieldGeneratedEvent) => void;

export default class JavaClassGenerator {

	private readonly _generatedClassesPackage?: string;
	private readonly _javaFieldGenerator: JavaFieldGenerator;

	constructor(
			generatedClassesPackage: string | undefined,
			typeResolver: JavaFieldTypeResolver
	) {
		this._generatedClassesPackage = generatedClassesPackage;
		this._javaFieldGenerator = new JavaFieldGenerator(typeResolver);
	}

	public generateJavaClass(classDescriptor: ClassDescriptor, fieldGeneratedEventListener: FieldGeneratedEventListener): JavaClass {
		return {
			packageName: this._generatedClassesPackage,
			visibility: JavaVisibility.PUBLIC,
			name: classDescriptor.name,
			annotations: [],
			fields: classDescriptor.fields.map(fieldDescriptor => {
				const javaField = this._javaFieldGenerator.generateJavaField(fieldDescriptor);
				fieldGeneratedEventListener({javaField, fieldDescriptor});
				return javaField;
			})
		};
	}

}
