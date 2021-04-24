import {
	Cardinality,
	Direction,
	EntityDescriptor,
	EntityPropertyType,
	RelationshipDescriptor
} from '@/erdiagram/parser/types/entity-relationship-model-types';
import ClassModelGenerator from '@/erdiagram/converter/oop/model/ClassModelGenerator';
import {ClassDescriptor, ClassFieldDescriptor, ClassModel} from '@/erdiagram/converter/oop/model/class-model-types';
import {
	createEntityWithoutProperties,
	createSimpleEntityProperty
} from '#/erdiagram/parser/entity-relationship-model-test-utils';
import StandardIdNamingStrategies from '@/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies';
import {capitalizeWord} from '@/erdiagram/util/string-utils';
import {createEntityClassField, createIdClassField, createPrimitiveClassField} from './class-model-test-utils';
import {SourceType} from '@/erdiagram/converter/oop/model/source-metadata-types';

const classModelGenerator = new ClassModelGenerator();

describe('Entity', () => {

	test('Basic entity', () => {

		const entity: EntityDescriptor = {
			name: 'Entity',
			identityPropertyName: undefined,
			properties: [
				createSimpleEntityProperty('name', EntityPropertyType.TEXT, [10]),
			]
		};

		const classModel = classModelGenerator.generateClassModel({
			entities: [entity],
			relationships: []
		});

		expect(classModel).toStrictEqual<ClassModel>({
			classes: [
				{
					name: 'Entity',
					fields: [
						createIdClassField({
							name: 'id',
							sourceEntity: entity
						}),
						createPrimitiveClassField('name', EntityPropertyType.TEXT, {
							maxSize: 10,
							sourceEntity: entity,
							sourceProperty: entity.properties[0]
						})
					],
					sourceMetadata: {
						sourceType: SourceType.ENTITY,
						entity: entity
					}
				}
			]
		});

	});

	test('Entity with explicit identity property', () => {

		const entity: EntityDescriptor = {
			name: 'Entity',
			identityPropertyName: 'customEntityId',
			properties: []
		};

		const classModel = classModelGenerator.generateClassModel({
			entities: [entity],
			relationships: []
		});

		expect(classModel).toStrictEqual<ClassModel>({
			classes: [
				{
					name: 'Entity',
					fields: [
						createIdClassField({
							name: 'customEntityId',
							sourceEntity: entity
						})
					],
					sourceMetadata: {
						sourceType: SourceType.ENTITY,
						entity: entity
					}
				}
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

		const classModel = classModelGenerator.generateClassModel({
			entities: [entity],
			relationships: []
		});

		expect(classModel).toStrictEqual<ClassModel>({
			classes: [
				{
					name: 'Entity',
					fields: [
						createIdClassField({
							name: 'customEntityId',
							sourceEntity: entity
						}),
						createPrimitiveClassField('name', EntityPropertyType.TEXT, {
							maxSize: 10,
							sourceEntity: entity,
							sourceProperty: entity.properties[0]
						})
					],
					sourceMetadata: {
						sourceType: SourceType.ENTITY,
						entity: entity
					}
				}
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
				createSimpleEntityProperty('j', EntityPropertyType.BLOB, [1024]),
			]
		};

		const classModel = classModelGenerator.generateClassModel({
			entities: [entity],
			relationships: []
		});

		expect(classModel).toStrictEqual<ClassModel>({
			classes: [
				{
					name: 'Entity',
					fields: [
						createIdClassField({
							sourceEntity: entity
						}),
						createPrimitiveClassField('a', EntityPropertyType.BOOLEAN, {
							sourceEntity: entity,
							sourceProperty: entity.properties[0]
						}),
						createPrimitiveClassField('b', EntityPropertyType.SHORT, {
							sourceEntity: entity,
							sourceProperty: entity.properties[1]
						}),
						createPrimitiveClassField('c', EntityPropertyType.INT, {
							sourceEntity: entity,
							sourceProperty: entity.properties[2]
						}),
						createPrimitiveClassField('d', EntityPropertyType.LONG, {
							sourceEntity: entity,
							sourceProperty: entity.properties[3]
						}),
						createPrimitiveClassField('e', EntityPropertyType.DECIMAL, {
							sourceEntity: entity,
							sourceProperty: entity.properties[4]
						}),
						createPrimitiveClassField('f', EntityPropertyType.TEXT, {
							maxSize: 50,
							sourceEntity: entity,
							sourceProperty: entity.properties[5]
						}),
						createPrimitiveClassField('g', EntityPropertyType.DATE, {
							sourceEntity: entity,
							sourceProperty: entity.properties[6]
						}),
						createPrimitiveClassField('h', EntityPropertyType.TIME, {
							sourceEntity: entity,
							sourceProperty: entity.properties[7]
						}),
						createPrimitiveClassField('i', EntityPropertyType.DATETIME, {
							sourceEntity: entity,
							sourceProperty: entity.properties[8]
						}),
						createPrimitiveClassField('j', EntityPropertyType.BLOB, {
							maxSize: 1024,
							sourceEntity: entity,
							sourceProperty: entity.properties[9]
						}),
					],
					sourceMetadata: {
						sourceType: SourceType.ENTITY,
						entity: entity
					}
				}
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

		const classModel = classModelGenerator.generateClassModel({
			entities: [entity],
			relationships: []
		});

		expect(classModel).toStrictEqual<ClassModel>({
			classes: [
				{
					name: 'Entity',
					fields: [
						createIdClassField({
							sourceEntity: entity
						}),
						createPrimitiveClassField('num', EntityPropertyType.INT, {
							nullable: true,
							sourceEntity: entity,
							sourceProperty: entity.properties[0]
						})
					],
					sourceMetadata: {
						sourceType: SourceType.ENTITY,
						entity: entity
					}
				}
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
				},
			]
		};
		const classModel = classModelGenerator.generateClassModel({
			entities: [entity],
			relationships: []
		});

		expect(classModel).toStrictEqual<ClassModel>({
			classes: [
				{
					name: 'Entity',
					fields: [
						createIdClassField({
							sourceEntity: entity
						}),
						createPrimitiveClassField('num', EntityPropertyType.INT, {
							sourceEntity: entity,
							sourceProperty: entity.properties[0]
						})
					],
					sourceMetadata: {
						sourceType: SourceType.ENTITY,
						entity: entity
					}
				}
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

		const classModel = classModelGenerator.generateClassModel({
			entities,
			relationships
		});

		expect(classModel).toStrictEqual<ClassModel>({
			classes: [
				{
					name: 'A',
					fields: [
						createIdClassField({
							sourceEntity: entities[0]
						}),
						createEntityClassField('b', 'B', {
							sourceRelationship: relationships[0],
							sourceTargetMember: relationships[0].rightMember
						}),
						createEntityClassField('d', 'D', {
							sourceRelationship: relationships[2],
							sourceTargetMember: relationships[2].rightMember
						})
					],
					sourceMetadata: {
						sourceType: SourceType.ENTITY,
						entity: entities[0]
					}
				},
				{
					name: 'B',
					fields: [
						createIdClassField({
							sourceEntity: entities[1]
						})
					],
					sourceMetadata: {
						sourceType: SourceType.ENTITY,
						entity: entities[1]
					}
				},
				{
					name: 'C',
					fields: [
						createIdClassField({
							sourceEntity: entities[2]
						}),
						createEntityClassField('a', 'A', {
							sourceRelationship: relationships[1],
							sourceTargetMember: relationships[1].leftMember
						})
					],
					sourceMetadata: {
						sourceType: SourceType.ENTITY,
						entity: entities[2]
					}
				},
				{
					name: 'D',
					fields: [
						createIdClassField({
							sourceEntity: entities[3]
						}),
						createEntityClassField('a', 'A', {
							sourceRelationship: relationships[2],
							sourceTargetMember: relationships[2].leftMember
						})
					],
					sourceMetadata: {
						sourceType: SourceType.ENTITY,
						entity: entities[3]
					}
				}
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

		const classModel = classModelGenerator.generateClassModel({
			entities,
			relationships
		});

		expect(classModel).toStrictEqual<ClassModel>({
			classes: [
				{
					name: 'A',
					fields: [
						createIdClassField({
							sourceEntity: entities[0]
						}),
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
						).map(([entityName, fieldName, list, nullable], index): ClassFieldDescriptor => {
							return createEntityClassField(fieldName, entityName, {
								list,
								nullable,
								sourceRelationship: relationships[index],
								sourceTargetMember: relationships[index].rightMember,
							});
						})
					],
					sourceMetadata: {
						sourceType: SourceType.ENTITY,
						entity: entities[0]
					}
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
				).map(([entityName, list, nullable], index): ClassDescriptor => {
					if (entityName === 'J') {
						console.log({index, relationship: relationships[index], relCount: relationships.length});
					}
					return {
						name: entityName,
						fields: [
							createIdClassField({
								sourceEntity: entities[index + 1]
							}),
							createEntityClassField(list ? 'as' : 'a', 'A', {
								list,
								nullable,
								sourceRelationship: relationships[index],
								sourceTargetMember: relationships[index].leftMember
							})
						],
						sourceMetadata: {
							sourceType: SourceType.ENTITY,
							entity: entities[index + 1]
						}
					};
				})
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

		const classModel = classModelGenerator.generateClassModel({
			entities,
			relationships
		});

		expect(classModel).toStrictEqual<ClassModel>({
			classes: [
				{
					name: 'A',
					fields: [
						createIdClassField({
							sourceEntity: entities[0]
						}),
						createEntityClassField('b', 'B', {
							sourceRelationship: relationships[0],
							sourceTargetMember: relationships[0].rightMember
						}),
						createEntityClassField('cAlias', 'C', {
							sourceRelationship: relationships[1],
							sourceTargetMember: relationships[1].rightMember
						}),
						createEntityClassField('d', 'D', {
							sourceRelationship: relationships[2],
							sourceTargetMember: relationships[2].rightMember
						}),
						createEntityClassField('eAliases', 'E', {
							list: true,
							sourceRelationship: relationships[3],
							sourceTargetMember: relationships[3].rightMember
						})
					],
					sourceMetadata: {
						sourceType: SourceType.ENTITY,
						entity: entities[0]
					}
				},
				{
					name: 'B',
					fields: [
						createIdClassField({
							sourceEntity: entities[1]
						}),
						createEntityClassField('aAlias', 'A', {
							sourceRelationship: relationships[0],
							sourceTargetMember: relationships[0].leftMember
						})
					],
					sourceMetadata: {
						sourceType: SourceType.ENTITY,
						entity: entities[1]
					}
				},
				{
					name: 'C',
					fields: [
						createIdClassField({
							sourceEntity: entities[2]
						}),
						createEntityClassField('a', 'A', {
							sourceRelationship: relationships[1],
							sourceTargetMember: relationships[1].leftMember
						})
					],
					sourceMetadata: {
						sourceType: SourceType.ENTITY,
						entity: entities[2]
					}
				},
				{
					name: 'D',
					fields: [
						createIdClassField({
							sourceEntity: entities[3]
						}),
						createEntityClassField('a', 'A', {
							sourceRelationship: relationships[2],
							sourceTargetMember: relationships[2].leftMember
						})
					],
					sourceMetadata: {
						sourceType: SourceType.ENTITY,
						entity: entities[3]
					}
				},
				{
					name: 'E',
					fields: [
						createIdClassField({
							sourceEntity: entities[4]
						}),
						createEntityClassField('aAliases', 'A', {
							list: true,
							sourceRelationship: relationships[3],
							sourceTargetMember: relationships[3].leftMember
						})
					],
					sourceMetadata: {
						sourceType: SourceType.ENTITY,
						entity: entities[4]
					}
				}
			]
		});

	});

});

describe('Config', () => {

	test('Use another standard ID naming strategy', () => {

		const customClassModelGenerator = new ClassModelGenerator({
			idNamingStrategy: StandardIdNamingStrategies.ENTITY_NAME_PREFIX
		});

		const entities = [
			createEntityWithoutProperties('A'),
			createEntityWithoutProperties('Another'),
		];

		const databaseModel = customClassModelGenerator.generateClassModel({
			entities,
			relationships: []
		});

		expect(databaseModel).toStrictEqual<ClassModel>({
			classes: [
				{
					name: 'A',
					fields: [
						createIdClassField({
							name: 'aId',
							sourceEntity: entities[0]
						})
					],
					sourceMetadata: {
						sourceType: SourceType.ENTITY,
						entity: entities[0]
					}
				},
				{
					name: 'Another',
					fields: [
						createIdClassField({
							name: 'anotherId',
							sourceEntity: entities[1]
						})
					],
					sourceMetadata: {
						sourceType: SourceType.ENTITY,
						entity: entities[1]
					}
				}
			]
		});

	});

	test('Use a custom ID naming strategy', () => {

		const customClassModelGenerator = new ClassModelGenerator({
			idNamingStrategy: entityName => `the${capitalizeWord(entityName)}Id`,
		});

		const entities = [
			createEntityWithoutProperties('A'),
			createEntityWithoutProperties('Another'),
		];

		const databaseModel = customClassModelGenerator.generateClassModel({
			entities,
			relationships: []
		});

		expect(databaseModel).toStrictEqual<ClassModel>({
			classes: [
				{
					name: 'A',
					fields: [
						createIdClassField({
							name: 'theAId',
							sourceEntity: entities[0]
						})
					],
					sourceMetadata: {
						sourceType: SourceType.ENTITY,
						entity: entities[0]
					}
				},
				{
					name: 'Another',
					fields: [
						createIdClassField({
							name: 'theAnotherId',
							sourceEntity: entities[1]
						})
					],
					sourceMetadata: {
						sourceType: SourceType.ENTITY,
						entity: entities[1]
					}
				}
			]
		});

	});

});
