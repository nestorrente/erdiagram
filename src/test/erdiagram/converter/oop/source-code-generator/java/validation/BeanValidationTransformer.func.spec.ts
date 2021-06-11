import EntityRelationshipModelParser from '@/erdiagram/parser/EntityRelationshipModelParser';
import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';
import JavaClassModelGenerator
	from '@/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaClassModelGenerator';
import ApplyTransformersCommand
	from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/ApplyTransformersCommand';
import {
	JavaAnnotatedElement,
	JavaClass
} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import BeanValidationTransformer
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/BeanValidationTransformer';
import {PartialBeanValidationConfig} from '@/erdiagram/converter/oop/source-code-generator/java/validation/config/BeanValidationConfig';

test('Simple entity', () => {

	const javaClassModel = getTransformedJavaClassModel(`
TestEntity
    field int
`);

	const testEntityClass = javaClassModel.classes[0];
	expect(testEntityClass.name).toBe('TestEntity');
	checkAnnotations(testEntityClass, []);
	checkClassFieldsAnnotations(testEntityClass, {
		id: [],
		field: ['@NotNull']
	});

});

function getTransformedJavaClassModel(erdiagramCode: string, config?: PartialBeanValidationConfig) {

	const entityRelationshipModel = new EntityRelationshipModelParser().parseModel(erdiagramCode);

	const classModel = new ClassModelGenerator().generateClassModel(entityRelationshipModel);

	const {
		javaClassModel,
		javaClassModelDescriptorsRepository
	} = new JavaClassModelGenerator().generateJavaClassModel(classModel);

	const jpaTransformer = new BeanValidationTransformer(config);

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

function checkAnnotations(annotatedElement: JavaAnnotatedElement, annotationsCode: string[]) {
	expect(formatAnnotations(annotatedElement)).toStrictEqual(annotationsCode);
}

function checkClassFieldsAnnotations(javaClass: JavaClass, classFieldsAnnotations: ClassFieldsAnnotations) {

	const classFieldsAnnotationsEntries = Object.entries(classFieldsAnnotations);

	classFieldsAnnotationsEntries.forEach(([fieldName, annotationsCode], index) => {

		const javaField = javaClass.fields.find(field => field.name === fieldName);

		if (javaField == null) {
			throw new Error(`Field ${fieldName} doesn't exists in class ${javaClass.name}`);
		}

		checkAnnotations(javaField, annotationsCode);

	});

}

function checkClassGettersAnnotations(javaClass: JavaClass, classFieldsAnnotations: ClassFieldsAnnotations) {

	const classFieldsAnnotationsEntries = Object.entries(classFieldsAnnotations);

	classFieldsAnnotationsEntries.forEach(([fieldName, annotationsCode], index) => {

		const javaField = javaClass.fields.find(field => field.name === fieldName);

		if (javaField == null) {
			throw new Error(`Field ${fieldName} doesn't exists in class ${javaClass.name}`);
		}

		expect(javaField.getter).toBeDefined();
		checkAnnotations(javaField.getter!, annotationsCode);

	});

}

function formatAnnotations(annotatedElement: JavaAnnotatedElement) {
	return annotatedElement.annotations.map(annotations => annotations.format());
}

// TODO add tests for trying the factory methods withDefaultConfig() and builder().(...).build()
