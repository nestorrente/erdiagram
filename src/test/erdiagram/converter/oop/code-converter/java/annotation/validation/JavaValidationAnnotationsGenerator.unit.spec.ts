import JavaxValidationAnnotationsSupplier
	from '../../../../../../../../main/erdiagram/converter/oop/code-converter/java/validation/visitor/JavaxValidationAnnotationsSupplier';
import NotNullTextValidationStrategy
	from '../../../../../../../../main/erdiagram/converter/oop/code-converter/java/validation/strategy/NotNullTextValidationStrategy';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import JavaValidationAnnotationTypes
	from '../../../../../../../../main/erdiagram/converter/oop/code-converter/java/validation/JavaValidationAnnotationTypes';
import JavaType from '@/erdiagram/converter/oop/code-converter/java/type/JavaType';
import NotNullBlobValidationStrategy
	from '../../../../../../../../main/erdiagram/converter/oop/code-converter/java/validation/strategy/NotNullBlobValidationStrategy';
import {createPrimitiveClassField} from '../../../../model/class-model-mothers';
import JavaAnnotation from '@/erdiagram/converter/oop/code-converter/java/annotation/JavaAnnotation';

const validationAnnotationsGenerator = new JavaxValidationAnnotationsSupplier(
		NotNullTextValidationStrategy.NOT_NULL,
		NotNullBlobValidationStrategy.NOT_NULL
);

test('Nullable field should not be annotated', () => {

	const field = createPrimitiveClassField('field', EntityPropertyType.INT, {
		nullable: true
	});

	const fieldAnnotations = validationAnnotationsGenerator.getAnnotations(field);

	expect(fieldAnnotations).toHaveLength(0);

});

test('Not-null field should be annotated with @NotNull', () => {

	const field = createPrimitiveClassField('field', EntityPropertyType.INT);

	const fieldAnnotations = validationAnnotationsGenerator.getAnnotations(field);

	expect(fieldAnnotations).toHaveLength(1);
	expectAnnotationToBe(fieldAnnotations[0], {
		type: JavaValidationAnnotationTypes.NotNull
	});

});

test('Field with max-size should be annotated with @Size', () => {

	const field = createPrimitiveClassField('field', EntityPropertyType.BLOB, {
		nullable: true,
		maxSize: 2048
	});

	const fieldAnnotations = validationAnnotationsGenerator.getAnnotations(field);

	expect(fieldAnnotations).toHaveLength(1);
	expectAnnotationToBe(fieldAnnotations[0], {
		type: JavaValidationAnnotationTypes.Size,
		parameters: {
			max: 2048
		}
	});

});

describe('Not-null text validation strategies', () => {

	const testCaseParams: [NotNullTextValidationStrategy, JavaType][] = [
		[NotNullTextValidationStrategy.NOT_NULL, JavaValidationAnnotationTypes.NotNull],
		[NotNullTextValidationStrategy.NOT_EMPTY, JavaValidationAnnotationTypes.NotEmpty],
		[NotNullTextValidationStrategy.NOT_BLANK, JavaValidationAnnotationTypes.NotBlank],
	];

	testCaseParams.forEach(([notNullTextValidationStrategy, annotationType]) => {

		const customizedJavaValidationAnnotationsGenerator = new JavaxValidationAnnotationsSupplier(
				notNullTextValidationStrategy,
				NotNullBlobValidationStrategy.NOT_NULL
		);

		test(`Not-null text should be annotated with @${annotationType.formatSimple()}`, () => {

			const field = createPrimitiveClassField('field', EntityPropertyType.TEXT);

			const fieldAnnotations = customizedJavaValidationAnnotationsGenerator.getAnnotations(field);

			expect(fieldAnnotations).toHaveLength(1);
			expectAnnotationToBe(fieldAnnotations[0], {
				type: annotationType
			});

		});

		test(`@${annotationType.formatSimple()} annotation should appear before @Size`, () => {

			const field = createPrimitiveClassField('field', EntityPropertyType.TEXT, {
				maxSize: 50
			});

			const fieldAnnotations = customizedJavaValidationAnnotationsGenerator.getAnnotations(field);

			expect(fieldAnnotations).toHaveLength(2);
			expectAnnotationToBe(fieldAnnotations[0], {
				type: annotationType
			});
			expectAnnotationToBe(fieldAnnotations[1], {
				type: JavaValidationAnnotationTypes.Size,
				parameters: {
					max: 50
				}
			});

		});

	});

});

describe('Not-null blob validation strategies', () => {

	const testCaseParams: [NotNullBlobValidationStrategy, JavaType][] = [
		[NotNullBlobValidationStrategy.NOT_NULL, JavaValidationAnnotationTypes.NotNull],
		[NotNullBlobValidationStrategy.NOT_EMPTY, JavaValidationAnnotationTypes.NotEmpty],
	];

	testCaseParams.forEach(([notNullBlobValidationStrategy, annotationType]) => {

		const customizedJavaValidationAnnotationsGenerator = new JavaxValidationAnnotationsSupplier(
				NotNullTextValidationStrategy.NOT_NULL,
				notNullBlobValidationStrategy
		);

		test(`Not-null blob should be annotated with @${annotationType.formatSimple()}`, () => {

			const field = createPrimitiveClassField('field', EntityPropertyType.BLOB);

			const fieldAnnotations = customizedJavaValidationAnnotationsGenerator
					.getAnnotations(field);

			expect(fieldAnnotations).toHaveLength(1);
			expectAnnotationToBe(fieldAnnotations[0], {
				type: annotationType
			});

		});

		test(`@${annotationType.formatSimple()} annotation should appear before @Size`, () => {

			const field = createPrimitiveClassField('field', EntityPropertyType.BLOB, {
				maxSize: 2048
			});

			const fieldAnnotations = customizedJavaValidationAnnotationsGenerator.getAnnotations(field);

			expect(fieldAnnotations).toHaveLength(2);
			expectAnnotationToBe(fieldAnnotations[0], {
				type: annotationType
			});
			expectAnnotationToBe(fieldAnnotations[1], {
				type: JavaValidationAnnotationTypes.Size,
				parameters: {
					max: 2048
				}
			});

		});

	});

});

interface ExpectedAnnotationData {
	type: JavaAnnotation['type'];
	parameters?: JavaAnnotation['parameters'];
}

function expectAnnotationToBe(annotation: JavaAnnotation, expected: ExpectedAnnotationData) {
	expect(annotation.type).toBe(expected.type);
	expect(annotation.parameters).toStrictEqual(expected.parameters ?? {});
}
