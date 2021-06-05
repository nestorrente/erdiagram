import {JavaFieldTransformContext} from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/java-class-model-transformer-context-types';
import {
	JavaAnnotatedElement,
	JavaField
} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import BeanValidationAnnotationsSupplier
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/visitor/BeanValidationAnnotationsSupplier';

export default class BeanValidationFieldVisitor {

	private readonly _beanValidationAnnotationsGenerator: BeanValidationAnnotationsSupplier;
	private readonly _annotateGetters: boolean;

	constructor(
			beanValidationAnnotationsGenerator: BeanValidationAnnotationsSupplier,
			annotateGetters: boolean
	) {
		this._beanValidationAnnotationsGenerator = beanValidationAnnotationsGenerator;
		this._annotateGetters = annotateGetters;
	}

	visitField(javaField: JavaField, context: JavaFieldTransformContext<unknown>): void {

		const annotations = this._beanValidationAnnotationsGenerator.getAnnotations(context.fieldDescriptor);
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
