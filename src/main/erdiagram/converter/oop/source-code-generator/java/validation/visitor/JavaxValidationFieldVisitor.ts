import {JavaFieldTransformContext} from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/java-class-model-transformer-context-types';
import {
	JavaAnnotatedElement,
	JavaField
} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import JavaxValidationAnnotationsSupplier
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/visitor/JavaxValidationAnnotationsSupplier';

export default class JavaxValidationFieldVisitor {

	private readonly _javaValidationAnnotationsGenerator: JavaxValidationAnnotationsSupplier;
	private readonly _annotateGetters: boolean;

	constructor(
			javaValidationAnnotationsGenerator: JavaxValidationAnnotationsSupplier,
			annotateGetters: boolean
	) {
		this._javaValidationAnnotationsGenerator = javaValidationAnnotationsGenerator;
		this._annotateGetters = annotateGetters;
	}

	visitField(javaField: JavaField, context: JavaFieldTransformContext<unknown>): void {

		const annotations = this._javaValidationAnnotationsGenerator.getAnnotations(context.fieldDescriptor);
		const elementToAnnotate = this.getElementToAnnotate(javaField);

		elementToAnnotate.annotations.push(...annotations);

	}

	private getElementToAnnotate(javaField: JavaField): JavaAnnotatedElement {

		if (this._annotateGetters && javaField.getter != null) {
			return javaField.getter;
		}

		return javaField;

	}

}
