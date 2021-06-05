import {ClassFieldDescriptor} from '@/erdiagram/converter/oop/model/class-model-types';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import NotNullTextValidationStrategy
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullTextValidationStrategy';
import {removeNullableValues} from '@/erdiagram/util/array-utils';
import JavaValidationAnnotationTypes
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/JavaValidationAnnotationTypes';
import NotNullBlobValidationStrategy
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullBlobValidationStrategy';
import JavaAnnotation from '@/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation';
import ERDiagramSyntaxError from '@/erdiagram/parser/types/error/ERDiagramSyntaxError';

export default class BeanValidationAnnotationsSupplier {

	constructor(
			private readonly notNullTextValidationStrategy: NotNullTextValidationStrategy,
			private readonly notNullBlobValidationStrategy: NotNullBlobValidationStrategy,
	) {

	}

	public getAnnotations(field: ClassFieldDescriptor): JavaAnnotation[] {
		return removeNullableValues([
			this.getNotNullAnnotation(field),
			this.getSizeAnnotation(field)
		]);
	}

	private getNotNullAnnotation(field: ClassFieldDescriptor): JavaAnnotation | null {

		if (field.nullable) {
			return null;
		}

		const annotationType = this.getNotNullAnnotationForField(field);

		return new JavaAnnotation(annotationType);

	}

	private getSizeAnnotation(field: ClassFieldDescriptor): JavaAnnotation | null {

		const {maxSize} = field;

		if (maxSize == null) {
			return null;
		}

		return new JavaAnnotation(
				JavaValidationAnnotationTypes.Size,
				{max: maxSize}
		);

	}

	private getNotNullAnnotationForField(field: ClassFieldDescriptor) {
		switch (field.primitiveType) {
			case EntityPropertyType.TEXT:
				return this.getNotNullAnnotationForTextType();
			case EntityPropertyType.BLOB:
				return this.getNotNullAnnotationForBlobType();
			default:
				return JavaValidationAnnotationTypes.NotNull;
		}
	}

	private getNotNullAnnotationForTextType() {
		switch (this.notNullTextValidationStrategy) {
			case NotNullTextValidationStrategy.NOT_NULL:
				return JavaValidationAnnotationTypes.NotNull;
			case NotNullTextValidationStrategy.NOT_EMPTY:
				return JavaValidationAnnotationTypes.NotEmpty;
			case NotNullTextValidationStrategy.NOT_BLANK:
				return JavaValidationAnnotationTypes.NotBlank;
				/* istanbul ignore next */
			default:
				/* istanbul ignore next */
				throw new ERDiagramSyntaxError(`Unknown statement type`);
		}
	}

	private getNotNullAnnotationForBlobType() {
		switch (this.notNullBlobValidationStrategy) {
			case NotNullBlobValidationStrategy.NOT_NULL:
				return JavaValidationAnnotationTypes.NotNull;
			case NotNullBlobValidationStrategy.NOT_EMPTY:
				return JavaValidationAnnotationTypes.NotEmpty;
				/* istanbul ignore next */
			default:
				/* istanbul ignore next */
				throw new ERDiagramSyntaxError(`Unknown statement type`);
		}
	}

}
