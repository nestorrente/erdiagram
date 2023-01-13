import {
	Cardinality,
	Direction,
	EntityPropertyType,
	EntityRelationshipModel
} from '@/erdiagram/parser/types/entity-relationship-model-types';
import NomnomlSourceCodeGenerator from '@/erdiagram/converter/diagram/nomnoml/NomnomlSourceCodeGenerator';
import {createEntityProperty} from '#/erdiagram/parser/entity-relationship-model-mothers';
import DiagramLevel from '@/erdiagram/converter/diagram/common/config/DiagramLevel';

function addDefaultDirectives(expectedResult: string): string {
	return `${expectedResult}

#arrowSize: 1
#gravity: 1.5
#background: transparent
#fill: #fefece
#lineWidth: 1
#stroke: #333333
#ranker: longest-path`;
}

describe('Entities', () => {

	const nomnomlERModelSourceCodeGenerator = new NomnomlSourceCodeGenerator();

	test('Single entity without properties', () => {

		const model: EntityRelationshipModel = {
			entities: [
				{
					name: 'User',
					identityPropertyName: undefined,
					properties: []
				}
			],
			relationships: []
		};

		const result = nomnomlERModelSourceCodeGenerator.generateSourceCode(model);

		expect(result).toBe(addDefaultDirectives('[User]'));

	});

	test('Single entity with custom identity property name', () => {

		const model: EntityRelationshipModel = {
			entities: [
				{
					name: 'User',
					identityPropertyName: 'userId',
					properties: []
				}
			],
			relationships: []
		};

		const result = nomnomlERModelSourceCodeGenerator.generateSourceCode(model);

		expect(result).toBe(addDefaultDirectives(`[User|
    userId: identity
]`));

	});

	test('Single entity with a property without length and modifiers', () => {

		const model: EntityRelationshipModel = {
			entities: [
				{
					name: 'User',
					identityPropertyName: undefined,
					properties: [
						createEntityProperty('active', EntityPropertyType.BOOLEAN)
					]
				}
			],
			relationships: []
		};

		const result = nomnomlERModelSourceCodeGenerator.generateSourceCode(model);

		expect(result).toBe(addDefaultDirectives(`[User|
    active: bool
]`));

	});

	test('Single entity with a properties with length and no modifiers', () => {

		const model: EntityRelationshipModel = {
			entities: [
				{
					name: 'User',
					identityPropertyName: undefined,
					properties: [
						createEntityProperty('username', EntityPropertyType.TEXT, {length: [20]})
					]
				}
			],
			relationships: []
		};

		const result = nomnomlERModelSourceCodeGenerator.generateSourceCode(model);

		expect(result).toBe(addDefaultDirectives(`[User|
    username: text(20)
]`));

	});

	test('Single entity with a properties with multiple length values and no modifiers', () => {

		const model: EntityRelationshipModel = {
			entities: [
				{
					name: 'User',
					identityPropertyName: undefined,
					properties: [
						createEntityProperty('score', EntityPropertyType.DECIMAL, {length: [10, 5]})
					]
				}
			],
			relationships: []
		};

		const result = nomnomlERModelSourceCodeGenerator.generateSourceCode(model);

		expect(result).toBe(addDefaultDirectives(`[User|
    score: decimal(10, 5)
]`));

	});

	test('Single entity with some properties with modifiers', () => {

		const model: EntityRelationshipModel = {
			entities: [
				{
					name: 'User',
					identityPropertyName: undefined,
					properties: [
						createEntityProperty('username', EntityPropertyType.TEXT, {length: [20], unique: true}),
						createEntityProperty('realName', EntityPropertyType.TEXT, {length: [50], optional: true}),
						createEntityProperty('order', EntityPropertyType.INT, {
							optional: true,
							unique: true
						})
					]
				}
			],
			relationships: []
		};

		const result = nomnomlERModelSourceCodeGenerator.generateSourceCode(model);

		expect(result).toBe(addDefaultDirectives(`[User|
    username!: text(20)
    realName?: text(50)
    order?!: int
]`));

	});

});

describe('Relationships', () => {

	const nomnomlERModelSourceCodeGenerator = new NomnomlSourceCodeGenerator();

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
					relationshipName: undefined
				}
			]
		};

		const result = nomnomlERModelSourceCodeGenerator.generateSourceCode(model);

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
					relationshipName: undefined
				}
			]
		};

		const result = nomnomlERModelSourceCodeGenerator.generateSourceCode(model);

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
					relationshipName: undefined
				}
			]
		};

		const result = nomnomlERModelSourceCodeGenerator.generateSourceCode(model);

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
					relationshipName: undefined
				}
			]
		};

		const result = nomnomlERModelSourceCodeGenerator.generateSourceCode(model);

		expect(result).toBe(addDefaultDirectives('[A] *<->1 [B]'));

	});

	test('Single right-to-left many-to-one relationship with an optional side', () => {

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
						cardinality: Cardinality.ZERO_OR_ONE
					},
					direction: Direction.RIGHT_TO_LEFT,
					relationshipName: 'Rel'
				}
			]
		};

		const result = nomnomlERModelSourceCodeGenerator.generateSourceCode(model);

		expect(result).toBe(addDefaultDirectives(`[<label>Rel]
[A] *<- [Rel]
[Rel] -0..1 [B]`));

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
					relationshipName: 'Rel'
				}
			]
		};

		const result = nomnomlERModelSourceCodeGenerator.generateSourceCode(model);

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
					relationshipName: 'Rel'
				}
			]
		};

		const result = nomnomlERModelSourceCodeGenerator.generateSourceCode(model);

		expect(result).toBe(addDefaultDirectives(`[<label>Rel]
[A] *<- [Rel]
[Rel] ->* [B]`));

	});

});

describe('Entities and relationships', () => {

	const nomnomlERModelSourceCodeGenerator = new NomnomlSourceCodeGenerator();

	test('Single bidirectional many-to-many relationship with custom name', () => {

		const model: EntityRelationshipModel = {
			entities: [
				{
					name: 'User',
					identityPropertyName: 'uuid',
					properties: [
						createEntityProperty('username', EntityPropertyType.TEXT, {length: [20], unique: true}),
						createEntityProperty('active', EntityPropertyType.BOOLEAN)
					]
				},
				{
					name: 'Order',
					identityPropertyName: undefined,
					properties: [
						createEntityProperty('date', EntityPropertyType.DATETIME)
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
					relationshipName: undefined
				}
			]
		};

		const result = nomnomlERModelSourceCodeGenerator.generateSourceCode(model);

		expect(result).toBe(addDefaultDirectives(`[User|
    uuid: identity
    username!: text(20)
    active: bool
]

[Order|
    date: datetime
]

[User] 1<-* [Order]`));

	});

});

describe('With custom config', () => {

	test('Conceptual diagram of a single bidirectional many-to-many relationship with custom name', () => {

		const nomnomlERModelSourceCodeGenerator = new NomnomlSourceCodeGenerator({
			diagramLevel: DiagramLevel.CONCEPTUAL
		});

		const model: EntityRelationshipModel = {
			entities: [
				{
					name: 'User',
					identityPropertyName: 'uuid',
					properties: [
						createEntityProperty('username', EntityPropertyType.TEXT, {length: [20], unique: true}),
						createEntityProperty('active', EntityPropertyType.BOOLEAN)
					]
				},
				{
					name: 'Order',
					identityPropertyName: undefined,
					properties: [
						createEntityProperty('date', EntityPropertyType.DATETIME)
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
					relationshipName: undefined
				}
			]
		};

		const result = nomnomlERModelSourceCodeGenerator.generateSourceCode(model);

		expect(result).toBe(addDefaultDirectives(`[User]

[Order]

[User] 1<-* [Order]`));

	});

	test('Custom styles', () => {

		const nomnomlERModelSourceCodeGenerator = new NomnomlSourceCodeGenerator({
			style: {
				arrowSize: 2,
				edges: 'hard'
			}
		});

		const model: EntityRelationshipModel = {
			entities: [
				{
					name: 'User',
					identityPropertyName: undefined,
					properties: []
				}
			],
			relationships: []
		};

		const result = nomnomlERModelSourceCodeGenerator.generateSourceCode(model);

		expect(result).toBe(`[User]

#arrowSize: 2
#gravity: 1.5
#edges: hard
#background: transparent
#fill: #fefece
#lineWidth: 1
#stroke: #333333
#ranker: longest-path`);

	});

});
