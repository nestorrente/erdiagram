import {
	Cardinality,
	Direction,
	EntityPropertyType,
	RelationshipDescriptor
} from '@/erdiagram/parser/entity-relationship-model-types';
import DatabaseModelGenerator from '@/erdiagram/generator/database/model/DatabaseModelGenerator';
import {
	createEntityWithoutProperties,
	createSimpleEntityProperty
} from '#/erdiagram/parser/entity-relationship-model-test-utils';
import {DatabaseModel} from '@/erdiagram/generator/database/model/database-model-types';
import StandardIdNamingStrategies from '@/erdiagram/generator/common/id-naming-strategy/StandardIdNamingStrategies';
import {capitalizeWord} from '@/erdiagram/util/string-utils';
import {createSimpleTableColumn, createTableReference, createUniqueTableReference} from './database-model-test-utils';

const databaseModelGenerator = new DatabaseModelGenerator();

describe('Entity', () => {

	test('Basic entity', () => {

		const databaseModel = databaseModelGenerator.generateDatabaseModel({
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

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				{
					name: 'Entity',
					identifierColumnName: 'id',
					columns: [
						createSimpleTableColumn('name', EntityPropertyType.TEXT, [10])
					],
					references: []
				}
			]
		});

	});

	test('Entity with explicit identifier property', () => {

		const databaseModel = databaseModelGenerator.generateDatabaseModel({
			entities: [
				{
					name: 'Entity',
					identifierPropertyName: 'customEntityId',
					properties: []
				}
			],
			relationships: []
		});

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				{
					name: 'Entity',
					identifierColumnName: 'customEntityId',
					columns: [],
					references: []
				}
			]
		});

	});

	test('Entity with explicit identifier property defined as the last property', () => {

		const databaseModel = databaseModelGenerator.generateDatabaseModel({
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

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				{
					name: 'Entity',
					identifierColumnName: 'customEntityId',
					columns: [
						createSimpleTableColumn('name', EntityPropertyType.TEXT, [10])
					],
					references: []
				}
			]
		});

	});

	test('Supported types', () => {

		const databaseModel = databaseModelGenerator.generateDatabaseModel({
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

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				{
					name: 'Entity',
					identifierColumnName: 'id',
					columns: [
						createSimpleTableColumn('a', EntityPropertyType.BOOLEAN),
						createSimpleTableColumn('b', EntityPropertyType.SHORT),
						createSimpleTableColumn('c', EntityPropertyType.INT),
						createSimpleTableColumn('d', EntityPropertyType.LONG),
						createSimpleTableColumn('e', EntityPropertyType.DECIMAL, [10, 2]),
						createSimpleTableColumn('f', EntityPropertyType.TEXT, [50]),
						createSimpleTableColumn('g', EntityPropertyType.DATE),
						createSimpleTableColumn('h', EntityPropertyType.TIME),
						createSimpleTableColumn('i', EntityPropertyType.DATETIME),
						createSimpleTableColumn('j', EntityPropertyType.BLOB),
					],
					references: []
				}
			]
		});

	});

	test('Optional property', () => {

		const databaseModel = databaseModelGenerator.generateDatabaseModel({
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

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				{
					name: 'Entity',
					identifierColumnName: 'id',
					columns: [
						{
							name: 'num',
							notNull: false,
							autoincremental: false,
							unique: false,
							type: EntityPropertyType.INT,
							length: []
						}
					],
					references: []
				}
			]
		});

	});

	test('Unique property', () => {

		const databaseModel = databaseModelGenerator.generateDatabaseModel({
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
						}
					]
				}
			],
			relationships: []
		});

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				{
					name: 'Entity',
					identifierColumnName: 'id',
					columns: [
						{
							name: 'num',
							notNull: true,
							autoincremental: false,
							unique: true,
							type: EntityPropertyType.INT,
							length: []
						}
					],
					references: []
				}
			]
		});

	});

	test('Autoincremental property', () => {

		const databaseModel = databaseModelGenerator.generateDatabaseModel({
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

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				{
					name: 'Entity',
					identifierColumnName: 'id',
					columns: [
						{
							name: 'num',
							notNull: true,
							autoincremental: true,
							unique: false,
							type: EntityPropertyType.INT,
							length: []
						}
					],
					references: []
				}
			]
		});

	});

});

describe('Relationship', () => {

	test('Directions', () => {

		const databaseModel = databaseModelGenerator.generateDatabaseModel({
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

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				{
					name: 'A',
					identifierColumnName: 'id',
					columns: [],
					references: [
						createUniqueTableReference('bId', 'B'),
						createUniqueTableReference('cId', 'C'),
						createUniqueTableReference('dId', 'D')
					]
				},
				{
					name: 'B',
					identifierColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'C',
					identifierColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'D',
					identifierColumnName: 'id',
					columns: [],
					references: []
				}
			]
		});

	});

	test('Cardinalities', () => {

		const databaseModel = databaseModelGenerator.generateDatabaseModel({
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

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				{
					name: 'A',
					identifierColumnName: 'id',
					columns: [],
					references: [
						createUniqueTableReference('bId', 'B', false),
						createUniqueTableReference('cId', 'C'),
						createUniqueTableReference('eId', 'E', false),
						createUniqueTableReference('fId', 'F'),
						createTableReference('hId', 'H', false),
						createTableReference('iId', 'I'),
					]
				},
				{
					name: 'B',
					identifierColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'C',
					identifierColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'D',
					identifierColumnName: 'id',
					columns: [],
					references: [
						createTableReference('aId', 'A', false)
					]
				},
				{
					name: 'E',
					identifierColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'F',
					identifierColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'G',
					identifierColumnName: 'id',
					columns: [],
					references: [
						createTableReference('aId', 'A')
					]
				},
				{
					name: 'H',
					identifierColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'I',
					identifierColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'J',
					identifierColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'AJ',
					identifierColumnName: 'id',
					columns: [],
					references: [
						createTableReference('aId', 'A'),
						createTableReference('jId', 'J'),
					]
				},
			]
		});

	});

	test('Aliases and relationship name', () => {

		const databaseModel = databaseModelGenerator.generateDatabaseModel({
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

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				{
					name: 'A',
					identifierColumnName: 'id',
					columns: [],
					references: [
						createUniqueTableReference('bId', 'B'),
						createUniqueTableReference('cAliasId', 'C'),
						createUniqueTableReference('dId', 'D'),
					]
				},
				{
					name: 'B',
					identifierColumnName: 'id',
					columns: [
					],
					references: []
				},
				{
					name: 'C',
					identifierColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'D',
					identifierColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'E',
					identifierColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'AToE',
					identifierColumnName: 'id',
					columns: [],
					references: [
						createTableReference('aAliasId', 'A'),
						createTableReference('eAliasId', 'E'),
					]
				}
			]
		});

	});

});

describe('Config', () => {

	test('Use plural table names', () => {

		const databaseModel = new DatabaseModelGenerator({
			usePluralTableNames: true
		}).generateDatabaseModel({
			entities: [
				createEntityWithoutProperties('A'),
				createEntityWithoutProperties('B'),
			],
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
					relationshipName: 'AsToBs',
					direction: Direction.BIDIRECTIONAL,
					leftMember: {
						entity: 'A',
						entityAlias: 'a',
						cardinality: Cardinality.MANY
					},
					rightMember: {
						entity: 'B',
						entityAlias: 'b',
						cardinality: Cardinality.MANY
					}
				}
			]
		});

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				{
					name: 'As',
					identifierColumnName: 'id',
					columns: [],
					references: [
						createUniqueTableReference('bId', 'Bs'),
					]
				},
				{
					name: 'Bs',
					identifierColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'AsToBs',
					identifierColumnName: 'id',
					columns: [],
					references: [
						createTableReference('aId', 'As'),
						createTableReference('bId', 'Bs'),
					]
				}
			]
		});

	});

	test('Use another standard ID naming strategy', () => {

		const databaseModel = new DatabaseModelGenerator({
			idNamingStrategy: StandardIdNamingStrategies.ENTITY_NAME_PREFIX
		}).generateDatabaseModel({
			entities: [
				createEntityWithoutProperties('A'),
				createEntityWithoutProperties('B'),
			],
			relationships: [
				{
					relationshipName: 'AToB',
					direction: Direction.BIDIRECTIONAL,
					leftMember: {
						entity: 'A',
						entityAlias: 'a',
						cardinality: Cardinality.MANY
					},
					rightMember: {
						entity: 'B',
						entityAlias: 'b',
						cardinality: Cardinality.MANY
					}
				}
			]
		});

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				{
					name: 'A',
					identifierColumnName: 'aId',
					columns: [],
					references: []
				},
				{
					name: 'B',
					identifierColumnName: 'bId',
					columns: [],
					references: []
				},
				{
					name: 'AToB',
					identifierColumnName: 'aToBId',
					columns: [],
					references: [
						{
							columnName: 'aId',
							targetTableName: 'A',
							targetTableIdentifierColumnName: 'aId',
							notNull: true,
							unique: false
						},
						{
							columnName: 'bId',
							targetTableName: 'B',
							targetTableIdentifierColumnName: 'bId',
							notNull: true,
							unique: false
						}
					]
				}
			]
		});

	});

	test('Use a custom ID naming strategy', () => {

		const databaseModel = new DatabaseModelGenerator({
			idNamingStrategy: entityName => `the${capitalizeWord(entityName)}Id`,
		}).generateDatabaseModel({
			entities: [
				createEntityWithoutProperties('A'),
				createEntityWithoutProperties('B'),
			],
			relationships: [
				{
					relationshipName: 'AToB',
					direction: Direction.BIDIRECTIONAL,
					leftMember: {
						entity: 'A',
						entityAlias: 'a',
						cardinality: Cardinality.MANY
					},
					rightMember: {
						entity: 'B',
						entityAlias: 'b',
						cardinality: Cardinality.MANY
					}
				}
			]
		});

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				{
					name: 'A',
					identifierColumnName: 'theAId',
					columns: [],
					references: []
				},
				{
					name: 'B',
					identifierColumnName: 'theBId',
					columns: [],
					references: []
				},
				{
					name: 'AToB',
					identifierColumnName: 'theAToBId',
					columns: [],
					references: [
						{
							columnName: 'aId',
							targetTableName: 'A',
							targetTableIdentifierColumnName: 'theAId',
							notNull: true,
							unique: false
						},
						{
							columnName: 'bId',
							targetTableName: 'B',
							targetTableIdentifierColumnName: 'theBId',
							notNull: true,
							unique: false
						}
					]
				}
			]
		});

	});

	test('Combine all', () => {

		const databaseModel = new DatabaseModelGenerator({
			usePluralTableNames: true,
			idNamingStrategy: StandardIdNamingStrategies.ENTITY_NAME_PREFIX
		}).generateDatabaseModel({
			entities: [
				createEntityWithoutProperties('A'),
				createEntityWithoutProperties('B'),
			],
			relationships: [
				{
					relationshipName: 'AsToBs',
					direction: Direction.BIDIRECTIONAL,
					leftMember: {
						entity: 'A',
						entityAlias: 'a',
						cardinality: Cardinality.MANY
					},
					rightMember: {
						entity: 'B',
						entityAlias: 'b',
						cardinality: Cardinality.MANY
					}
				}
			]
		});

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				{
					name: 'As',
					identifierColumnName: 'aId',
					columns: [],
					references: []
				},
				{
					name: 'Bs',
					identifierColumnName: 'bId',
					columns: [],
					references: []
				},
				{
					name: 'AsToBs',
					// TODO this may not be the expected behaviour, but we have to find the right way to solve it
					identifierColumnName: 'asToBsId',
					// identifierColumnName: 'aToBId',
					columns: [],
					references: [
						{
							columnName: 'aId',
							targetTableName: 'As',
							targetTableIdentifierColumnName: 'aId',
							notNull: true,
							unique: false
						},
						{
							columnName: 'bId',
							targetTableName: 'Bs',
							targetTableIdentifierColumnName: 'bId',
							notNull: true,
							unique: false
						}
					]
				}
			]
		});

	});

})
