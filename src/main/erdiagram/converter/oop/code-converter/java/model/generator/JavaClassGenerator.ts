import {ClassDescriptor, ClassFieldDescriptor} from '@/erdiagram/converter/oop/model/class-model-types';
import {
	JavaClass,
	JavaField,
	JavaVisibility
} from '@/erdiagram/converter/oop/code-converter/java/model/java-class-model-types';
import JavaFieldTypeResolver from '@/erdiagram/converter/oop/code-converter/java/type/JavaFieldTypeResolver';
import JavaFieldGenerator from '@/erdiagram/converter/oop/code-converter/java/model/generator/JavaFieldGenerator';

interface FieldGeneratedEvent {
	javaField: JavaField;
	fieldDescriptor: ClassFieldDescriptor;
}

type FieldGeneratedEventListener = (event: FieldGeneratedEvent) => void;

export default class JavaClassGenerator {

	readonly #generatedClassesPackage?: string;
	readonly #javaFieldGenerator: JavaFieldGenerator;

	constructor(
			generatedClassesPackage: string | undefined,
			typeResolver: JavaFieldTypeResolver
	) {
		this.#generatedClassesPackage = generatedClassesPackage;
		this.#javaFieldGenerator = new JavaFieldGenerator(typeResolver);
	}

	public generateJavaClass(classDescriptor: ClassDescriptor, fieldGeneratedEventListener: FieldGeneratedEventListener): JavaClass {
		return {
			packageName: this.#generatedClassesPackage,
			visibility: JavaVisibility.PUBLIC,
			name: classDescriptor.name,
			annotations: [],
			fields: classDescriptor.fields.map(fieldDescriptor => {
				const javaField = this.#javaFieldGenerator.generateJavaField(fieldDescriptor);
				fieldGeneratedEventListener({javaField, fieldDescriptor});
				return javaField;
			})
		};
	}

}
