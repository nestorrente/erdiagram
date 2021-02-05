import EntityRelationshipModelParser from '@/erdiagram/parser/EntityRelationshipModelParser';
import {
	Cardinality,
	Direction,
	EntityPropertyDescriptor,
	EntityPropertyType,
	EntityRelationshipModel,
	RelationshipDescriptor
} from '../../../main/erdiagram/parser/entity-relationship-model-types';

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
	j datetime

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
						createSimpleProperty('j', EntityPropertyType.DATETIME),
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
			entities: [
				{name: 'A', properties: []},
				{name: 'B', properties: []},
				{name: 'C', properties: []},
				{name: 'D', properties: []},
			],
			relationships: [
				{
					relationShipName: undefined,
					direction: Direction.RIGHT,
					leftMember: {
						entity: 'A',
						entityAlias: 'a',
						cardinality: Cardinality.ONE,
						optional: false,
						unique: false
					},
					rightMember: {
						entity: 'B',
						entityAlias: 'b',
						cardinality: Cardinality.ONE,
						optional: false,
						unique: false
					}
				},
				{
					relationShipName: undefined,
					direction: Direction.LEFT,
					leftMember: {
						entity: 'A',
						entityAlias: 'a',
						cardinality: Cardinality.ONE,
						optional: false,
						unique: false
					},
					rightMember: {
						entity: 'C',
						entityAlias: 'c',
						cardinality: Cardinality.ONE,
						optional: false,
						unique: false
					}
				},
				{
					relationShipName: undefined,
					direction: Direction.BOTH,
					leftMember: {
						entity: 'A',
						entityAlias: 'a',
						cardinality: Cardinality.ONE,
						optional: false,
						unique: false
					},
					rightMember: {
						entity: 'D',
						entityAlias: 'd',
						cardinality: Cardinality.ONE,
						optional: false,
						unique: false
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

A <-> B
A <->1 C
A <->* D
A *<-> E
A *<->* F
A *<->1 G

		`);

		expect(model).toStrictEqual<EntityRelationshipModel>({
			entities: [
				{name: 'A', properties: []},
				{name: 'B', properties: []},
				{name: 'C', properties: []},
				{name: 'D', properties: []},
				{name: 'E', properties: []},
				{name: 'F', properties: []},
				{name: 'G', properties: []},
			],
			relationships: (
					[
						[Cardinality.ONE, Cardinality.ONE, 'B'],
						[Cardinality.ONE, Cardinality.ONE, 'C'],
						[Cardinality.ONE, Cardinality.MANY, 'D'],
						[Cardinality.MANY, Cardinality.ONE, 'E'],
						[Cardinality.MANY, Cardinality.MANY, 'F'],
						[Cardinality.MANY, Cardinality.ONE, 'G']
					] as [Cardinality, Cardinality, string][]
			).map(([leftCardinality, rightCardinality, rightEntity]): RelationshipDescriptor => {
				return {
					relationShipName: undefined,
					direction: Direction.BOTH,
					leftMember: {
						entity: 'A',
						entityAlias: 'a',
						cardinality: leftCardinality,
						optional: false,
						unique: false
					},
					rightMember: {
						entity: rightEntity,
						entityAlias: rightEntity.toLowerCase(),
						cardinality: rightCardinality,
						optional: false,
						unique: false
					}
				};
			})
		});

	});

	test('Optionality, uniqueness and aliases and relationship name', () => {

		const model = entityRelationshipModelParser.parseModel(`

A
B
C
D
E

A <->? B
A <->! C
A <->?! D
A <->!? E eAlias (RelationshipName)

		`);

		expect(model).toStrictEqual<EntityRelationshipModel>({
			entities: [
				{name: 'A', properties: []},
				{name: 'B', properties: []},
				{name: 'C', properties: []},
				{name: 'D', properties: []},
				{name: 'E', properties: []},
			],
			relationships: [
				{
					relationShipName: undefined,
					direction: Direction.BOTH,
					leftMember: {
						entity: 'A',
						entityAlias: 'a',
						cardinality: Cardinality.ONE,
						optional: false,
						unique: false
					},
					rightMember: {
						entity: 'B',
						entityAlias: 'b',
						cardinality: Cardinality.ONE,
						optional: true,
						unique: false
					}
				},
				{
					relationShipName: undefined,
					direction: Direction.BOTH,
					leftMember: {
						entity: 'A',
						entityAlias: 'a',
						cardinality: Cardinality.ONE,
						optional: false,
						unique: false
					},
					rightMember: {
						entity: 'C',
						entityAlias: 'c',
						cardinality: Cardinality.ONE,
						optional: false,
						unique: true
					}
				},
				{
					relationShipName: undefined,
					direction: Direction.BOTH,
					leftMember: {
						entity: 'A',
						entityAlias: 'a',
						cardinality: Cardinality.ONE,
						optional: false,
						unique: false
					},
					rightMember: {
						entity: 'D',
						entityAlias: 'd',
						cardinality: Cardinality.ONE,
						optional: true,
						unique: true
					}
				},
				{
					relationShipName: 'RelationshipName',
					direction: Direction.BOTH,
					leftMember: {
						entity: 'A',
						entityAlias: 'a',
						cardinality: Cardinality.ONE,
						optional: false,
						unique: false
					},
					rightMember: {
						entity: 'E',
						entityAlias: 'eAlias',
						cardinality: Cardinality.ONE,
						optional: true,
						unique: true
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
					direction: Direction.RIGHT,
					leftMember: {
						entity: 'A',
						entityAlias: 'a',
						cardinality: Cardinality.ONE,
						optional: false,
						unique: false
					},
					rightMember: {
						entity: 'B',
						entityAlias: 'b',
						cardinality: Cardinality.ONE,
						optional: false,
						unique: false
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
