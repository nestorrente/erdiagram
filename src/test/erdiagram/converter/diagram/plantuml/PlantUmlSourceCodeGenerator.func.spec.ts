import {
	Cardinality,
	Direction,
	EntityPropertyType,
	EntityRelationshipModel
} from '@/erdiagram/parser/types/entity-relationship-model-types';
import PlantUmlSourceCodeGenerator from '@/erdiagram/converter/diagram/plantuml/PlantUmlSourceCodeGenerator';
import DiagramLevel from '@/erdiagram/converter/diagram/common/config/DiagramLevel';
import {createEntityProperty} from '#/erdiagram/parser/entity-relationship-model-mothers';

function addHeaderAndFooter(expectedResult: string): string {
	return [
		'@startuml',
		'',
		expectedResult,
		'',
		'@enduml'
	].join('\n');
}

describe('Entities', () => {

	const plantumlERModelToDiagramCodeConverter = new PlantUmlSourceCodeGenerator();

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

		const result = plantumlERModelToDiagramCodeConverter.generateSourceCode(model);

		expect(result).toBe(addHeaderAndFooter(`class User {}`));

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

		const result = plantumlERModelToDiagramCodeConverter.generateSourceCode(model);

		expect(result).toBe(addHeaderAndFooter(`class User {
    {field} userId: identity
}`));

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

		const result = plantumlERModelToDiagramCodeConverter.generateSourceCode(model);

		expect(result).toBe(addHeaderAndFooter(`class User {
    {field} active: bool
}`));

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

		const result = plantumlERModelToDiagramCodeConverter.generateSourceCode(model);

		expect(result).toBe(addHeaderAndFooter(`class User {
    {field} username: text(20)
}`));

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

		const result = plantumlERModelToDiagramCodeConverter.generateSourceCode(model);

		expect(result).toBe(addHeaderAndFooter(`class User {
    {field} score: decimal(10, 5)
}`));

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

		const result = plantumlERModelToDiagramCodeConverter.generateSourceCode(model);

		expect(result).toBe(addHeaderAndFooter(`class User {
    {field} username!: text(20)
    {field} realName?: text(50)
    {field} order?!: int
}`));

	});

});

describe('Relationships', () => {

	const plantumlERModelToDiagramCodeConverter = new PlantUmlSourceCodeGenerator();

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

		const result = plantumlERModelToDiagramCodeConverter.generateSourceCode(model);

		expect(result).toBe(addHeaderAndFooter('A "1" <--> "1" B'));

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

		const result = plantumlERModelToDiagramCodeConverter.generateSourceCode(model);

		expect(result).toBe(addHeaderAndFooter('A "1" --> "*" B'));

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

		const result = plantumlERModelToDiagramCodeConverter.generateSourceCode(model);

		expect(result).toBe(addHeaderAndFooter('A "*" <-- "*" B'));

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

		const result = plantumlERModelToDiagramCodeConverter.generateSourceCode(model);

		expect(result).toBe(addHeaderAndFooter('A "*" <--> "1" B'));

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

		const result = plantumlERModelToDiagramCodeConverter.generateSourceCode(model);

		expect(result).toBe(addHeaderAndFooter('A "*" <-- "0..1" B : Rel'));

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

		const result = plantumlERModelToDiagramCodeConverter.generateSourceCode(model);

		expect(result).toBe(addHeaderAndFooter('A "*" --> "1" B : Rel'));

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

		const result = plantumlERModelToDiagramCodeConverter.generateSourceCode(model);

		expect(result).toBe(addHeaderAndFooter('A "*" <--> "*" B : Rel'));

	});

});

describe('Entities and relationships', () => {

	const plantumlERModelToDiagramCodeConverter = new PlantUmlSourceCodeGenerator();

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

		const result = plantumlERModelToDiagramCodeConverter.generateSourceCode(model);

		expect(result).toBe(addHeaderAndFooter(`class User {
    {field} uuid: identity
    {field} username!: text(20)
    {field} active: bool
}

class Order {
    {field} date: datetime
}

User "1" <-- "*" Order`));

	});

});

describe('With custom config', () => {

	test('Conceptual diagram of a single bidirectional many-to-many relationship with custom name', () => {

		const nomnomlERModelSourceCodeGenerator = new PlantUmlSourceCodeGenerator({
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

		expect(result).toBe(addHeaderAndFooter(`class User {}

class Order {}

User "1" <-- "*" Order

hide members
hide methods`));

	});

});
