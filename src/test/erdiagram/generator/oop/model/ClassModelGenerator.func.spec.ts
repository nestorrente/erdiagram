import {
	Cardinality,
	Direction,
	EntityPropertyType,
	RelationshipDescriptor
} from '@/erdiagram/parser/entity-relationship-model-types';
import ClassModelGenerator from '@/erdiagram/generator/oop/model/ClassModelGenerator';
import {ClassDescriptor, ClassFieldDescriptor, ClassModel} from '@/erdiagram/generator/oop/model/class-model-types';
import {
	createEntityWithoutProperties,
	createSimpleEntityProperty
} from '#/erdiagram/parser/entity-relationship-model-test-utils';

function createIdClassField(name: string = 'id') {
	return {
		name,
		list: false,
		nullable: true,
		primitiveType: EntityPropertyType.IDENTIFIER
	};
}

function createSimplePrimitiveClassField(name: string, type: EntityPropertyType, nullable: boolean = false): ClassFieldDescriptor {
	return {
		name,
		list: false,
		nullable,
		primitiveType: type
	};
}

function createSimpleEntityClassField(name: string, type: string, nullable: boolean = false): ClassFieldDescriptor {
	return {
		name,
		list: false,
		nullable,
		entityType: type
	};
}

function createListEntityClassField(name: string, type: string, nullable: boolean = false): ClassFieldDescriptor {
	return {
		name,
		list: true,
		nullable,
		entityType: type
	};
}

const classModelGenerator = new ClassModelGenerator();

describe('Entity', () => {

	test('Basic entity', () => {

		const classModel = classModelGenerator.generateClassModel({
			entities: [
				{
					name: 'Entity',
					identifierPropertyName: undefined,
					properties: [
						createSimpleEntityProperty('name', EntityPropertyType.TEXT, [10]),
					]
				}
			],
			relationships: []
		});

		expect(classModel).toStrictEqual<ClassModel>({
			classes: [
				{
					name: 'Entity',
					fields: [
						createIdClassField(),
						createSimplePrimitiveClassField('name', EntityPropertyType.TEXT)
					]
				}
			]
		});

	});

	test('Entity with explicit identifier property', () => {

		const classModel = classModelGenerator.generateClassModel({
			entities: [
				{
					name: 'Entity',
					identifierPropertyName: 'customEntityId',
					properties: []
				}
			],
			relationships: []
		});

		expect(classModel).toStrictEqual<ClassModel>({
			classes: [
				{
					name: 'Entity',
					fields: [
						createIdClassField('customEntityId')
					]
				}
			]
		});

	});

	test('Entity with explicit identifier property defined as the last property', () => {

		const classModel = classModelGenerator.generateClassModel({
			entities: [
				{
					name: 'Entity',
					identifierPropertyName: 'customEntityId',
					properties: [
						createSimpleEntityProperty('name', EntityPropertyType.TEXT, [10])
					]
				}
			],
			relationships: []
		});

		expect(classModel).toStrictEqual<ClassModel>({
			classes: [
				{
					name: 'Entity',
					fields: [
						createIdClassField('customEntityId'),
						createSimplePrimitiveClassField('name', EntityPropertyType.TEXT)
					]
				}
			]
		});

	});

	test('Supported types', () => {

		const classModel = classModelGenerator.generateClassModel({
			entities: [
				{
					name: 'Entity',
					identifierPropertyName: undefined,
					properties: [
						createSimpleEntityProperty('a', EntityPropertyType.BOOLEAN),
						createSimpleEntityProperty('b', EntityPropertyType.SHORT),
						createSimpleEntityProperty('c', EntityPropertyType.INT),
						createSimpleEntityProperty('d', EntityPropertyType.LONG),
						createSimpleEntityProperty('e', EntityPropertyType.DECIMAL, [10, 2]),
						createSimpleEntityProperty('f', EntityPropertyType.TEXT, [50]),
						createSimpleEntityProperty('g', EntityPropertyType.DATE),
						createSimpleEntityProperty('h', EntityPropertyType.TIME),
						createSimpleEntityProperty('i', EntityPropertyType.DATETIME),
						createSimpleEntityProperty('j', EntityPropertyType.BLOB),
					]
				}
			],
			relationships: []
		});

		expect(classModel).toStrictEqual<ClassModel>({
			classes: [
				{
					name: 'Entity',
					fields: [
						createIdClassField(),
						createSimplePrimitiveClassField('a', EntityPropertyType.BOOLEAN),
						createSimplePrimitiveClassField('b', EntityPropertyType.SHORT),
						createSimplePrimitiveClassField('c', EntityPropertyType.INT),
						createSimplePrimitiveClassField('d', EntityPropertyType.LONG),
						createSimplePrimitiveClassField('e', EntityPropertyType.DECIMAL),
						createSimplePrimitiveClassField('f', EntityPropertyType.TEXT),
						createSimplePrimitiveClassField('g', EntityPropertyType.DATE),
						createSimplePrimitiveClassField('h', EntityPropertyType.TIME),
						createSimplePrimitiveClassField('i', EntityPropertyType.DATETIME),
						createSimplePrimitiveClassField('j', EntityPropertyType.BLOB),
					]
				}
			]
		});

	});

	test('Optional property', () => {

		const classModel = classModelGenerator.generateClassModel({
			entities: [
				{
					name: 'Entity',
					identifierPropertyName: undefined,
					properties: [
						{
							name: 'num',
							type: EntityPropertyType.INT,
							length: [],
							optional: true,
							unique: false,
							autoincremental: false
						},
					]
				}
			],
			relationships: []
		});

		expect(classModel).toStrictEqual<ClassModel>({
			classes: [
				{
					name: 'Entity',
					fields: [
						createIdClassField(),
						createSimplePrimitiveClassField('num', EntityPropertyType.INT, true)
					]
				}
			]
		});

	});

	test('Unique property', () => {

		const classModel = classModelGenerator.generateClassModel({
			entities: [
				{
					name: 'Entity',
					identifierPropertyName: undefined,
					properties: [
						{
							name: 'num',
							type: EntityPropertyType.INT,
							length: [],
							optional: false,
							unique: true,
							autoincremental: false
						},
					]
				}
			],
			relationships: []
		});

		expect(classModel).toStrictEqual<ClassModel>({
			classes: [
				{
					name: 'Entity',
					fields: [
						createIdClassField(),
						createSimplePrimitiveClassField('num', EntityPropertyType.INT)
					]
				}
			]
		});

	});

	test('Autoincremental property', () => {

		const classModel = classModelGenerator.generateClassModel({
			entities: [
				{
					name: 'Entity',
					identifierPropertyName: undefined,
					properties: [
						{
							name: 'num',
							type: EntityPropertyType.INT,
							length: [],
							optional: false,
							unique: false,
							autoincremental: true
						},
					]
				}
			],
			relationships: []
		});

		expect(classModel).toStrictEqual<ClassModel>({
			classes: [
				{
					name: 'Entity',
					fields: [
						createIdClassField(),
						createSimplePrimitiveClassField('num', EntityPropertyType.INT)
					]
				}
			]
		});

	});

});

describe('Relationship', () => {

	test('Directions', () => {

		const classModel = classModelGenerator.generateClassModel({
			entities: [...'ABCD'].map(createEntityWithoutProperties),
			relationships: [
				{
					relationshipName: undefined,
					direction: Direction.LEFT_TO_RIGHT,
					leftMember: {
						entity: 'A',
						entityAlias: 'a',
						cardinality: Cardinality.ONE
					},
					rightMember: {
						entity: 'B',
						entityAlias: 'b',
						cardinality: Cardinality.ONE
					}
				},
				{
					relationshipName: undefined,
					direction: Direction.RIGHT_TO_LEFT,
					leftMember: {
						entity: 'A',
						entityAlias: 'a',
						cardinality: Cardinality.ONE
					},
					rightMember: {
						entity: 'C',
						entityAlias: 'c',
						cardinality: Cardinality.ONE
					}
				},
				{
					relationshipName: undefined,
					direction: Direction.BIDIRECTIONAL,
					leftMember: {
						entity: 'A',
						entityAlias: 'a',
						cardinality: Cardinality.ONE
					},
					rightMember: {
						entity: 'D',
						entityAlias: 'd',
						cardinality: Cardinality.ONE
					}
				}
			]
		});

		expect(classModel).toStrictEqual<ClassModel>({
			classes: [
				{
					name: 'A',
					fields: [
						createIdClassField(),
						createSimpleEntityClassField('b', 'B'),
						createSimpleEntityClassField('d', 'D')
					]
				},
				{
					name: 'B',
					fields: [
						createIdClassField()
					]
				},
				{
					name: 'C',
					fields: [
						createIdClassField(),
						createSimpleEntityClassField('a', 'A')
					]
				},
				{
					name: 'D',
					fields: [
						createIdClassField(),
						createSimpleEntityClassField('a', 'A')
					]
				}
			]
		});

	});

	test('Cardinalities', () => {

		const classModel = classModelGenerator.generateClassModel({
			entities: [...'ABCDEFGHIJ'].map(createEntityWithoutProperties),
			relationships: (
					[
						[Cardinality.ZERO_OR_ONE, Cardinality.ZERO_OR_ONE, 'B'],
						[Cardinality.ZERO_OR_ONE, Cardinality.ONE, 'C'],
						[Cardinality.ZERO_OR_ONE, Cardinality.MANY, 'D'],
						[Cardinality.ONE, Cardinality.ZERO_OR_ONE, 'E'],
						[Cardinality.ONE, Cardinality.ONE, 'F'],
						[Cardinality.ONE, Cardinality.MANY, 'G'],
						[Cardinality.MANY, Cardinality.ZERO_OR_ONE, 'H'],
						[Cardinality.MANY, Cardinality.ONE, 'I'],
						[Cardinality.MANY, Cardinality.MANY, 'J'],
					] as [Cardinality, Cardinality, string][]
			).map(([leftCardinality, rightCardinality, rightEntity]): RelationshipDescriptor => {
				return {
					relationshipName: undefined,
					direction: Direction.BIDIRECTIONAL,
					leftMember: {
						entity: 'A',
						entityAlias: 'a',
						cardinality: leftCardinality
					},
					rightMember: {
						entity: rightEntity,
						entityAlias: rightEntity.toLowerCase(),
						cardinality: rightCardinality
					}
				};
			})
		});

		expect(classModel).toStrictEqual<ClassModel>({
			classes: [
				{
					name: 'A',
					fields: [
						createIdClassField(),
						...(
								[
									['B', 'b', false, true],
									['C', 'c', false, false],
									['D', 'ds', true, false],
									['E', 'e', false, true],
									['F', 'f', false, false],
									['G', 'gs', true, false],
									['H', 'h', false, true],
									['I', 'i', false, false],
									['J', 'js', true, false],
								] as [string, string, boolean, boolean][]
						).map(([entityName, fieldName, list, nullable]): ClassFieldDescriptor => {
							return {
								name: fieldName,
								list,
								nullable,
								entityType: entityName
							};
						})
					]
				},
				...(
						[
							['B', false, true],
							['C', false, true],
							['D', false, true],
							['E', false, false],
							['F', false, false],
							['G', false, false],
							['H', true, false],
							['I', true, false],
							['J', true, false],
						] as [string, boolean, boolean][]
				).map(([entityName, list, nullable]): ClassDescriptor => {
					return {
						name: entityName,
						fields: [
							createIdClassField(),
							{
								name: list ? 'as' : 'a',
								list,
								nullable,
								entityType: 'A'
							}
						]
					};
				})
			]
		});

	});

	test('Aliases and relationship name', () => {

		const classModel = classModelGenerator.generateClassModel({
			entities: [...'ABCDE'].map(createEntityWithoutProperties),
			relationships: [
				{
					relationshipName: undefined,
					direction: Direction.BIDIRECTIONAL,
					leftMember: {
						entity: 'A',
						entityAlias: 'aAlias',
						cardinality: Cardinality.ONE
					},
					rightMember: {
						entity: 'B',
						entityAlias: 'b',
						cardinality: Cardinality.ONE
					}
				},
				{
					relationshipName: undefined,
					direction: Direction.BIDIRECTIONAL,
					leftMember: {
						entity: 'A',
						entityAlias: 'a',
						cardinality: Cardinality.ONE
					},
					rightMember: {
						entity: 'C',
						entityAlias: 'cAlias',
						cardinality: Cardinality.ONE
					}
				},
				{
					relationshipName: 'AToD',
					direction: Direction.BIDIRECTIONAL,
					leftMember: {
						entity: 'A',
						entityAlias: 'a',
						cardinality: Cardinality.ONE
					},
					rightMember: {
						entity: 'D',
						entityAlias: 'd',
						cardinality: Cardinality.ONE
					}
				},
				{
					relationshipName: 'AToE',
					direction: Direction.BIDIRECTIONAL,
					leftMember: {
						entity: 'A',
						entityAlias: 'aAlias',
						cardinality: Cardinality.MANY
					},
					rightMember: {
						entity: 'E',
						entityAlias: 'eAlias',
						cardinality: Cardinality.MANY
					}
				}
			]
		});

		expect(classModel).toStrictEqual<ClassModel>({
			classes: [
				{
					name: 'A',
					fields: [
						createIdClassField(),
						createSimpleEntityClassField('b', 'B'),
						createSimpleEntityClassField('cAlias', 'C'),
						createSimpleEntityClassField('d', 'D'),
						createListEntityClassField('eAliases', 'E')
					]
				},
				{
					name: 'B',
					fields: [
						createIdClassField(),
						createSimpleEntityClassField('aAlias', 'A')
					]
				},
				{
					name: 'C',
					fields: [
						createIdClassField(),
						createSimpleEntityClassField('a', 'A')
					]
				},
				{
					name: 'D',
					fields: [
						createIdClassField(),
						createSimpleEntityClassField('a', 'A')
					]
				},
				{
					name: 'E',
					fields: [
						createIdClassField(),
						createListEntityClassField('aAliases', 'A')
					]
				}
			]
		});

	});

});
