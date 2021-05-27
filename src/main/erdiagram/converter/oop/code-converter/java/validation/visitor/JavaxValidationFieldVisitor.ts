import {JavaFieldTransformContext} from '@/erdiagram/converter/oop/code-converter/java/model/transformer/java-class-model-transformer-context-types';
import {
	JavaAnnotatedElement,
	JavaField
} from '@/erdiagram/converter/oop/code-converter/java/model/java-class-model-types';
import JavaxValidationAnnotationsSupplier
	from '@/erdiagram/converter/oop/code-converter/java/validation/visitor/JavaxValidationAnnotationsSupplier';

export default class JavaxValidationFieldVisitor {

	readonly #javaValidationAnnotationsGenerator: JavaxValidationAnnotationsSupplier;
	readonly #annotateGetters: boolean;

	constructor(
			javaValidationAnnotationsGenerator: JavaxValidationAnnotationsSupplier,
			annotateGetters: boolean
	) {
		this.#javaValidationAnnotationsGenerator = javaValidationAnnotationsGenerator;
		this.#annotateGetters = annotateGetters;
	}

	visitField(javaField: JavaField, context: JavaFieldTransformContext<unknown>): void {

		const annotations = this.#javaValidationAnnotationsGenerator.getAnnotations(context.fieldDescriptor);
		const elementToAnnotate = this.getElementToAnnotate(javaField);

		elementToAnnotate.annotations.push(...annotations);

	}

	private getElementToAnnotate(javaField: JavaField): JavaAnnotatedElement {

		if (this.#annotateGetters && javaField.getter != null) {
			return javaField.getter;
		}

		return javaField;

	}

}
