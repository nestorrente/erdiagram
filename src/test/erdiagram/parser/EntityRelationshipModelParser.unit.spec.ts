import EntityRelationshipModelParser from '@/erdiagram/parser/EntityRelationshipModelParser';
import {
	Cardinality,
	Direction,
	EntityDescriptor,
	EntityPropertyDescriptor,
	EntityPropertyType,
	EntityRelationshipModel,
	RelationshipDescriptor
} from '@/erdiagram/parser/entity-relationship-model-types';

function createEntityWithoutProperties(name: string): EntityDescriptor {
	return {
		name,
		properties: []
	};
}

function createSimpleProperty(name: string, type: EntityPropertyType, length: number[] = []): EntityPropertyDescriptor {
	return {
		name,
		type,
		length,
		optional: false,
		unique: false,
		autoincremental: false
	};
}

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
					properties: [
						createSimpleProperty('name', EntityPropertyType.TEXT, [10]),
					]
				}
			],
			relationships: []
		});

	});

	test('Entity with explicit identifier property', () => {

		const model = entityRelationshipModelParser.parseModel(`

Entity
	customEntityId identifier

		`);

		expect(model).toStrictEqual<EntityRelationshipModel>({
			entities: [
				{
					name: 'Entity',
					identifierPropertyName: 'customEntityId',
					properties: []
				}
			],
			relationships: []
		});

	});

	test('Entity with explicit identifier property defined as the last property', () => {

		const model = entityRelationshipModelParser.parseModel(`

Entity
	name text(10)
	customEntityId identifier

		`);

		expect(model).toStrictEqual<EntityRelationshipModel>({
			entities: [
				{
					name: 'Entity',
					identifierPropertyName: 'customEntityId',
					properties: [
						createSimpleProperty('name', EntityPropertyType.TEXT, [10])
					]
				}
			],
			relationships: []
		});

	});

	test('Entity with more than one identifier property', () => {

		expect(() => {

			const model = entityRelationshipModelParser.parseModel(`

Entity
	customEntityId1 identifier
	customEntityId2 identifier

			`);

		}).toThrow(Error);

	});

	test('Entity with duplicated property name', () => {

		expect(() => {

			const model = entityRelationshipModelParser.parseModel(`

Entity
	name text(20)
	name text(20)

			`);

		}).toThrow(Error);

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
					properties: [
						createSimpleProperty('a', EntityPropertyType.BOOLEAN),
						createSimpleProperty('b', EntityPropertyType.SHORT),
						createSimpleProperty('c', EntityPropertyType.INT),
						createSimpleProperty('d', EntityPropertyType.LONG),
						createSimpleProperty('e', EntityPropertyType.DECIMAL, [10, 2]),
						createSimpleProperty('f', EntityPropertyType.TEXT, [50]),
						createSimpleProperty('g', EntityPropertyType.DATE),
						createSimpleProperty('h', EntityPropertyType.TIME),
						createSimpleProperty('i', EntityPropertyType.DATETIME),
						createSimpleProperty('j', EntityPropertyType.BLOB),
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

	});

	test('Autoincremental property', () => {

		const model = entityRelationshipModelParser.parseModel(`

Entity
	num+ int

		`);

		expect(model).toStrictEqual<EntityRelationshipModel>({
			entities: [
				{
					name: 'Entity',
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
					relationShipName: undefined,
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
					relationShipName: undefined,
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
					relationShipName: undefined,
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
					relationShipName: undefined,
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
A <-> D (RelationshipName)
A aAlias <-> E eAlias (RelationshipName)

		`);

		expect(model).toStrictEqual<EntityRelationshipModel>({
			entities: [...'ABCDE'].map(createEntityWithoutProperties),
			relationships: [
				{
					relationShipName: undefined,
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
					relationShipName: undefined,
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
					relationShipName: 'RelationshipName',
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
					relationShipName: 'RelationshipName',
					direction: Direction.BIDIRECTIONAL,
					leftMember: {
						entity: 'A',
						entityAlias: 'aAlias',
						cardinality: Cardinality.ONE
					},
					rightMember: {
						entity: 'E',
						entityAlias: 'eAlias',
						cardinality: Cardinality.ONE
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
					relationShipName: undefined,
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
					properties: [
						createSimpleProperty('name', EntityPropertyType.TEXT, [10]),
					]
				}
			],
			relationships: []
		});

	});

});
