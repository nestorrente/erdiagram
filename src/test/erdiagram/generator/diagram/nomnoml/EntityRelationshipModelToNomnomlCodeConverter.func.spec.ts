import {
	Cardinality,
	Direction,
	EntityPropertyType,
	EntityRelationshipModel
} from '@/erdiagram/parser/entity-relationship-model-types';
import NomnomlEntityRelationshipModelToDiagramCodeConverter
	from '@/erdiagram/generator/diagram/nomnoml/NomnomlEntityRelationshipModelToDiagramCodeConverter';

const erModelToNomnomlCodeConverter = new NomnomlEntityRelationshipModelToDiagramCodeConverter({});

function addDefaultDirectives(expectedResult: string): string {
	return [
		expectedResult,
		'',
		'#background: white',
		'#fill: #eef6ff',
		'#gravity: 1.5',
		'#lineWidth: 1',
		'#stroke: #555',
		'#arrowSize: 1',
		'#ranker: longest-path',
	].join('\n');
}

describe('Entities', () => {

	test('Single entity without properties', () => {

		const model: EntityRelationshipModel = {
			entities: [
				{
					name: 'User',
					identifierPropertyName: undefined,
					properties: []
				}
			],
			relationships: []
		};

		const result = erModelToNomnomlCodeConverter.convertToCode(model);

		expect(result).toBe(addDefaultDirectives('[User]'));

	});

	test('Single entity with custom identifier property name', () => {

		const model: EntityRelationshipModel = {
			entities: [
				{
					name: 'User',
					identifierPropertyName: 'userId',
					properties: []
				}
			],
			relationships: []
		};

		const result = erModelToNomnomlCodeConverter.convertToCode(model);

		expect(result).toBe(addDefaultDirectives(`[User|
  userId: identifier
]`));

	});

	test('Single entity with a property without length and modifiers', () => {

		const model: EntityRelationshipModel = {
			entities: [
				{
					name: 'User',
					identifierPropertyName: undefined,
					properties: [
						{
							name: 'active',
							type: EntityPropertyType.BOOLEAN,
							length: [],
							optional: false,
							unique: false,
							autoincremental: false
						}
					]
				}
			],
			relationships: []
		};

		const result = erModelToNomnomlCodeConverter.convertToCode(model);

		expect(result).toBe(addDefaultDirectives(`[User|
  active: bool
]`));

	});

	test('Single entity with a properties with length and no modifiers', () => {

		const model: EntityRelationshipModel = {
			entities: [
				{
					name: 'User',
					identifierPropertyName: undefined,
					properties: [
						{
							name: 'username',
							type: EntityPropertyType.TEXT,
							length: [20],
							optional: false,
							unique: false,
							autoincremental: false
						}
					]
				}
			],
			relationships: []
		};

		const result = erModelToNomnomlCodeConverter.convertToCode(model);

		expect(result).toBe(addDefaultDirectives(`[User|
  username: text(20)
]`));

	});

	test('Single entity with a properties with multiple length values and no modifiers', () => {

		const model: EntityRelationshipModel = {
			entities: [
				{
					name: 'User',
					identifierPropertyName: undefined,
					properties: [
						{
							name: 'score',
							type: EntityPropertyType.DECIMAL,
							length: [10, 5],
							optional: false,
							unique: false,
							autoincremental: false
						}
					]
				}
			],
			relationships: []
		};

		const result = erModelToNomnomlCodeConverter.convertToCode(model);

		expect(result).toBe(addDefaultDirectives(`[User|
  score: decimal(10, 5)
]`));

	});

	test('Single entity with some properties with modifiers', () => {

		const model: EntityRelationshipModel = {
			entities: [
				{
					name: 'User',
					identifierPropertyName: undefined,
					properties: [
						{
							name: 'username',
							type: EntityPropertyType.TEXT,
							length: [20],
							optional: false,
							unique: true,
							autoincremental: false
						},
						{
							name: 'realName',
							type: EntityPropertyType.TEXT,
							length: [50],
							optional: true,
							unique: false,
							autoincremental: false
						},
						{
							name: 'order',
							type: EntityPropertyType.INT,
							length: [],
							optional: true,
							unique: true,
							autoincremental: true
						}
					]
				}
			],
			relationships: []
		};

		const result = erModelToNomnomlCodeConverter.convertToCode(model);

		expect(result).toBe(addDefaultDirectives(`[User|
  username!: text(20)
  realName?: text(50)
  order?!+: int
]`));

	});

});

describe('Relationships', () => {

	test('Single bidirectional one-to-one relationship', () => {

		const model: EntityRelationshipModel = {
			entities: [],
			relationships: [
				{
					leftMember: {
						entity: 'A',
						entityAlias: 'a',
						cardinality: Cardinality.ONE
					},
					rightMember: {
						entity: 'B',
						entityAlias: 'b',
						cardinality: Cardinality.ONE
					},
					direction: Direction.BIDIRECTIONAL,
					relationShipName: undefined
				}
			]
		};

		const result = erModelToNomnomlCodeConverter.convertToCode(model);

		expect(result).toBe(addDefaultDirectives('[A] 1<->1 [B]'));

	});

	test('Single left-to-right one-to-many relationship', () => {

		const model: EntityRelationshipModel = {
			entities: [],
			relationships: [
				{
					leftMember: {
						entity: 'A',
						entityAlias: 'a',
						cardinality: Cardinality.ONE
					},
					rightMember: {
						entity: 'B',
						entityAlias: 'b',
						cardinality: Cardinality.MANY
					},
					direction: Direction.LEFT_TO_RIGHT,
					relationShipName: undefined
				}
			]
		};

		const result = erModelToNomnomlCodeConverter.convertToCode(model);

		expect(result).toBe(addDefaultDirectives('[A] 1->* [B]'));

	});

	test('Single right-to-left many-to-many relationship', () => {

		const model: EntityRelationshipModel = {
			entities: [],
			relationships: [
				{
					leftMember: {
						entity: 'A',
						entityAlias: 'a',
						cardinality: Cardinality.MANY
					},
					rightMember: {
						entity: 'B',
						entityAlias: 'b',
						cardinality: Cardinality.MANY
					},
					direction: Direction.RIGHT_TO_LEFT,
					relationShipName: undefined
				}
			]
		};

		const result = erModelToNomnomlCodeConverter.convertToCode(model);

		expect(result).toBe(addDefaultDirectives('[A] *<-* [B]'));

	});

	test('Single bidirectional many-to-one relationship', () => {

		const model: EntityRelationshipModel = {
			entities: [],
			relationships: [
				{
					leftMember: {
						entity: 'A',
						entityAlias: 'a',
						cardinality: Cardinality.MANY
					},
					rightMember: {
						entity: 'B',
						entityAlias: 'b',
						cardinality: Cardinality.ONE
					},
					direction: Direction.BIDIRECTIONAL,
					relationShipName: undefined
				}
			]
		};

		const result = erModelToNomnomlCodeConverter.convertToCode(model);

		expect(result).toBe(addDefaultDirectives('[A] *<->1 [B]'));

	});

	test('Single left-to-right many-to-one relationship with custom name', () => {

		const model: EntityRelationshipModel = {
			entities: [],
			relationships: [
				{
					leftMember: {
						entity: 'A',
						entityAlias: 'a',
						cardinality: Cardinality.MANY
					},
					rightMember: {
						entity: 'B',
						entityAlias: 'b',
						cardinality: Cardinality.ONE
					},
					direction: Direction.LEFT_TO_RIGHT,
					relationShipName: 'Rel'
				}
			]
		};

		const result = erModelToNomnomlCodeConverter.convertToCode(model);

		expect(result).toBe(addDefaultDirectives(`[<label>Rel]
[A] *- [Rel]
[Rel] ->1 [B]`));

	});

	test('Single bidirectional many-to-many relationship with custom name', () => {

		const model: EntityRelationshipModel = {
			entities: [],
			relationships: [
				{
					leftMember: {
						entity: 'A',
						entityAlias: 'a',
						cardinality: Cardinality.MANY
					},
					rightMember: {
						entity: 'B',
						entityAlias: 'b',
						cardinality: Cardinality.MANY
					},
					direction: Direction.BIDIRECTIONAL,
					relationShipName: 'Rel'
				}
			]
		};

		const result = erModelToNomnomlCodeConverter.convertToCode(model);

		expect(result).toBe(addDefaultDirectives(`[<label>Rel]
[A] *<- [Rel]
[Rel] ->* [B]`));

	});

});

describe('Entities and relationships', () => {

	test('Single bidirectional many-to-many relationship with custom name', () => {

		const model: EntityRelationshipModel = {
			entities: [
				{
					name: 'User',
					identifierPropertyName: 'uuid',
					properties: [
						{
							name: 'username',
							type: EntityPropertyType.TEXT,
							length: [20],
							optional: false,
							unique: true,
							autoincremental: false
						},
						{
							name: 'active',
							type: EntityPropertyType.BOOLEAN,
							length: [],
							optional: false,
							unique: false,
							autoincremental: false
						}
					]
				},
				{
					name: 'Order',
					identifierPropertyName: undefined,
					properties: [
						{
							name: 'date',
							type: EntityPropertyType.DATETIME,
							length: [],
							optional: false,
							unique: false,
							autoincremental: false
						}
					]
				}
			],
			relationships: [
				{
					leftMember: {
						entity: 'User',
						entityAlias: 'user',
						cardinality: Cardinality.ONE
					},
					rightMember: {
						entity: 'Order',
						entityAlias: 'order',
						cardinality: Cardinality.MANY
					},
					direction: Direction.RIGHT_TO_LEFT,
					relationShipName: undefined
				}
			]
		};

		const result = erModelToNomnomlCodeConverter.convertToCode(model);

		expect(result).toBe(addDefaultDirectives(`[User|
  uuid: identifier
  username!: text(20)
  active: bool
]

[Order|
  date: datetime
]

[User] 1<-* [Order]`));

	});

});
