import { checkAnnotations } from '#/erdiagram/converter/oop/source-code-generator/java/util/annotation-test-utils';
import {
	expectAllFieldsHaveGetter,
	expectAllFieldsHaveSetter,
	expectNoFieldsHaveGetter,
	expectNoFieldsHaveSetter,
	getTransformedJavaClassModel
} from '#/erdiagram/converter/oop/source-code-generator/java/util/transformer-test-utils';
import { LombokTransformer } from '@/erdiagram/converter/oop/source-code-generator/java/lombok/transformer/LombokTransformer';
import { PartialLombokConfig } from '../../../../../../../../main/erdiagram/converter/oop/source-code-generator/java/lombok/config/LombokConfig';

describe('Simple annotations', () => {

	test.each<{
		config: PartialLombokConfig,
		annotationCode: string
	}>([
		{
			config: { builderAnnotation: true },
			annotationCode: '@Builder'
		},
		{
			config: { toStringAnnotation: true },
			annotationCode: '@ToString'
		},
		{
			config: { equalsAndHashCodeAnnotation: true },
			annotationCode: '@EqualsAndHashCode'
		}
	])('$annotationCode', () => {

		const transformer = new LombokTransformer({
			builderAnnotation: true
		});

		const javaClassModel = getTransformedJavaClassModel(`
TestEntity
    field int
`, transformer);

		const testEntityClass = javaClassModel.classes[0];
		expect(testEntityClass.name).toBe('TestEntity');

		checkAnnotations(testEntityClass, ['@Builder']);

		expectAllFieldsHaveGetter(testEntityClass);
		expectAllFieldsHaveSetter(testEntityClass);

	});

	test('Apply several annotations at the same time', () => {

		const transformer = new LombokTransformer({
			builderAnnotation: true,
			toStringAnnotation: true,
			equalsAndHashCodeAnnotation: true
		});

		const javaClassModel = getTransformedJavaClassModel(`
TestEntity
    field int
`, transformer);

		const testEntityClass = javaClassModel.classes[0];
		expect(testEntityClass.name).toBe('TestEntity');

		checkAnnotations(testEntityClass, [
			'@Builder',
			'@ToString',
			'@EqualsAndHashCode'
		]);

		expectAllFieldsHaveGetter(testEntityClass);
		expectAllFieldsHaveSetter(testEntityClass);

	});

});

describe('Complex annotations', () => {

	test('@Getter', () => {

		const transformer = new LombokTransformer({
			getterAnnotation: true
		});

		const javaClassModel = getTransformedJavaClassModel(`
TestEntity
    field int
`, transformer);

		const testEntityClass = javaClassModel.classes[0];
		expect(testEntityClass.name).toBe('TestEntity');

		checkAnnotations(testEntityClass, ['@Getter']);

		expectNoFieldsHaveGetter(testEntityClass);
		expectAllFieldsHaveSetter(testEntityClass);

	});

	test('@Setter', () => {

		const transformer = new LombokTransformer({
			setterAnnotation: true
		});

		const javaClassModel = getTransformedJavaClassModel(`
TestEntity
    field int
`, transformer);

		const testEntityClass = javaClassModel.classes[0];
		expect(testEntityClass.name).toBe('TestEntity');

		checkAnnotations(testEntityClass, ['@Setter']);

		expectAllFieldsHaveGetter(testEntityClass);
		expectNoFieldsHaveSetter(testEntityClass);

	});

	test('@Data', () => {

		const transformer = new LombokTransformer({
			dataAnnotation: true
		});

		const javaClassModel = getTransformedJavaClassModel(`
TestEntity
    field int
`, transformer);

		const testEntityClass = javaClassModel.classes[0];
		expect(testEntityClass.name).toBe('TestEntity');

		checkAnnotations(testEntityClass, ['@Data']);

		expectNoFieldsHaveGetter(testEntityClass);
		expectNoFieldsHaveSetter(testEntityClass);

	});

});
