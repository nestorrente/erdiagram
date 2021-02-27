import {
	parseEntityNameStatement,
	parseEntityPropertyStatement,
	parseRelationshipStatement
} from '@/erdiagram/parser/statement/statement-types-parse-functions';
import {
	Cardinality,
	Direction,
	EntityPropertyDescriptor,
	EntityPropertyType,
	RelationshipDescriptor
} from '@/erdiagram/parser/entity-relationship-model-types';

describe('Parse entity name statement', () => {

	test('Entity line with no spaces', () => {

		const result = parseEntityNameStatement('Entity');

		expect(result).toBe('Entity');

	});

	test('Entity line with numbers', () => {

		const result = parseEntityNameStatement('Entity1234');

		expect(result).toBe('Entity1234');

	});

	test('Entity line with trailing spaces should be trimmed', () => {

		const result = parseEntityNameStatement('Entity  \t \t\t   ');

		expect(result).toBe('Entity');

	});

	test('Trailing comment in entity line should be ignored', () => {

		const result = parseEntityNameStatement('Entity # this is a comment');

		expect(result).toBe('Entity');

	});

	test('Entity line with leading spaces shoud fail', () => {

		const callback = () => {
			parseEntityNameStatement(' Entity');
		};

		expect(callback).toThrow(Error);

	});

});

describe('Parse entity property statement', () => {

	test('Entity property line without length', () => {

		const result = parseEntityPropertyStatement(' active bool');

		const expected: EntityPropertyDescriptor = {
			name: 'active',
			type: EntityPropertyType.BOOLEAN,
			length: [],
			optional: false,
			autoincremental: false,
			unique: false
		};

		expect(result).toStrictEqual(expected);

	});

	test('Entity property line with length (1 param)', () => {

		const result = parseEntityPropertyStatement(' name text(40)');

		const expected: EntityPropertyDescriptor = {
			name: 'name',
			type: EntityPropertyType.TEXT,
			length: [40],
			optional: false,
			autoincremental: false,
			unique: false
		};

		expect(result).toStrictEqual(expected);

	});

	test('Entity property line with length (2 param)', () => {

		const result = parseEntityPropertyStatement(' name decimal(10, 2)');

		const expected: EntityPropertyDescriptor = {
			name: 'name',
			type: EntityPropertyType.DECIMAL,
			length: [10, 2],
			optional: false,
			autoincremental: false,
			unique: false
		};

		expect(result).toStrictEqual(expected);

	});

	test('Entity property line with optional modifier', () => {

		const result = parseEntityPropertyStatement(' num? short');

		const expected: EntityPropertyDescriptor = {
			name: 'num',
			type: EntityPropertyType.SHORT,
			length: [],
			optional: true,
			autoincremental: false,
			unique: false
		};

		expect(result).toStrictEqual(expected);

	});

	test('Entity property line with autoincremental modifier', () => {

		const result = parseEntityPropertyStatement(' num+ short');

		const expected: EntityPropertyDescriptor = {
			name: 'num',
			type: EntityPropertyType.SHORT,
			length: [],
			optional: false,
			autoincremental: true,
			unique: false
		};

		expect(result).toStrictEqual(expected);

	});

	test('Entity property line with unique modifier', () => {

		const result = parseEntityPropertyStatement(' num! short');

		const expected: EntityPropertyDescriptor = {
			name: 'num',
			type: EntityPropertyType.SHORT,
			length: [],
			optional: false,
			autoincremental: false,
			unique: true
		};

		expect(result).toStrictEqual(expected);

	});

	test('Entity property line with optional, autoincremental and unique modifier', () => {

		const result = parseEntityPropertyStatement(' num?+! short');

		const expected: EntityPropertyDescriptor = {
			name: 'num',
			type: EntityPropertyType.SHORT,
			length: [],
			optional: true,
			autoincremental: true,
			unique: true
		};

		expect(result).toStrictEqual(expected);

	});

	test('Entity property line of unknown type', () => {

		const callback = () => {
			parseEntityPropertyStatement(' name imaginaryType(50)');
		};

		expect(callback).toThrow(Error);

	});

	test('Entity property line without leading spaces should fail', () => {

		const callback = () => {
			parseEntityPropertyStatement('name text(50)');
		};

		expect(callback).toThrow(Error);

	});

	test('Entity property line with trailing spaces should be trimmed', () => {

		const result = parseEntityPropertyStatement(' name text(50)    ');

		const expected: EntityPropertyDescriptor = {
			name: 'name',
			type: EntityPropertyType.TEXT,
			length: [50],
			optional: false,
			autoincremental: false,
			unique: false
		};

		expect(result).toStrictEqual(expected);

	});

	test('Trailing comment in entity property line should be ignored', () => {

		const result = parseEntityPropertyStatement(' name text(50) # this is a comment');

		const expected: EntityPropertyDescriptor = {
			name: 'name',
			type: EntityPropertyType.TEXT,
			length: [50],
			optional: false,
			autoincremental: false,
			unique: false
		};

		expect(result).toStrictEqual(expected);

	});

});

describe('Parse relationship statement', () => {

	test('Many-to-one relationship to the right', () => {

		const result = parseRelationshipStatement('Entity1 *-> Entity2');

		const expected: RelationshipDescriptor = {
			relationShipName: undefined,
			direction: Direction.LEFT_TO_RIGHT,
			leftMember: {
				entity: 'Entity1',
				entityAlias: 'entity1',
				cardinality: Cardinality.MANY
			},
			rightMember: {
				entity: 'Entity2',
				entityAlias: 'entity2',
				cardinality: Cardinality.ONE
			}
		};

		expect(result).toStrictEqual(expected);

	});

	test('Many-to-many relationship to the left', () => {

		const result = parseRelationshipStatement('Entity1 *<-* Entity2');

		const expected: RelationshipDescriptor = {
			relationShipName: undefined,
			direction: Direction.RIGHT_TO_LEFT,
			leftMember: {
				entity: 'Entity1',
				entityAlias: 'entity1',
				cardinality: Cardinality.MANY
			},
			rightMember: {
				entity: 'Entity2',
				entityAlias: 'entity2',
				cardinality: Cardinality.MANY
			}
		};

		expect(result).toStrictEqual(expected);

	});

	test('Explicit one-to-one bidirectional relationship', () => {

		const result = parseRelationshipStatement('Entity1 1<->1 Entity2');

		const expected: RelationshipDescriptor = {
			relationShipName: undefined,
			direction: Direction.BIDIRECTIONAL,
			leftMember: {
				entity: 'Entity1',
				entityAlias: 'entity1',
				cardinality: Cardinality.ONE
			},
			rightMember: {
				entity: 'Entity2',
				entityAlias: 'entity2',
				cardinality: Cardinality.ONE
			}
		};

		expect(result).toStrictEqual(expected);

	});

	test('One-to-one bidirectional relationship with optional right side', () => {

		const result = parseRelationshipStatement('Entity1 <->? Entity2');

		const expected: RelationshipDescriptor = {
			relationShipName: undefined,
			direction: Direction.BIDIRECTIONAL,
			leftMember: {
				entity: 'Entity1',
				entityAlias: 'entity1',
				cardinality: Cardinality.ONE
			},
			rightMember: {
				entity: 'Entity2',
				entityAlias: 'entity2',
				cardinality: Cardinality.ZERO_OR_ONE
			}
		};

		expect(result).toStrictEqual(expected);

	});

	test('One-to-one bidirectional relationship with optional left side', () => {

		const result = parseRelationshipStatement('Entity1 ?<-> Entity2');

		const expected: RelationshipDescriptor = {
			relationShipName: undefined,
			direction: Direction.BIDIRECTIONAL,
			leftMember: {
				entity: 'Entity1',
				entityAlias: 'entity1',
				cardinality: Cardinality.ZERO_OR_ONE
			},
			rightMember: {
				entity: 'Entity2',
				entityAlias: 'entity2',
				cardinality: Cardinality.ONE
			}
		};

		expect(result).toStrictEqual(expected);

	});

	test('One-to-one bidirectional relationship with optional left and right sides', () => {

		const result = parseRelationshipStatement('Entity1 ?<->? Entity2');

		const expected: RelationshipDescriptor = {
			relationShipName: undefined,
			direction: Direction.BIDIRECTIONAL,
			leftMember: {
				entity: 'Entity1',
				entityAlias: 'entity1',
				cardinality: Cardinality.ZERO_OR_ONE
			},
			rightMember: {
				entity: 'Entity2',
				entityAlias: 'entity2',
				cardinality: Cardinality.ZERO_OR_ONE
			}
		};

		expect(result).toStrictEqual(expected);

	});

	test('Many-to-one relationship with alias on the left', () => {

		const result = parseRelationshipStatement('Entity1 e1 *-> Entity2');

		const expected: RelationshipDescriptor = {
			relationShipName: undefined,
			direction: Direction.LEFT_TO_RIGHT,
			leftMember: {
				entity: 'Entity1',
				entityAlias: 'e1',
				cardinality: Cardinality.MANY
			},
			rightMember: {
				entity: 'Entity2',
				entityAlias: 'entity2',
				cardinality: Cardinality.ONE
			}
		};

		expect(result).toStrictEqual(expected);

	});

	test('Many-to-one relationship with alias on the right', () => {

		const result = parseRelationshipStatement('Entity1 *-> Entity2 e2');

		const expected: RelationshipDescriptor = {
			relationShipName: undefined,
			direction: Direction.LEFT_TO_RIGHT,
			leftMember: {
				entity: 'Entity1',
				entityAlias: 'entity1',
				cardinality: Cardinality.MANY
			},
			rightMember: {
				entity: 'Entity2',
				entityAlias: 'e2',
				cardinality: Cardinality.ONE
			}
		};

		expect(result).toStrictEqual(expected);

	});

	test('Many-to-many relationship with custom name', () => {

		const result = parseRelationshipStatement('Entity1 *-> Entity2 (Rel)');

		const expected: RelationshipDescriptor = {
			relationShipName: 'Rel',
			direction: Direction.LEFT_TO_RIGHT,
			leftMember: {
				entity: 'Entity1',
				entityAlias: 'entity1',
				cardinality: Cardinality.MANY
			},
			rightMember: {
				entity: 'Entity2',
				entityAlias: 'entity2',
				cardinality: Cardinality.ONE
			}
		};

		expect(result).toStrictEqual(expected);

	});

	test('Relationship with leading spaces should fail', () => {

		const callback = () => {
			parseRelationshipStatement('   Entity1 -> Entity2');
		};

		expect(callback).toThrow(Error);

	});

	test('Relationship with middle and trailing spaces should be trimmed', () => {

		const result = parseRelationshipStatement('Entity1  \t   *->      \tEntity2   \t  (\tRel  )      \t   ');

		const expected: RelationshipDescriptor = {
			relationShipName: 'Rel',
			direction: Direction.LEFT_TO_RIGHT,
			leftMember: {
				entity: 'Entity1',
				entityAlias: 'entity1',
				cardinality: Cardinality.MANY
			},
			rightMember: {
				entity: 'Entity2',
				entityAlias: 'entity2',
				cardinality: Cardinality.ONE
			}
		};

		expect(result).toStrictEqual(expected);

	});

	test('Trailing comments in relationship line should be ignored', () => {

		const result = parseRelationshipStatement('Entity1  *-> Entity2 (Rel) # this is a comment');

		const expected: RelationshipDescriptor = {
			relationShipName: 'Rel',
			direction: Direction.LEFT_TO_RIGHT,
			leftMember: {
				entity: 'Entity1',
				entityAlias: 'entity1',
				cardinality: Cardinality.MANY
			},
			rightMember: {
				entity: 'Entity2',
				entityAlias: 'entity2',
				cardinality: Cardinality.ONE
			}
		};

		expect(result).toStrictEqual(expected);

	});

});
