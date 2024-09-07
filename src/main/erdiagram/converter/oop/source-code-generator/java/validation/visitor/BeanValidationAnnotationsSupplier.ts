import {ClassFieldDescriptor} from '@/erdiagram/converter/oop/model/class-model-types';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import NotNullTextValidationStrategy
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullTextValidationStrategy';
import {removeNullableValues} from '@/erdiagram/util/array-utils';
import NotNullBlobValidationStrategy
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullBlobValidationStrategy';
import JavaAnnotation from '@/erdiagram/converter/oop/source-code-generator/java/annotation/JavaAnnotation';
import ERDiagramSyntaxError from '@/erdiagram/parser/types/error/ERDiagramSyntaxError';
import JavaValidationAnnotationTypesProvider
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/JavaValidationAnnotationTypesProvider';

export default class BeanValidationAnnotationsSupplier {

	constructor(
			private readonly _notNullTextValidationStrategy: NotNullTextValidationStrategy,
			private readonly _notNullBlobValidationStrategy: NotNullBlobValidationStrategy,
			private readonly _annotationTypesProvider: JavaValidationAnnotationTypesProvider,
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
				this._annotationTypesProvider.size(),
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
				return this._annotationTypesProvider.notNull();
		}
	}

	private getNotNullAnnotationForTextType() {
		switch (this._notNullTextValidationStrategy) {
			case NotNullTextValidationStrategy.NOT_NULL:
				return this._annotationTypesProvider.notNull();
			case NotNullTextValidationStrategy.NOT_EMPTY:
				return this._annotationTypesProvider.notEmpty();
			case NotNullTextValidationStrategy.NOT_BLANK:
				return this._annotationTypesProvider.notBlank();
				/* istanbul ignore next */
			default:
				/* istanbul ignore next */
				throw new ERDiagramSyntaxError(`Unknown statement type`);
		}
	}

	private getNotNullAnnotationForBlobType() {
		switch (this._notNullBlobValidationStrategy) {
			case NotNullBlobValidationStrategy.NOT_NULL:
				return this._annotationTypesProvider.notNull();
			case NotNullBlobValidationStrategy.NOT_EMPTY:
				return this._annotationTypesProvider.notEmpty();
				/* istanbul ignore next */
			default:
				/* istanbul ignore next */
				throw new ERDiagramSyntaxError(`Unknown statement type`);
		}
	}

}
