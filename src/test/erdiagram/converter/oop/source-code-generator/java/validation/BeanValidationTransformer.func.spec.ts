import BeanValidationTransformer
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/BeanValidationTransformer';
import { getTransformedJavaClassModel } from '#/erdiagram/converter/oop/source-code-generator/java/util/transformer-test-utils';
import {
	checkAnnotations,
	checkClassFieldsAnnotations
} from '#/erdiagram/converter/oop/source-code-generator/java/util/annotation-test-utils';

test('Simple entity', () => {

	const transformer = new BeanValidationTransformer();

	const javaClassModel = getTransformedJavaClassModel(`
TestEntity
    field int
`, transformer);

	const testEntityClass = javaClassModel.classes[0];
	expect(testEntityClass.name).toBe('TestEntity');
	checkAnnotations(testEntityClass, []);
	checkClassFieldsAnnotations(testEntityClass, {
		id: [],
		field: ['@NotNull']
	});

});
