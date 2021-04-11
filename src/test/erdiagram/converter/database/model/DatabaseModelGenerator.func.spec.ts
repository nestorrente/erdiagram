import {
	Cardinality,
	Direction,
	EntityPropertyType,
	RelationshipDescriptor
} from '@/erdiagram/parser/types/entity-relationship-model-types';
import DatabaseModelGenerator from '@/erdiagram/converter/database/model/DatabaseModelGenerator';
import {
	createEntityWithoutProperties,
	createSimpleEntityProperty
} from '#/erdiagram/parser/entity-relationship-model-test-utils';
import {DatabaseModel} from '@/erdiagram/converter/database/model/database-model-types';
import StandardIdNamingStrategies from '@/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies';
import {capitalizeWord} from '@/erdiagram/util/string-utils';
import {createSimpleTableColumn, createTableReference} from './database-model-test-utils';

const databaseModelGenerator = new DatabaseModelGenerator();

describe('Entity', () => {

	test('Basic entity', () => {

		const databaseModel = databaseModelGenerator.generateDatabaseModel({
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

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				{
					name: 'Entity',
					identityColumnName: 'id',
					columns: [
						createSimpleTableColumn('name', EntityPropertyType.TEXT, [10])
					],
					references: []
				}
			]
		});

	});

	test('Entity with explicit identity property', () => {

		const databaseModel = databaseModelGenerator.generateDatabaseModel({
			entities: [
				{
					name: 'Entity',
					identityPropertyName: 'customEntityId',
					properties: []
				}
			],
			relationships: []
		});

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				{
					name: 'Entity',
					identityColumnName: 'customEntityId',
					columns: [],
					references: []
				}
			]
		});

	});

	test('Entity with explicit identity property defined as the last property', () => {

		const databaseModel = databaseModelGenerator.generateDatabaseModel({
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

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				{
					name: 'Entity',
					identityColumnName: 'customEntityId',
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

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				{
					name: 'Entity',
					identityColumnName: 'id',
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

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				{
					name: 'Entity',
					identityColumnName: 'id',
					columns: [
						{
							name: 'num',
							notNull: false,
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
					identityPropertyName: undefined,
					properties: [
						{
							name: 'num',
							type: EntityPropertyType.INT,
							length: [],
							optional: false,
							unique: true
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
					identityColumnName: 'id',
					columns: [
						{
							name: 'num',
							notNull: true,
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
					identityColumnName: 'id',
					columns: [],
					references: [
						createTableReference('bId', 'B', {unique: true}),
						createTableReference('cId', 'C', {unique: true}),
						createTableReference('dId', 'D', {unique: true})
					]
				},
				{
					name: 'B',
					identityColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'C',
					identityColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'D',
					identityColumnName: 'id',
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
					identityColumnName: 'id',
					columns: [],
					references: [
						createTableReference('bId', 'B', {unique: true, notNull: false}),
						createTableReference('cId', 'C', {unique: true}),
						createTableReference('eId', 'E', {unique: true, notNull: false}),
						createTableReference('fId', 'F', {unique: true}),
						createTableReference('hId', 'H', {notNull: false}),
						createTableReference('iId', 'I'),
					]
				},
				{
					name: 'B',
					identityColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'C',
					identityColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'D',
					identityColumnName: 'id',
					columns: [],
					references: [
						createTableReference('aId', 'A', {notNull: false})
					]
				},
				{
					name: 'E',
					identityColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'F',
					identityColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'G',
					identityColumnName: 'id',
					columns: [],
					references: [
						createTableReference('aId', 'A')
					]
				},
				{
					name: 'H',
					identityColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'I',
					identityColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'J',
					identityColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'AJ',
					identityColumnName: 'id',
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
					identityColumnName: 'id',
					columns: [],
					references: [
						createTableReference('bId', 'B', {unique: true}),
						createTableReference('cAliasId', 'C', {unique: true}),
						createTableReference('dId', 'D', {unique: true}),
					]
				},
				{
					name: 'B',
					identityColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'C',
					identityColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'D',
					identityColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'E',
					identityColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'AToE',
					identityColumnName: 'id',
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
					identityColumnName: 'id',
					columns: [],
					references: [
						createTableReference('bId', 'Bs', {unique: true}),
					]
				},
				{
					name: 'Bs',
					identityColumnName: 'id',
					columns: [],
					references: []
				},
				{
					name: 'AsToBs',
					identityColumnName: 'id',
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
					identityColumnName: 'aId',
					columns: [],
					references: []
				},
				{
					name: 'B',
					identityColumnName: 'bId',
					columns: [],
					references: []
				},
				{
					name: 'AToB',
					identityColumnName: 'aToBId',
					columns: [],
					references: [
						{
							columnName: 'aId',
							targetTableName: 'A',
							targetTableIdentityColumnName: 'aId',
							notNull: true,
							unique: false
						},
						{
							columnName: 'bId',
							targetTableName: 'B',
							targetTableIdentityColumnName: 'bId',
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
					identityColumnName: 'theAId',
					columns: [],
					references: []
				},
				{
					name: 'B',
					identityColumnName: 'theBId',
					columns: [],
					references: []
				},
				{
					name: 'AToB',
					identityColumnName: 'theAToBId',
					columns: [],
					references: [
						{
							columnName: 'aId',
							targetTableName: 'A',
							targetTableIdentityColumnName: 'theAId',
							notNull: true,
							unique: false
						},
						{
							columnName: 'bId',
							targetTableName: 'B',
							targetTableIdentityColumnName: 'theBId',
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
					identityColumnName: 'aId',
					columns: [],
					references: []
				},
				{
					name: 'Bs',
					identityColumnName: 'bId',
					columns: [],
					references: []
				},
				{
					name: 'AsToBs',
					// FIXME this may not be the expected behaviour, but we have to find the right way to solve it
					identityColumnName: 'asToBsId',
					// identityColumnName: 'aToBId',
					columns: [],
					references: [
						{
							columnName: 'aId',
							targetTableName: 'As',
							targetTableIdentityColumnName: 'aId',
							notNull: true,
							unique: false
						},
						{
							columnName: 'bId',
							targetTableName: 'Bs',
							targetTableIdentityColumnName: 'bId',
							notNull: true,
							unique: false
						}
					]
				}
			]
		});

	});

});
