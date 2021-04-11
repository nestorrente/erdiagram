import JavaValidationAnnotationsGenerator
	from '@/erdiagram/converter/oop/code-converter/java/annotation/validation/JavaValidationAnnotationsGenerator';
import NotNullTextValidationStrategy
	from '@/erdiagram/converter/oop/code-converter/java/annotation/validation/NotNullTextValidationStrategy';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import JavaValidationAnnotationTypes
	from '@/erdiagram/converter/oop/code-converter/java/annotation/validation/JavaValidationAnnotationTypes';
import JavaType from '@/erdiagram/converter/oop/code-converter/java/type/JavaType';
import NotNullBlobValidationStrategy
	from '@/erdiagram/converter/oop/code-converter/java/annotation/validation/NotNullBlobValidationStrategy';

const validationAnnotationsGenerator = new JavaValidationAnnotationsGenerator(
		NotNullTextValidationStrategy.NOT_NULL,
		NotNullBlobValidationStrategy.NOT_NULL
);

test('Nullable field should not be annotated', () => {

	const fieldAnnotations = validationAnnotationsGenerator.getValidationAnnotations({
		name: 'field',
		nullable: true,
		list: false,
		primitiveType: EntityPropertyType.INT
	});

	expect(fieldAnnotations.length).toBe(0);

});

test('Not-null field should be annotated with @NotNull', () => {

	const fieldAnnotations = validationAnnotationsGenerator.getValidationAnnotations({
		name: 'field',
		nullable: false,
		list: false,
		primitiveType: EntityPropertyType.INT
	});

	expect(fieldAnnotations.length).toBe(1);
	expect(fieldAnnotations[0]).toStrictEqual({
		annotationType: JavaValidationAnnotationTypes.NotNull,
		codeLine: '@NotNull'
	});

});

test('Field with max-size should be annotated with @Size', () => {

	const fieldAnnotations = validationAnnotationsGenerator.getValidationAnnotations({
		name: 'field',
		nullable: true,
		list: false,
		primitiveType: EntityPropertyType.BLOB,
		maxSize: 2048
	});

	expect(fieldAnnotations.length).toBe(1);
	expect(fieldAnnotations[0]).toStrictEqual({
		annotationType: JavaValidationAnnotationTypes.Size,
		codeLine: '@Size(max = 2048)'
	});

});

describe('Not-null text validation strategies', () => {

	const testCaseParams: [NotNullTextValidationStrategy, JavaType, string][] = [
		[NotNullTextValidationStrategy.NOT_NULL, JavaValidationAnnotationTypes.NotNull, '@NotNull'],
		[NotNullTextValidationStrategy.NOT_EMPTY, JavaValidationAnnotationTypes.NotEmpty, '@NotEmpty'],
		[NotNullTextValidationStrategy.NOT_BLANK, JavaValidationAnnotationTypes.NotBlank, '@NotBlank'],
	];

	testCaseParams.forEach(([notNullTextValidationStrategy, annotationType, codeLine]) => {

		test(`Not-null text should be annotated with @${annotationType.formatSimple()}`, () => {

			const fieldAnnotations = new JavaValidationAnnotationsGenerator(
					notNullTextValidationStrategy,
					NotNullBlobValidationStrategy.NOT_NULL
			)
					.getValidationAnnotations({
						name: 'field',
						nullable: false,
						list: false,
						primitiveType: EntityPropertyType.TEXT
					});

			expect(fieldAnnotations.length).toBe(1);
			expect(fieldAnnotations[0]).toStrictEqual({
				annotationType,
				codeLine
			});

		});

	});

});

describe('Not-null blob validation strategies', () => {

	const testCaseParams: [NotNullBlobValidationStrategy, JavaType, string][] = [
		[NotNullBlobValidationStrategy.NOT_NULL, JavaValidationAnnotationTypes.NotNull, '@NotNull'],
		[NotNullBlobValidationStrategy.NOT_EMPTY, JavaValidationAnnotationTypes.NotEmpty, '@NotEmpty'],
	];

	testCaseParams.forEach(([notNullBlobValidationStrategy, annotationType, codeLine]) => {

		test(`Not-null blob should be annotated with @${annotationType.formatSimple()}`, () => {

			const fieldAnnotations = new JavaValidationAnnotationsGenerator(
					NotNullTextValidationStrategy.NOT_NULL,
					notNullBlobValidationStrategy
			)
					.getValidationAnnotations({
						name: 'field',
						nullable: false,
						list: false,
						primitiveType: EntityPropertyType.BLOB
					});

			expect(fieldAnnotations.length).toBe(1);
			expect(fieldAnnotations[0]).toStrictEqual({
				annotationType,
				codeLine
			});

		});

	});

});
