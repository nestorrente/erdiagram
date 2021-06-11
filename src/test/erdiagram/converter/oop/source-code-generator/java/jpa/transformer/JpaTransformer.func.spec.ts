import EntityRelationshipModelParser from '@/erdiagram/parser/EntityRelationshipModelParser';
import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';
import JavaClassModelGenerator
	from '@/erdiagram/converter/oop/source-code-generator/java/model/generator/JavaClassModelGenerator';
import {JpaTransformer} from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/JpaTransformer';
import DatabaseModelGenerator from '@/erdiagram/converter/database/model/DatabaseModelGenerator';
import ApplyTransformersCommand
	from '@/erdiagram/converter/oop/source-code-generator/java/model/transformer/ApplyTransformersCommand';
import {
	JavaAnnotatedElement,
	JavaClass
} from '@/erdiagram/converter/oop/source-code-generator/java/model/java-class-model-types';
import {PartialJpaConfig} from '@/erdiagram/converter/oop/source-code-generator/java/jpa/config/JpaConfig';
import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';

test('Simple entity', () => {

	const javaClassModel = getTransformedJavaClassModel(`
TestEntity
    field int
`);

	const testEntityClass = javaClassModel.classes[0];
	expect(testEntityClass.name).toBe('TestEntity');
	checkAnnotations(testEntityClass, ['@Entity']);
	checkClassFieldsAnnotations(testEntityClass, {
		id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
		field: ['@Column(nullable = false)']
	});
	checkClassGettersAnnotations(testEntityClass, {
		id: [],
		field: []
	});

});

test('Nullable column', () => {

	const javaClassModel = getTransformedJavaClassModel(`
TestEntity
    nullableField? int
`);

	const testEntityClass = javaClassModel.classes[0];
	expect(testEntityClass.name).toBe('TestEntity');
	checkClassFieldsAnnotations(testEntityClass, {
		id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
		nullableField: []
	});
	checkClassGettersAnnotations(testEntityClass, {
		id: [],
		nullableField: []
	});

});

test('Annotate getters', () => {

	const javaClassModel = getTransformedJavaClassModel(`
TestEntity
    field int
`, {
		annotateGetters: true
	});

	const testEntityClass = javaClassModel.classes[0];
	expect(testEntityClass.name).toBe('TestEntity');
	checkAnnotations(testEntityClass, ['@Entity']);
	checkClassFieldsAnnotations(testEntityClass, {
		id: [],
		field: []
	});
	checkClassGettersAnnotations(testEntityClass, {
		id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
		field: ['@Column(nullable = false)']
	});

});

describe('Use explicit table name', () => {

	test('Default case', () => {

		const javaClassModel = getTransformedJavaClassModel(`
TestEntity
`, {
			useExplicitTableName: true
		});

		const testEntityClass = javaClassModel.classes[0];
		expect(testEntityClass.name).toBe('TestEntity');
		checkAnnotations(testEntityClass, [
			'@Entity',
			'@Table(name = "TestEntity")'
		]);

	});

	test('Alternative case', () => {

		const javaClassModel = getTransformedJavaClassModel(`
TestEntity
`, {
			useExplicitTableName: true,
			tableNameCaseFormat: StandardCaseFormats.UPPER_UNDERSCORE
		});

		const testEntityClass = javaClassModel.classes[0];
		expect(testEntityClass.name).toBe('TestEntity');
		checkAnnotations(testEntityClass, [
			'@Entity',
			'@Table(name = "TEST_ENTITY")'
		]);

	});

});

describe('Use explicit column name', () => {

	test('Default case', () => {

		const javaClassModel = getTransformedJavaClassModel(`
A
    intField? int
B
    booleanField bool
A *-> B
`, {
			useExplicitColumnName: true
		});

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
			intField: ['@Column(name = "intField")'],
			b: ['@ManyToOne(optional = false)', '@JoinColumn(name = "bId", nullable = false)']
		});
		checkClassGettersAnnotations(aClass, {
			id: [],
			intField: [],
			b: []
		});

		const bClass = javaClassModel.classes[1];
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "id")'],
			booleanField: ['@Column(name = "booleanField", nullable = false)']
		});
		checkClassGettersAnnotations(bClass, {
			id: [],
			booleanField: []
		});

	});

	test('Alternative case', () => {

		const javaClassModel = getTransformedJavaClassModel(`
A
    intField? int
B
    booleanField bool
A *-> B
`, {
			useExplicitColumnName: true,
			columnNameCaseFormat: StandardCaseFormats.UPPER_UNDERSCORE
		});

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "ID")'],
			intField: ['@Column(name = "INT_FIELD")'],
			b: ['@ManyToOne(optional = false)', '@JoinColumn(name = "B_ID", nullable = false)']
		});
		checkClassGettersAnnotations(aClass, {
			id: [],
			intField: [],
			b: []
		});

		const bClass = javaClassModel.classes[1];
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)', '@Column(name = "ID")'],
			booleanField: ['@Column(name = "BOOLEAN_FIELD", nullable = false)']
		});
		checkClassGettersAnnotations(bClass, {
			id: [],
			booleanField: []
		});

	});

});

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
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			b1: ['@OneToOne(optional = false)', '@JoinColumn(name = "b1Id", nullable = false)'],
			b2: ['@OneToOne', '@JoinColumn(name = "b2Id")'],
			b3: ['@OneToOne(optional = false)', '@JoinColumn(name = "b3Id", nullable = false)'],
			b4: ['@OneToOne', '@JoinColumn(name = "b4Id")'],
		});
		checkClassGettersAnnotations(aClass, {
			id: [],
			b1: [],
			b2: [],
			b3: [],
			b4: []
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
		});
		checkClassGettersAnnotations(bClass, {
			id: []
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
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
		});
		checkClassGettersAnnotations(aClass, {
			id: []
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			a1: ['@OneToOne(optional = false)', '@JoinTable(name = "A", inverseJoinColumns = @JoinColumn(name = "b1Id", nullable = false))'],
			a2: ['@OneToOne(optional = false)', '@JoinTable(name = "A", inverseJoinColumns = @JoinColumn(name = "b2Id"))'],
			a3: ['@OneToOne', '@JoinTable(name = "A", inverseJoinColumns = @JoinColumn(name = "b3Id", nullable = false))'],
			a4: ['@OneToOne', '@JoinTable(name = "A", inverseJoinColumns = @JoinColumn(name = "b4Id"))'],
		});
		checkClassGettersAnnotations(bClass, {
			id: [],
			a1: [],
			a2: [],
			a3: [],
			a4: []
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
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			b1: ['@OneToOne(optional = false)', '@JoinColumn(name = "b1Id", nullable = false)'],
			b2: ['@OneToOne', '@JoinColumn(name = "b2Id")'],
			b3: ['@OneToOne(optional = false)', '@JoinColumn(name = "b3Id", nullable = false)'],
			b4: ['@OneToOne', '@JoinColumn(name = "b4Id")'],
		});
		checkClassGettersAnnotations(aClass, {
			id: [],
			b1: [],
			b2: [],
			b3: [],
			b4: []
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			a1: ['@OneToOne(mappedBy = "b1", optional = false)'],
			a2: ['@OneToOne(mappedBy = "b2", optional = false)'],
			a3: ['@OneToOne(mappedBy = "b3")'],
			a4: ['@OneToOne(mappedBy = "b4")'],
		});
		checkClassGettersAnnotations(bClass, {
			id: [],
			a1: [],
			a2: [],
			a3: [],
			a4: []
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
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			b1: ['@ManyToOne(optional = false)', '@JoinColumn(name = "b1Id", nullable = false)'],
			b2: ['@ManyToOne', '@JoinColumn(name = "b2Id")'],
		});
		checkClassGettersAnnotations(aClass, {
			id: [],
			b1: [],
			b2: []
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
		});
		checkClassGettersAnnotations(bClass, {
			id: []
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
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
		});
		checkClassGettersAnnotations(aClass, {
			id: []
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			a1s: ['@OneToMany', '@JoinTable(name = "A", inverseJoinColumns = @JoinColumn(name = "b1Id", nullable = false))'],
			a2s: ['@OneToMany', '@JoinTable(name = "A", inverseJoinColumns = @JoinColumn(name = "b2Id"))'],
		});
		checkClassGettersAnnotations(bClass, {
			id: [],
			a1s: [],
			a2s: []
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
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			b1: ['@ManyToOne(optional = false)', '@JoinColumn(name = "b1Id", nullable = false)'],
			b2: ['@ManyToOne', '@JoinColumn(name = "b2Id")'],
		});
		checkClassGettersAnnotations(aClass, {
			id: [],
			b1: [],
			b2: []
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			a1s: ['@OneToMany(mappedBy = "b1")'],
			a2s: ['@OneToMany(mappedBy = "b2")'],
		});
		checkClassGettersAnnotations(bClass, {
			id: [],
			a1s: [],
			a2s: []
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
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			b1s: ['@OneToMany', '@JoinTable(name = "B", inverseJoinColumns = @JoinColumn(name = "a1Id", nullable = false))'],
			b2s: ['@OneToMany', '@JoinTable(name = "B", inverseJoinColumns = @JoinColumn(name = "a2Id"))'],
		});
		checkClassGettersAnnotations(aClass, {
			id: [],
			b1s: [],
			b2s: []
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
		});
		checkClassGettersAnnotations(bClass, {
			id: []
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
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
		});
		checkClassGettersAnnotations(aClass, {
			id: []
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			a1: ['@ManyToOne(optional = false)', '@JoinColumn(name = "a1Id", nullable = false)'],
			a2: ['@ManyToOne', '@JoinColumn(name = "a2Id")'],
		});
		checkClassGettersAnnotations(bClass, {
			id: [],
			a1: [],
			a2: []
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
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			b1s: ['@OneToMany(mappedBy = "a1")'],
			b2s: ['@OneToMany(mappedBy = "a2")'],
		});
		checkClassGettersAnnotations(aClass, {
			id: [],
			b1s: [],
			b2s: []
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			a1: ['@ManyToOne(optional = false)', '@JoinColumn(name = "a1Id", nullable = false)'],
			a2: ['@ManyToOne', '@JoinColumn(name = "a2Id")'],
		});
		checkClassGettersAnnotations(bClass, {
			id: [],
			a1: [],
			a2: []
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
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			bs: ['@ManyToMany', '@JoinTable(name = "AB", joinColumns = @JoinColumn(name = "aId", nullable = false), inverseJoinColumns = @JoinColumn(name = "bId", nullable = false))'],
		});
		checkClassGettersAnnotations(aClass, {
			id: [],
			bs: []
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
		});
		checkClassGettersAnnotations(bClass, {
			id: []
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
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
		});
		checkClassGettersAnnotations(aClass, {
			id: []
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			as: ['@ManyToMany', '@JoinTable(name = "AB", joinColumns = @JoinColumn(name = "bId", nullable = false), inverseJoinColumns = @JoinColumn(name = "aId", nullable = false))'],
		});
		checkClassGettersAnnotations(bClass, {
			id: [],
			as: []
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
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			bs: ['@ManyToMany', '@JoinTable(name = "AB", joinColumns = @JoinColumn(name = "aId", nullable = false), inverseJoinColumns = @JoinColumn(name = "bId", nullable = false))'],
		});
		checkClassGettersAnnotations(aClass, {
			id: [],
			bs: []
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			as: ['@ManyToMany(mappedBy = "bs")'],
		});
		checkClassGettersAnnotations(bClass, {
			id: [],
			as: []
		});

	});

});

function getTransformedJavaClassModel(erdiagramCode: string, config?: PartialJpaConfig) {

	const entityRelationshipModel = new EntityRelationshipModelParser().parseModel(erdiagramCode);

	const classModel = new ClassModelGenerator().generateClassModel(entityRelationshipModel);

	const {
		javaClassModel,
		javaClassModelDescriptorsRepository
	} = new JavaClassModelGenerator().generateJavaClassModel(classModel);

	const jpaTransformer = new JpaTransformer(new DatabaseModelGenerator(), config);

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
