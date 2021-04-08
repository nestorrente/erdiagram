import {
	Cardinality,
	Direction,
	EntityPropertyType,
	RelationshipDescriptor
} from '@/erdiagram/parser/types/entity-relationship-model-types';
import ClassModelGenerator from '@/erdiagram/generator/oop/model/ClassModelGenerator';
import {ClassDescriptor, ClassFieldDescriptor, ClassModel} from '@/erdiagram/generator/oop/model/class-model-types';
import {
	createEntityWithoutProperties,
	createSimpleEntityProperty
} from '#/erdiagram/parser/entity-relationship-model-test-utils';
import StandardIdNamingStrategies from '@/erdiagram/generator/common/id-naming-strategy/StandardIdNamingStrategies';
import {capitalizeWord} from '@/erdiagram/util/string-utils';
import {createEntityClassField, createIdClassField, createPrimitiveClassField} from './class-model-test-utils';

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
						createPrimitiveClassField('name', EntityPropertyType.TEXT)
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
						createPrimitiveClassField('name', EntityPropertyType.TEXT)
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
						createPrimitiveClassField('a', EntityPropertyType.BOOLEAN),
						createPrimitiveClassField('b', EntityPropertyType.SHORT),
						createPrimitiveClassField('c', EntityPropertyType.INT),
						createPrimitiveClassField('d', EntityPropertyType.LONG),
						createPrimitiveClassField('e', EntityPropertyType.DECIMAL),
						createPrimitiveClassField('f', EntityPropertyType.TEXT),
						createPrimitiveClassField('g', EntityPropertyType.DATE),
						createPrimitiveClassField('h', EntityPropertyType.TIME),
						createPrimitiveClassField('i', EntityPropertyType.DATETIME),
						createPrimitiveClassField('j', EntityPropertyType.BLOB),
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
							unique: false
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
						createPrimitiveClassField('num', EntityPropertyType.INT, {nullable: true})
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
							unique: true
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
						createPrimitiveClassField('num', EntityPropertyType.INT)
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
						createEntityClassField('b', 'B'),
						createEntityClassField('d', 'D')
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
						createEntityClassField('a', 'A')
					]
				},
				{
					name: 'D',
					fields: [
						createIdClassField(),
						createEntityClassField('a', 'A')
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
						createEntityClassField('b', 'B'),
						createEntityClassField('cAlias', 'C'),
						createEntityClassField('d', 'D'),
						createEntityClassField('eAliases', 'E', {list: true})
					]
				},
				{
					name: 'B',
					fields: [
						createIdClassField(),
						createEntityClassField('aAlias', 'A')
					]
				},
				{
					name: 'C',
					fields: [
						createIdClassField(),
						createEntityClassField('a', 'A')
					]
				},
				{
					name: 'D',
					fields: [
						createIdClassField(),
						createEntityClassField('a', 'A')
					]
				},
				{
					name: 'E',
					fields: [
						createIdClassField(),
						createEntityClassField('aAliases', 'A', {list: true})
					]
				}
			]
		});

	});

});

describe('Config', () => {

	test('Use another standard ID naming strategy', () => {

		const databaseModel = new ClassModelGenerator({
			idNamingStrategy: StandardIdNamingStrategies.ENTITY_NAME_PREFIX
		}).generateClassModel({
			entities: [
				createEntityWithoutProperties('A'),
				createEntityWithoutProperties('Another'),
			],
			relationships: []
		});

		expect(databaseModel).toStrictEqual<ClassModel>({
			classes: [
				{
					name: 'A',
					fields: [
						createIdClassField('aId')
					]
				},
				{
					name: 'Another',
					fields: [
						createIdClassField('anotherId')
					]
				}
			]
		});

	});

	test('Use a custom ID naming strategy', () => {

		const databaseModel = new ClassModelGenerator({
			idNamingStrategy: entityName => `the${capitalizeWord(entityName)}Id`,
		}).generateClassModel({
			entities: [
				createEntityWithoutProperties('A'),
				createEntityWithoutProperties('Another'),
			],
			relationships: []
		});

		expect(databaseModel).toStrictEqual<ClassModel>({
			classes: [
				{
					name: 'A',
					fields: [
						createIdClassField('theAId')
					]
				},
				{
					name: 'Another',
					fields: [
						createIdClassField('theAnotherId')
					]
				}
			]
		});

	});

});
