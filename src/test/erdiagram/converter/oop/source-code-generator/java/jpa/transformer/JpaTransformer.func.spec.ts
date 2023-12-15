import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';
import { JpaTransformer } from '@/erdiagram/converter/oop/source-code-generator/java/jpa/transformer/JpaTransformer';
import DatabaseModelGenerator from '@/erdiagram/converter/database/model/DatabaseModelGenerator';
import { PartialJpaConfig } from '@/erdiagram/converter/oop/source-code-generator/java/jpa/config/JpaConfig';
import { getTransformedJavaClassModel } from '#/erdiagram/converter/oop/source-code-generator/java/util/transformer-test-utils';
import {
	checkAnnotations,
	checkClassFieldsAnnotations,
	checkClassGettersAnnotations
} from '#/erdiagram/converter/oop/source-code-generator/java/util/annotation-test-utils';

const defaultJpaTransformer = createJpaTransformer();

test('Simple entity', () => {

	const javaClassModel = getTransformedJavaClassModel(`
TestEntity
    field int
`, defaultJpaTransformer);

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
`, defaultJpaTransformer);

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

	const jpaTransformer = createJpaTransformer({
		annotateGetters: true
	});

	const javaClassModel = getTransformedJavaClassModel(`
TestEntity
    field int
`, jpaTransformer);

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

		const jpaTransformer = createJpaTransformer({
			useExplicitTableName: true
		});

		const javaClassModel = getTransformedJavaClassModel(`
TestEntity
`, jpaTransformer);

		const testEntityClass = javaClassModel.classes[0];
		expect(testEntityClass.name).toBe('TestEntity');
		checkAnnotations(testEntityClass, [
			'@Entity',
			'@Table(name = "TestEntity")'
		]);

	});

	test('Alternative case', () => {

		const jpaTransformer = createJpaTransformer({
			useExplicitTableName: true,
			tableNameCaseFormat: StandardCaseFormats.UPPER_UNDERSCORE
		});

		const javaClassModel = getTransformedJavaClassModel(`
TestEntity
`, jpaTransformer);

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

		const jpaTransformer = createJpaTransformer({
			useExplicitColumnName: true
		});

		const javaClassModel = getTransformedJavaClassModel(`
A
    intField? int
B
    booleanField bool
A *-> B
`, jpaTransformer);

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

		const jpaTransformer = createJpaTransformer({
			useExplicitColumnName: true,
			columnNameCaseFormat: StandardCaseFormats.UPPER_UNDERSCORE
		});

		const javaClassModel = getTransformedJavaClassModel(`
A
    intField? int
B
    booleanField bool
A *-> B
`, jpaTransformer);

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
`, defaultJpaTransformer);

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			b1: ['@OneToOne(optional = false)', '@JoinColumn(name = "b1Id", nullable = false)'],
			b2: ['@OneToOne', '@JoinColumn(name = "b2Id")'],
			b3: ['@OneToOne(optional = false)', '@JoinColumn(name = "b3Id", nullable = false)'],
			b4: ['@OneToOne', '@JoinColumn(name = "b4Id")']
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
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)']
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
`, defaultJpaTransformer);

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)']
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
			a4: ['@OneToOne', '@JoinTable(name = "A", inverseJoinColumns = @JoinColumn(name = "b4Id"))']
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
`, defaultJpaTransformer);

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			b1: ['@OneToOne(optional = false)', '@JoinColumn(name = "b1Id", nullable = false)'],
			b2: ['@OneToOne', '@JoinColumn(name = "b2Id")'],
			b3: ['@OneToOne(optional = false)', '@JoinColumn(name = "b3Id", nullable = false)'],
			b4: ['@OneToOne', '@JoinColumn(name = "b4Id")']
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
			a4: ['@OneToOne(mappedBy = "b4")']
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
`, defaultJpaTransformer);

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			b1: ['@ManyToOne(optional = false)', '@JoinColumn(name = "b1Id", nullable = false)'],
			b2: ['@ManyToOne', '@JoinColumn(name = "b2Id")']
		});
		checkClassGettersAnnotations(aClass, {
			id: [],
			b1: [],
			b2: []
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)']
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
`, defaultJpaTransformer);

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)']
		});
		checkClassGettersAnnotations(aClass, {
			id: []
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			a1s: ['@OneToMany', '@JoinTable(name = "A", inverseJoinColumns = @JoinColumn(name = "b1Id", nullable = false))'],
			a2s: ['@OneToMany', '@JoinTable(name = "A", inverseJoinColumns = @JoinColumn(name = "b2Id"))']
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
`, defaultJpaTransformer);

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			b1: ['@ManyToOne(optional = false)', '@JoinColumn(name = "b1Id", nullable = false)'],
			b2: ['@ManyToOne', '@JoinColumn(name = "b2Id")']
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
			a2s: ['@OneToMany(mappedBy = "b2")']
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
`, defaultJpaTransformer);

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			b1s: ['@OneToMany', '@JoinTable(name = "B", inverseJoinColumns = @JoinColumn(name = "a1Id", nullable = false))'],
			b2s: ['@OneToMany', '@JoinTable(name = "B", inverseJoinColumns = @JoinColumn(name = "a2Id"))']
		});
		checkClassGettersAnnotations(aClass, {
			id: [],
			b1s: [],
			b2s: []
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)']
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
`, defaultJpaTransformer);

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)']
		});
		checkClassGettersAnnotations(aClass, {
			id: []
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			a1: ['@ManyToOne(optional = false)', '@JoinColumn(name = "a1Id", nullable = false)'],
			a2: ['@ManyToOne', '@JoinColumn(name = "a2Id")']
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
`, defaultJpaTransformer);

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			b1s: ['@OneToMany(mappedBy = "a1")'],
			b2s: ['@OneToMany(mappedBy = "a2")']
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
			a2: ['@ManyToOne', '@JoinColumn(name = "a2Id")']
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
`, defaultJpaTransformer);

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			bs: ['@ManyToMany', '@JoinTable(name = "AB", joinColumns = @JoinColumn(name = "aId", nullable = false), inverseJoinColumns = @JoinColumn(name = "bId", nullable = false))']
		});
		checkClassGettersAnnotations(aClass, {
			id: [],
			bs: []
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)']
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
`, defaultJpaTransformer);

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)']
		});
		checkClassGettersAnnotations(aClass, {
			id: []
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			as: ['@ManyToMany', '@JoinTable(name = "AB", joinColumns = @JoinColumn(name = "bId", nullable = false), inverseJoinColumns = @JoinColumn(name = "aId", nullable = false))']
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
`, defaultJpaTransformer);

		const aClass = javaClassModel.classes[0];
		expect(aClass.name).toBe('A');
		checkClassFieldsAnnotations(aClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			bs: ['@ManyToMany', '@JoinTable(name = "AB", joinColumns = @JoinColumn(name = "aId", nullable = false), inverseJoinColumns = @JoinColumn(name = "bId", nullable = false))']
		});
		checkClassGettersAnnotations(aClass, {
			id: [],
			bs: []
		});

		const bClass = javaClassModel.classes[1];
		expect(bClass.name).toBe('B');
		checkClassFieldsAnnotations(bClass, {
			id: ['@Id', '@GeneratedValue(strategy = GenerationType.IDENTITY)'],
			as: ['@ManyToMany(mappedBy = "bs")']
		});
		checkClassGettersAnnotations(bClass, {
			id: [],
			as: []
		});

	});

});

function createJpaTransformer(config?: PartialJpaConfig) {
	return new JpaTransformer(new DatabaseModelGenerator(), config);
}

// TODO add tests for trying the factory methods withDefaultConfig() and builder().(...).build()
