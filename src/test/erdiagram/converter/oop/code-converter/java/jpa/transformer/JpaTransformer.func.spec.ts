import EntityRelationshipModelParser from '@/erdiagram/parser/EntityRelationshipModelParser';
import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';
import JavaClassModelGenerator
	from '@/erdiagram/converter/oop/code-converter/java/model/generator/JavaClassModelGenerator';
import {JpaTransformer} from '@/erdiagram/converter/oop/code-converter/java/jpa/transformer/JpaTransformer';
import DatabaseModelGenerator from '@/erdiagram/converter/database/model/DatabaseModelGenerator';
import ApplyTransformersCommand
	from '@/erdiagram/converter/oop/code-converter/java/model/transformer/ApplyTransformersCommand';
import {
	JavaAnnotatedElement,
	JavaClass
} from '@/erdiagram/converter/oop/code-converter/java/model/java-class-model-types';

type ClassFieldsAnnotations = Record<string, string[]>;

describe('One to one (1-1) relationship', () => {

	test('Left to right (->)', () => {

		const javaClassModel = getTransformedJavaClassModel(`
A
B
A a1 -> B b1 (AB1)
A a2 ->? B b2 (AB2)
A a3 ?-> B b3 (AB3)
A a4 ?->? B b4 (AB4)
`);

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
			b1: ['@OneToOne(optional = false)', '@JoinColumn(name = "b1Id", nullable = false)'],
			b2: ['@OneToOne', '@JoinColumn(name = "b2Id")'],
			b3: ['@OneToOne(optional = false)', '@JoinColumn(name = "b3Id", nullable = false)'],
			b4: ['@OneToOne', '@JoinColumn(name = "b4Id")'],
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
		});

	});

	test('Right to left (<-)', () => {

		const javaClassModel = getTransformedJavaClassModel(`
A
B
A a1 <- B b1 (AB1)
A a2 <-? B b2 (AB2)
A a3 ?<- B b3 (AB3)
A a4 ?<-? B b4 (AB4)
`);

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
			a1: ['@OneToOne(optional = false)', '@JoinTable(name = "A", inverseJoinColumns = @JoinColumn(name = "b1Id", nullable = false))'],
			a2: ['@OneToOne(optional = false)', '@JoinTable(name = "A", inverseJoinColumns = @JoinColumn(name = "b2Id"))'],
			a3: ['@OneToOne', '@JoinTable(name = "A", inverseJoinColumns = @JoinColumn(name = "b3Id", nullable = false))'],
			a4: ['@OneToOne', '@JoinTable(name = "A", inverseJoinColumns = @JoinColumn(name = "b4Id"))'],
		});

	});

	test('Bidirectional (<->)', () => {

		const javaClassModel = getTransformedJavaClassModel(`
A
B
A a1 <-> B b1 (AB1)
A a2 <->? B b2 (AB2)
A a3 ?<-> B b3 (AB3)
A a4 ?<->? B b4 (AB4)
`);

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
			b1: ['@OneToOne(optional = false)', '@JoinColumn(name = "b1Id", nullable = false)'],
			b2: ['@OneToOne', '@JoinColumn(name = "b2Id")'],
			b3: ['@OneToOne(optional = false)', '@JoinColumn(name = "b3Id", nullable = false)'],
			b4: ['@OneToOne', '@JoinColumn(name = "b4Id")'],
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
			a1: ['@OneToOne(mappedBy = "b1", optional = false)'],
			a2: ['@OneToOne(mappedBy = "b2", optional = false)'],
			a3: ['@OneToOne(mappedBy = "b3")'],
			a4: ['@OneToOne(mappedBy = "b4")'],
		});

	});

});

describe('Many to one (*-1) relationship', () => {

	test('Left to right (->)', () => {

		const javaClassModel = getTransformedJavaClassModel(`
A
B
A a1 *-> B b1 (AB1)
A a2 *->? B b2 (AB2)
`);

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
			b1: ['@ManyToOne(optional = false)', '@JoinColumn(name = "b1Id", nullable = false)'],
			b2: ['@ManyToOne', '@JoinColumn(name = "b2Id")'],
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
		});

	});

	test('Right to left (<-)', () => {

		const javaClassModel = getTransformedJavaClassModel(`
A
B
A a1 *<- B b1 (AB1)
A a2 *<-? B b2 (AB2)
`);

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
			a1s: ['@OneToMany', '@JoinTable(name = "A", inverseJoinColumns = @JoinColumn(name = "b1Id", nullable = false))'],
			a2s: ['@OneToMany', '@JoinTable(name = "A", inverseJoinColumns = @JoinColumn(name = "b2Id"))'],
		});

	});

	test('Bidirectional (<->)', () => {

		const javaClassModel = getTransformedJavaClassModel(`
A
B
A a1 *<-> B b1 (AB1)
A a2 *<->? B b2 (AB2)
`);

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
			b1: ['@ManyToOne(optional = false)', '@JoinColumn(name = "b1Id", nullable = false)'],
			b2: ['@ManyToOne', '@JoinColumn(name = "b2Id")'],
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
			a1s: ['@OneToMany(mappedBy = "b1")'],
			a2s: ['@OneToMany(mappedBy = "b2")'],
		});

	});

});

describe('One to many (1-*) relationship', () => {

	test('Left to right (->)', () => {

		const javaClassModel = getTransformedJavaClassModel(`
A
B
A a1 ->* B b1 (AB1)
A a2 ?->* B b2 (AB2)
`);

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
			b1s: ['@OneToMany', '@JoinTable(name = "B", inverseJoinColumns = @JoinColumn(name = "a1Id", nullable = false))'],
			b2s: ['@OneToMany', '@JoinTable(name = "B", inverseJoinColumns = @JoinColumn(name = "a2Id"))'],
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
		});

	});

	test('Right to left (<-)', () => {

		const javaClassModel = getTransformedJavaClassModel(`
A
B
A a1 <-* B b1 (AB1)
A a2 ?<-* B b2 (AB2)
`);

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
			a1: ['@ManyToOne(optional = false)', '@JoinColumn(name = "a1Id", nullable = false)'],
			a2: ['@ManyToOne', '@JoinColumn(name = "a2Id")'],
		});

	});

	test('Bidirectional (<->)', () => {

		const javaClassModel = getTransformedJavaClassModel(`
A
B
A a1 <->* B b1 (AB1)
A a2 ?<->* B b2 (AB2)
`);

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
			b1s: ['@OneToMany(mappedBy = "a1")'],
			b2s: ['@OneToMany(mappedBy = "a2")'],
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
			a1: ['@ManyToOne(optional = false)', '@JoinColumn(name = "a1Id", nullable = false)'],
			a2: ['@ManyToOne', '@JoinColumn(name = "a2Id")'],
		});

	});

});

describe('Many to many (*-*) relationship', () => {

	test('Left to right (->)', () => {

		const javaClassModel = getTransformedJavaClassModel(`
A
B
A *->* B
`);

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
			bs: ['@ManyToMany', '@JoinTable(name = "Ab", joinColumns = @JoinColumn(name = "aId", nullable = false), inverseJoinColumns = @JoinColumn(name = "bId", nullable = false))'],
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
		});

	});

	test('Right to left (<-)', () => {

		const javaClassModel = getTransformedJavaClassModel(`
A
B
A *<-* B
`);

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
			as: ['@ManyToMany', '@JoinTable(name = "Ab", joinColumns = @JoinColumn(name = "bId", nullable = false), inverseJoinColumns = @JoinColumn(name = "aId", nullable = false))'],
		});

	});

	test('Bidirectional (<->)', () => {

		const javaClassModel = getTransformedJavaClassModel(`
A
B
A *<->* B
`);

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
			bs: ['@ManyToMany', '@JoinTable(name = "Ab", joinColumns = @JoinColumn(name = "aId", nullable = false), inverseJoinColumns = @JoinColumn(name = "bId", nullable = false))'],
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
			as: ['@ManyToMany(mappedBy = "bs")'],
		});

	});

});

function getTransformedJavaClassModel(erdiagramCode: string) {

	const entityRelationshipModel = new EntityRelationshipModelParser().parseModel(erdiagramCode);
	const classModel = new ClassModelGenerator().generateClassModel(entityRelationshipModel);
	const {
		javaClassModel,
		javaClassModelDescriptorsRepository
	} = new JavaClassModelGenerator().generateJavaClassModel(classModel);

	const jpaTransformer = new JpaTransformer(new DatabaseModelGenerator());

	const applyTransformersCommand = new ApplyTransformersCommand(
			{
				entityRelationshipModel,
				classModel,
				javaClassModel
			},
			javaClassModelDescriptorsRepository,
			[jpaTransformer]
	);

	applyTransformersCommand.execute();

	return javaClassModel;

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
