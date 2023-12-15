import { JpaTransformer } from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/JpaTransformer';
import {
	checkAnnotations,
	checkClassFieldsAnnotations
} from '../../util/annotation-test-utils';
import { getTransformedJavaClassModel } from '../../util/transformer-test-utils';

test('With default config', () => {

	const jpaTransformer = JpaTransformer.withDefaultConfig();

	const javaClassModel = getTransformedJavaClassModel(`
TestEntity
    field int
`, jpaTransformer);

	const testEntityClass = javaClassModel.classes[0];
	expect(testEntityClass.name).toBe('TestEntity');
	checkAnnotations(testEntityClass, ['@Entity']);
	checkClassFieldsAnnotations(testEntityClass, {
		id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
		field: ['@Column(nullable = false)']
	});

});

test('With custom config', () => {

	const jpaTransformer = JpaTransformer.builder()
			.configureDatabaseModel({
				usePluralTableNames: true
			})
			.configureJpa({
				useExplicitTableName: true
			})
			.build();

	const javaClassModel = getTransformedJavaClassModel(`
TestEntity
    field int
`, jpaTransformer);

	const testEntityClass = javaClassModel.classes[0];
	expect(testEntityClass.name).toBe('TestEntity');
	checkAnnotations(testEntityClass, ['@Entity', '@Table(name = "TestEntities")']);
	checkClassFieldsAnnotations(testEntityClass, {
		id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
		field: ['@Column(nullable = false)']
	});

});

// TODO add tests for trying the factory methods withDefaultConfig() and builder().(...).build()
