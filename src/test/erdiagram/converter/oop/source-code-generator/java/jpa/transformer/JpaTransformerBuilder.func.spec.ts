import EntityRelationshipModelParser from '@/erdiagram/parser/EntityRelationshipModelParser';
import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';
import JavaClassModelGenerator
	from '@/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaClassModelGenerator';
import {JpaTransformer} from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/JpaTransformer';
import ApplyTransformersCommand
	from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/ApplyTransformersCommand';
import {
	JavaAnnotatedElement,
	JavaClass
} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';

test('With default config', () => {

	const jpaTransformer = JpaTransformer.withDefaultConfig();

	const javaClassModel = getTransformedJavaClassModel(`
TestEntity
    field int
`, jpaTransformer);

	const testEntityClass = javaClassModel.classes[0];
	expect(testEntityClass.name).toBe('TestEntity');
	checkClassAnnotations(testEntityClass, ['@Entity']);
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
	checkClassAnnotations(testEntityClass, ['@Entity', '@Table(name = "TestEntities")']);
	checkClassFieldsAnnotations(testEntityClass, {
		id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
		field: ['@Column(nullable = false)']
	});

});

function getTransformedJavaClassModel(erdiagramCode: string, jpaTransformer: JpaTransformer) {

	const entityRelationshipModel = new EntityRelationshipModelParser().parseModel(erdiagramCode);

	const classModel = new ClassModelGenerator().generateClassModel(entityRelationshipModel);

	const {
		javaClassModel,
		javaClassModelDescriptorsRepository
	} = new JavaClassModelGenerator().generateJavaClassModel(classModel);

	new ApplyTransformersCommand(
			{
				entityRelationshipModel,
				classModel,
				javaClassModel
			},
			javaClassModelDescriptorsRepository,
			[jpaTransformer]
	).execute();

	return javaClassModel;

}

type ClassFieldsAnnotations = Record<string, string[]>;

function checkClassAnnotations(javaClass: JavaClass, annotationsCode: string[]) {
	expect(formatAnnotations(javaClass)).toStrictEqual(annotationsCode);
}

function checkClassFieldsAnnotations(javaClass: JavaClass, classFieldsAnnotations: ClassFieldsAnnotations) {

	const classFieldsAnnotationsEntries = Object.entries(classFieldsAnnotations);

	classFieldsAnnotationsEntries.forEach(([fieldName, annotationsCode], index) => {
		const field = javaClass.fields[index];
		expect(field.name).toBe(fieldName);
		expect(formatAnnotations(field)).toStrictEqual(annotationsCode);
	});

}

function formatAnnotations(annotatedElement: JavaAnnotatedElement) {
	return annotatedElement.annotations.map(annotations => annotations.format());
}

// TODO add tests for trying the factory methods withDefaultConfig() and builder().(...).build()
