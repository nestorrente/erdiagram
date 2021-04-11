import {ClassFieldDescriptor} from '@/erdiagram/converter/oop/model/class-model-types';
import JavaType from '@/erdiagram/converter/oop/code-converter/java/type/JavaType';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {ERDiagramSyntaxError} from '@/erdiagram/parser/types/parse-errors';
import NotNullTextValidationStrategy
	from '@/erdiagram/converter/oop/code-converter/java/annotation/validation/NotNullTextValidationStrategy';
import {removeNullableValues} from '@/erdiagram/util/array-utils';
import JavaValidationAnnotationTypes
	from '@/erdiagram/converter/oop/code-converter/java/annotation/validation/JavaValidationAnnotationTypes';
import NotNullBlobValidationStrategy
	from '@/erdiagram/converter/oop/code-converter/java/annotation/validation/NotNullBlobValidationStrategy';

export interface FieldAnnotation {
	codeLine: string;
	annotationType: JavaType;
}

export default class JavaValidationAnnotationsGenerator {

	constructor(
			private readonly notNullTextValidationStrategy: NotNullTextValidationStrategy,
			private readonly notNullBlobValidationStrategy: NotNullBlobValidationStrategy,
	) {

	}

	public getValidationAnnotations(field: ClassFieldDescriptor): FieldAnnotation[] {
		return removeNullableValues([
			this.getNotNullAnnotation(field),
			this.getSizeAnnotation(field)
		]);
	}

	private getNotNullAnnotation(field: ClassFieldDescriptor): FieldAnnotation | null {

		if (field.nullable) {
			return null;
		}

		const annotationType = this.getNotNullAnnotationForField(field);

		return {
			annotationType,
			codeLine: this.formatAnnotation(annotationType)
		};

	}

	private getSizeAnnotation(field: ClassFieldDescriptor): FieldAnnotation | null {

		const {maxSize} = field;

		if (maxSize == null) {
			return null;
		}

		const annotationType = JavaValidationAnnotationTypes.Size;

		return {
			annotationType,
			codeLine: this.formatAnnotation(annotationType, {max: maxSize})
		};

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

	private formatAnnotation(type: JavaType, params: Record<string, any> = {}): string {

		const simpleName = type.formatSimple();
		const formattedParams = this.formatAnnotationParams(params);

		return `@${simpleName}${formattedParams}`;

	}

	private formatAnnotationParams(annotationParams: Record<string, any>) {

		const annotationParamsEntries = Object.entries(annotationParams);

		if (annotationParamsEntries.length === 0) {
			return '';
		}

		const formattedParams = annotationParamsEntries.map(([paramName, paramValue]) => `${paramName} = ${paramValue}`);

		return `(${formattedParams.join(', ')})`;

	}

}
