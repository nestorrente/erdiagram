import EntityRelationshipModelParser from '@/erdiagram/parser/EntityRelationshipModelParser';
import {
	Cardinality,
	Direction,
	EntityPropertyType,
	EntityRelationshipModel,
	RelationshipDescriptor
} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {
	createEntityWithoutProperties,
	createSimpleEntityProperty
} from '#/erdiagram/parser/entity-relationship-model-test-utils';

const entityRelationshipModelParser = new EntityRelationshipModelParser();

describe('Entity', () => {

	test('Basic entity', () => {

		const model = entityRelationshipModelParser.parseModel(`

Entity
	name text(10)

		`);

		expect(model).toStrictEqual<EntityRelationshipModel>({
			entities: [
				{
					name: 'Entity',
					identityPropertyName: undefined,
					properties: [
						createSimpleEntityProperty('name', EntityPropertyType.TEXT, [10]),
					]
				}
			],
			relationships: []
		});

	});

	test('Entity with explicit identity property', () => {

		const model = entityRelationshipModelParser.parseModel(`

Entity
	customEntityId identity

		`);

		expect(model).toStrictEqual<EntityRelationshipModel>({
			entities: [
				{
					name: 'Entity',
					identityPropertyName: 'customEntityId',
					properties: []
				}
			],
			relationships: []
		});

	});

	test('Entity with explicit identity property defined as the last property', () => {

		const model = entityRelationshipModelParser.parseModel(`

Entity
	name text(10)
	customEntityId identity

		`);

		expect(model).toStrictEqual<EntityRelationshipModel>({
			entities: [
				{
					name: 'Entity',
					identityPropertyName: 'customEntityId',
					properties: [
						createSimpleEntityProperty('name', EntityPropertyType.TEXT, [10])
					]
				}
			],
			relationships: []
		});

	});

	test('Supported types', () => {

		const model = entityRelationshipModelParser.parseModel(`

Entity
	a bool
	b short
	c int
	d long
	e decimal(10, 2)
	f text(50)
	g date
	h time
	i datetime
	j blob

		`);

		expect(model).toStrictEqual<EntityRelationshipModel>({
			entities: [
				{
					name: 'Entity',
					identityPropertyName: undefined,
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

	});

	test('Optional property', () => {

		const model = entityRelationshipModelParser.parseModel(`

Entity
	num? int

		`);

		expect(model).toStrictEqual<EntityRelationshipModel>({
			entities: [
				{
					name: 'Entity',
					identityPropertyName: undefined,
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

	});

	test('Unique property', () => {

		const model = entityRelationshipModelParser.parseModel(`

Entity
	num! int

		`);

		expect(model).toStrictEqual<EntityRelationshipModel>({
			entities: [
				{
					name: 'Entity',
					identityPropertyName: undefined,
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

	});

});

describe('Relationship', () => {

	test('Directions', () => {

		const model = entityRelationshipModelParser.parseModel(`

A
B
C
D

A -> B
A <- C
A <-> D

		`);

		expect(model).toStrictEqual<EntityRelationshipModel>({
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

	});

	test('Cardinalities', () => {

		const model = entityRelationshipModelParser.parseModel(`

A
B
C
D
E
F
G
H
I
J
K
L
M
N
O
P
Q

A ?<->? B
A ?<-> C
A ?<->1 D
A ?<->* E

A <->? F
A <-> G
A <->1 H
A <->* I

A 1<->? J
A 1<-> K
A 1<->1 L
A 1<->* M

A *<->? N
A *<-> O
A *<->1 P
A *<->* Q

		`);

		expect(model).toStrictEqual<EntityRelationshipModel>({
			entities: [...'ABCDEFGHIJKLMNOPQ'].map(createEntityWithoutProperties),
			relationships: (
					[
						[Cardinality.ZERO_OR_ONE, Cardinality.ZERO_OR_ONE, 'B'],
						[Cardinality.ZERO_OR_ONE, Cardinality.ONE, 'C'],
						[Cardinality.ZERO_OR_ONE, Cardinality.ONE, 'D'],
						[Cardinality.ZERO_OR_ONE, Cardinality.MANY, 'E'],
						[Cardinality.ONE, Cardinality.ZERO_OR_ONE, 'F'],
						[Cardinality.ONE, Cardinality.ONE, 'G'],
						[Cardinality.ONE, Cardinality.ONE, 'H'],
						[Cardinality.ONE, Cardinality.MANY, 'I'],
						[Cardinality.ONE, Cardinality.ZERO_OR_ONE, 'J'],
						[Cardinality.ONE, Cardinality.ONE, 'K'],
						[Cardinality.ONE, Cardinality.ONE, 'L'],
						[Cardinality.ONE, Cardinality.MANY, 'M'],
						[Cardinality.MANY, Cardinality.ZERO_OR_ONE, 'N'],
						[Cardinality.MANY, Cardinality.ONE, 'O'],
						[Cardinality.MANY, Cardinality.ONE, 'P'],
						[Cardinality.MANY, Cardinality.MANY, 'Q'],
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

	});

	test('Aliases and relationship name', () => {

		const model = entityRelationshipModelParser.parseModel(`

A
B
C
D
E

A aAlias <-> B
A <-> C cAlias
A <-> D (AToD)
A aAlias *<->* E eAlias (AToE)

		`);

		expect(model).toStrictEqual<EntityRelationshipModel>({
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

	});

	test('Allow unknown entities', () => {

		const model = new EntityRelationshipModelParser({
			allowUnknownEntities: true
		}).parseModel('A -> B');

		expect(model).toStrictEqual<EntityRelationshipModel>({
			entities: [],
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
				}
			]
		});

	});

});

describe('Comment', () => {

	test('Comment line', () => {

		const model = entityRelationshipModelParser.parseModel(`

# This is a comment
Entity
	# This is another comment
	name text(10)

		`);

		expect(model).toStrictEqual<EntityRelationshipModel>({
			entities: [
				{
					name: 'Entity',
					identityPropertyName: undefined,
					properties: [
						createSimpleEntityProperty('name', EntityPropertyType.TEXT, [10]),
					]
				}
			],
			relationships: []
		});

	});

});

describe('Errors', () => {

	test('Entity with optional identity property', () => {

		expect(() => {

			entityRelationshipModelParser.parseModel(`

Entity
	customEntityId? identity

			`);

		}).toThrow(Error);

	});

	test('Entity with unique identity property', () => {

		expect(() => {

			entityRelationshipModelParser.parseModel(`

Entity
	customEntityId! identity

			`);

		}).toThrow(Error);

	});

	test('Entity with identity property with length', () => {

		expect(() => {

			entityRelationshipModelParser.parseModel(`

Entity
	customEntityId identity(10)

			`);

		}).toThrow(Error);

	});

	test('Entity with more than one identity property', () => {

		expect(() => {

			entityRelationshipModelParser.parseModel(`

Entity
	customEntityId1 identity
	customEntityId2 identity

			`);

		}).toThrow(Error);

	});

	test('Entity with duplicated property name', () => {

		expect(() => {

			entityRelationshipModelParser.parseModel(`

Entity
	name text(20)
	name text(20)

			`);

		}).toThrow(Error);

	});

	test('Entity with property name equals to its explicit identity', () => {

		expect(() => {

			entityRelationshipModelParser.parseModel(`

Entity
	prop identity
	prop bool

			`);

		}).toThrow(Error);

	});

	test('Entity with property of unknown type', () => {
		expect(() => {
			entityRelationshipModelParser.parseModel(`

Entity
	prop unknownType

			`);
		}).toThrow(Error);
	});

	test('Repeated entity name', () => {
		expect(() => {
			entityRelationshipModelParser.parseModel(`

Entity
Entity

			`);
		}).toThrow(Error);
	});

	test('Unknown statement type', () => {
		expect(() => {
			entityRelationshipModelParser.parseModel('a a');
		}).toThrow(Error);
	});

	test('Entity property statement outside an entity', () => {
		expect(() => {
			entityRelationshipModelParser.parseModel('    name text(30)');
		}).toThrow(Error);
	});

	test('Unknown entity in relationship\'s left member', () => {
		expect(() => {
			entityRelationshipModelParser.parseModel(`
Entity
Unknown <-> Entity
			`);
		}).toThrow(Error);
	});

	test('Unknown entity in relationship\'s right member', () => {
		expect(() => {
			entityRelationshipModelParser.parseModel(`
Entity
Entity <-> Unknown
			`);
		}).toThrow(Error);
	});

});
