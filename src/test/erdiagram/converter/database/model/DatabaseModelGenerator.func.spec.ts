import {
	Cardinality,
	Direction,
	EntityDescriptor,
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
import {
	createEntityTable,
	createRelationshipTable,
	createTableColumn,
	createTableReference
} from './database-model-test-utils';

const databaseModelGenerator = new DatabaseModelGenerator();

describe('Entity', () => {

	test('Basic entity', () => {

		const entity: EntityDescriptor = {
			name: 'Entity',
			identityPropertyName: undefined,
			properties: [
				createSimpleEntityProperty('name', EntityPropertyType.TEXT, [10]),
			]
		};

		const databaseModel = databaseModelGenerator.generateDatabaseModel({
			entities: [entity],
			relationships: []
		});

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				createEntityTable('Entity', {
					columns: [
						createTableColumn('name', EntityPropertyType.TEXT, {
							length: [10],
							sourceEntity: entity,
							sourceProperty: entity.properties[0]
						})
					],
					sourceEntity: entity
				})
			]
		});

	});

	test('Entity with explicit identity property', () => {

		const entity: EntityDescriptor = {
			name: 'Entity',
			identityPropertyName: 'customEntityId',
			properties: []
		};

		const databaseModel = databaseModelGenerator.generateDatabaseModel({
			entities: [entity],
			relationships: []
		});

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				createEntityTable('Entity', {
					identityColumnName: 'customEntityId',
					sourceEntity: entity
				})
			]
		});

	});

	test('Entity with explicit identity property defined as the last property', () => {

		const entity: EntityDescriptor = {
			name: 'Entity',
			identityPropertyName: 'customEntityId',
			properties: [
				createSimpleEntityProperty('name', EntityPropertyType.TEXT, [10])
			]
		};

		const databaseModel = databaseModelGenerator.generateDatabaseModel({
			entities: [entity],
			relationships: []
		});

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				createEntityTable('Entity', {
					identityColumnName: 'customEntityId',
					columns: [
						createTableColumn('name', EntityPropertyType.TEXT, {
							length: [10],
							sourceEntity: entity,
							sourceProperty: entity.properties[0]
						})
					],
					sourceEntity: entity
				})
			]
		});

	});

	test('Supported types', () => {

		const entity: EntityDescriptor = {
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
		};

		const databaseModel = databaseModelGenerator.generateDatabaseModel({
			entities: [entity],
			relationships: []
		});

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				createEntityTable('Entity', {
					columns: [
						createTableColumn('a', EntityPropertyType.BOOLEAN, {
							sourceEntity: entity,
							sourceProperty: entity.properties[0]
						}),
						createTableColumn('b', EntityPropertyType.SHORT, {
							sourceEntity: entity,
							sourceProperty: entity.properties[1]
						}),
						createTableColumn('c', EntityPropertyType.INT, {
							sourceEntity: entity,
							sourceProperty: entity.properties[2]
						}),
						createTableColumn('d', EntityPropertyType.LONG, {
							sourceEntity: entity,
							sourceProperty: entity.properties[3]
						}),
						createTableColumn('e', EntityPropertyType.DECIMAL, {
							length: [10, 2],
							sourceEntity: entity,
							sourceProperty: entity.properties[4]
						}),
						createTableColumn('f', EntityPropertyType.TEXT, {
							length: [50],
							sourceEntity: entity,
							sourceProperty: entity.properties[5]
						}),
						createTableColumn('g', EntityPropertyType.DATE, {
							sourceEntity: entity,
							sourceProperty: entity.properties[6]
						}),
						createTableColumn('h', EntityPropertyType.TIME, {
							sourceEntity: entity,
							sourceProperty: entity.properties[7]
						}),
						createTableColumn('i', EntityPropertyType.DATETIME, {
							sourceEntity: entity,
							sourceProperty: entity.properties[8]
						}),
						createTableColumn('j', EntityPropertyType.BLOB, {
							sourceEntity: entity,
							sourceProperty: entity.properties[9]
						}),
					],
					sourceEntity: entity
				})
			]
		});

	});

	test('Optional property', () => {

		const entity: EntityDescriptor = {
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
		};

		const databaseModel = databaseModelGenerator.generateDatabaseModel({
			entities: [entity],
			relationships: []
		});

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				createEntityTable('Entity', {
					columns: [
						createTableColumn('num', EntityPropertyType.INT, {
							notNull: false,
							sourceEntity: entity,
							sourceProperty: entity.properties[0]
						})
					],
					sourceEntity: entity
				})
			]
		});

	});

	test('Unique property', () => {

		const entity: EntityDescriptor = {
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
		};

		const databaseModel = databaseModelGenerator.generateDatabaseModel({
			entities: [entity],
			relationships: []
		});

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				createEntityTable('Entity', {
					columns: [
						createTableColumn('num', EntityPropertyType.INT, {
							unique: true,
							sourceEntity: entity,
							sourceProperty: entity.properties[0]
						})
					],
					sourceEntity: entity
				})
			]
		});

	});

});

describe('Relationship', () => {

	test('Directions', () => {

		const entities = [...'ABCD'].map(createEntityWithoutProperties);

		const relationships: RelationshipDescriptor[] = [
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
		];

		const databaseModel = databaseModelGenerator.generateDatabaseModel({
			entities,
			relationships
		});

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				createEntityTable('A', {
					references: [
						createTableReference('bId', 'B', {
							unique: true,
							sourceRelationship: relationships[0],
							sourceTargetMember: relationships[0].rightMember
						}),
						createTableReference('cId', 'C', {
							unique: true,
							sourceRelationship: relationships[1],
							sourceTargetMember: relationships[1].rightMember
						}),
						createTableReference('dId', 'D', {
							unique: true,
							sourceRelationship: relationships[2],
							sourceTargetMember: relationships[2].rightMember
						})
					],
					sourceEntity: entities[0]
				}),
				createEntityTable('B', {
					sourceEntity: entities[1]
				}),
				createEntityTable('C', {
					sourceEntity: entities[2]
				}),
				createEntityTable('D', {
					sourceEntity: entities[3]
				})
			]
		});

	});

	test('Cardinalities', () => {

		const entities = [...'ABCDEFGHIJ'].map(createEntityWithoutProperties);

		const relationships = (
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
		});

		const databaseModel = databaseModelGenerator.generateDatabaseModel({
			entities,
			relationships
		});

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				createEntityTable('A', {
					columns: [],
					references: [
						createTableReference('bId', 'B', {
							unique: true,
							notNull: false,
							sourceRelationship: relationships[0],
							sourceTargetMember: relationships[0].rightMember
						}),
						createTableReference('cId', 'C', {
							unique: true,
							sourceRelationship: relationships[1],
							sourceTargetMember: relationships[1].rightMember
						}),
						createTableReference('eId', 'E', {
							unique: true,
							notNull: false,
							sourceRelationship: relationships[3],
							sourceTargetMember: relationships[3].rightMember
						}),
						createTableReference('fId', 'F', {
							unique: true,
							sourceRelationship: relationships[4],
							sourceTargetMember: relationships[4].rightMember
						}),
						createTableReference('hId', 'H', {
							notNull: false,
							sourceRelationship: relationships[6],
							sourceTargetMember: relationships[6].rightMember
						}),
						createTableReference('iId', 'I', {
							sourceRelationship: relationships[7],
							sourceTargetMember: relationships[7].rightMember
						}),
					],
					sourceEntity: entities[0]
				}),
				createEntityTable('B', {
					sourceEntity: entities[1]
				}),
				createEntityTable('C', {
					sourceEntity: entities[2]
				}),
				createEntityTable('D', {
					references: [
						createTableReference('aId', 'A', {
							notNull: false,
							sourceRelationship: relationships[2],
							sourceTargetMember: relationships[2].leftMember
						})
					],
					sourceEntity: entities[3]
				}),
				createEntityTable('E', {
					sourceEntity: entities[4]
				}),
				createEntityTable('F', {
					sourceEntity: entities[5]
				}),
				createEntityTable('G', {
					references: [
						createTableReference('aId', 'A', {
							sourceRelationship: relationships[5],
							sourceTargetMember: relationships[5].leftMember
						})
					],
					sourceEntity: entities[6]
				}),
				createEntityTable('H', {
					sourceEntity: entities[7]
				}),
				createEntityTable('I', {
					sourceEntity: entities[8]
				}),
				createEntityTable('J', {
					sourceEntity: entities[9]
				}),
				createRelationshipTable('AJ', {
					references: [
						createTableReference('aId', 'A', {
							sourceRelationship: relationships[8],
							sourceTargetMember: relationships[8].leftMember
						}),
						createTableReference('jId', 'J', {
							sourceRelationship: relationships[8],
							sourceTargetMember: relationships[8].rightMember
						}),
					],
					sourceRelationship: relationships[8]
				}),
			]
		});

	});

	test('Aliases and relationship name', () => {

		const entities = [...'ABCDE'].map(createEntityWithoutProperties);

		const relationships: RelationshipDescriptor[] = [
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
		];

		const databaseModel = databaseModelGenerator.generateDatabaseModel({
			entities,
			relationships
		});

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				createEntityTable('A', {
					references: [
						createTableReference('bId', 'B', {
							unique: true,
							sourceRelationship: relationships[0],
							sourceTargetMember: relationships[0].rightMember
						}),
						createTableReference('cAliasId', 'C', {
							unique: true,
							sourceRelationship: relationships[1],
							sourceTargetMember: relationships[1].rightMember
						}),
						createTableReference('dId', 'D', {
							unique: true,
							sourceRelationship: relationships[2],
							sourceTargetMember: relationships[2].rightMember
						}),
					],
					sourceEntity: entities[0]
				}),
				createEntityTable('B', {
					sourceEntity: entities[1]
				}),
				createEntityTable('C', {
					sourceEntity: entities[2]
				}),
				createEntityTable('D', {
					sourceEntity: entities[3]
				}),
				createEntityTable('E', {
					sourceEntity: entities[4]
				}),
				createRelationshipTable('AToE', {
					references: [
						createTableReference('aAliasId', 'A', {
							sourceRelationship: relationships[3],
							sourceTargetMember: relationships[3].leftMember
						}),
						createTableReference('eAliasId', 'E', {
							sourceRelationship: relationships[3],
							sourceTargetMember: relationships[3].rightMember
						}),
					],
					sourceRelationship: relationships[3]
				})
			]
		});

	});

});

describe('Config', () => {

	test('Use plural table names', () => {

		const customDatabaseModelGenerator = new DatabaseModelGenerator({
			usePluralTableNames: true
		});

		const entities = [
			createEntityWithoutProperties('A'),
			createEntityWithoutProperties('B'),
		];

		const relationships: RelationshipDescriptor[] = [
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
		];

		const databaseModel = customDatabaseModelGenerator.generateDatabaseModel({
			entities,
			relationships
		});

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				createEntityTable('As', {
					references: [
						createTableReference('bId', 'Bs', {
							unique: true,
							sourceRelationship: relationships[0],
							sourceTargetMember: relationships[0].rightMember,
						}),
					],
					sourceEntity: entities[0]
				}),
				createEntityTable('Bs', {
					sourceEntity: entities[1]
				}),
				createRelationshipTable('AsToBs', {
					references: [
						createTableReference('aId', 'As', {
							sourceRelationship: relationships[1],
							sourceTargetMember: relationships[1].leftMember,
						}),
						createTableReference('bId', 'Bs', {
							sourceRelationship: relationships[1],
							sourceTargetMember: relationships[1].rightMember,
						}),
					],
					sourceRelationship: relationships[1]
				})
			]
		});

	});

	test('Use another standard ID naming strategy', () => {

		const customDatabaseModelGenerator = new DatabaseModelGenerator({
			idNamingStrategy: StandardIdNamingStrategies.ENTITY_NAME_PREFIX
		});

		const entities = [
			createEntityWithoutProperties('A'),
			createEntityWithoutProperties('B'),
		];

		const relationships: RelationshipDescriptor[] = [
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
		];

		const databaseModel = customDatabaseModelGenerator.generateDatabaseModel({
			entities,
			relationships
		});

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				createEntityTable('A', {
					identityColumnName: 'aId',
					sourceEntity: entities[0]
				}),
				createEntityTable('B', {
					identityColumnName: 'bId',
					sourceEntity: entities[1]
				}),
				createRelationshipTable('AToB', {
					identityColumnName: 'aToBId',
					references: [
						createTableReference('aId', 'A', {
							targetTableIdentityColumnName: 'aId',
							sourceRelationship: relationships[0],
							sourceTargetMember: relationships[0].leftMember
						}),
						createTableReference('bId', 'B', {
							targetTableIdentityColumnName: 'bId',
							sourceRelationship: relationships[0],
							sourceTargetMember: relationships[0].rightMember
						})
					],
					sourceRelationship: relationships[0]
				})
			]
		});

	});

	test('Use a custom ID naming strategy', () => {

		const customDatabaseModelGenerator = new DatabaseModelGenerator({
			idNamingStrategy: entityName => `the${capitalizeWord(entityName)}Id`,
		});

		const entities = [
			createEntityWithoutProperties('A'),
			createEntityWithoutProperties('B'),
		];

		const relationships: RelationshipDescriptor[] = [
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
		];

		const databaseModel = customDatabaseModelGenerator.generateDatabaseModel({
			entities,
			relationships
		});

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				createEntityTable('A', {
					identityColumnName: 'theAId',
					sourceEntity: entities[0]
				}),
				createEntityTable('B', {
					identityColumnName: 'theBId',
					sourceEntity: entities[1]
				}),
				createRelationshipTable('AToB', {
					identityColumnName: 'theAToBId',
					references: [
						createTableReference('aId', 'A', {
							targetTableIdentityColumnName: 'theAId',
							sourceRelationship: relationships[0],
							sourceTargetMember: relationships[0].leftMember
						}),
						createTableReference('bId', 'B', {
							targetTableIdentityColumnName: 'theBId',
							sourceRelationship: relationships[0],
							sourceTargetMember: relationships[0].rightMember
						})
					],
					sourceRelationship: relationships[0]
				})
			]
		});

	});

	test('Combine all', () => {

		const customDatabaseModelGenerator = new DatabaseModelGenerator({
			usePluralTableNames: true,
			idNamingStrategy: StandardIdNamingStrategies.ENTITY_NAME_PREFIX
		});

		const entities = [
			createEntityWithoutProperties('A'),
			createEntityWithoutProperties('B'),
		];

		const relationships: RelationshipDescriptor[] = [
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
		];

		const databaseModel = customDatabaseModelGenerator.generateDatabaseModel({
			entities,
			relationships
		});

		expect(databaseModel).toStrictEqual<DatabaseModel>({
			tables: [
				createEntityTable('As', {
					identityColumnName: 'aId',
					sourceEntity: entities[0]
				}),
				createEntityTable('Bs', {
					identityColumnName: 'bId',
					sourceEntity: entities[1]
				}),
				createRelationshipTable('AsToBs', {
					// FIXME this may not be the expected behaviour, but we have to find the right way to solve it
					identityColumnName: 'asToBsId',
					// identityColumnName: 'aToBId',
					references: [
						createTableReference('aId', 'As', {
							targetTableIdentityColumnName: 'aId',
							sourceRelationship: relationships[0],
							sourceTargetMember: relationships[0].leftMember
						}),
						createTableReference('bId', 'Bs', {
							targetTableIdentityColumnName: 'bId',
							sourceRelationship: relationships[0],
							sourceTargetMember: relationships[0].rightMember
						})
					],
					sourceRelationship: relationships[0]
				})
			]
		});

	});

});
