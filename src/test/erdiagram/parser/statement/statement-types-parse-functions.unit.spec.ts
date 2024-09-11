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
} from '@/erdiagram/parser/types/entity-relationship-model-types';

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
			unique: true
		};

		expect(result).toStrictEqual(expected);

	});

	test('Entity property line with optional unique modifier', () => {

		const result = parseEntityPropertyStatement(' num?! short');

		const expected: EntityPropertyDescriptor = {
			name: 'num',
			type: EntityPropertyType.SHORT,
			length: [],
			optional: true,
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
			unique: false
		};

		expect(result).toStrictEqual(expected);

	});

});

describe('Parse relationship statement', () => {

	interface RecursivePartialRelationshipDescriptor {
		testCase: string;
		line: string;
		expected: {
			direction: Direction;
			relationshipName?: string;
			leftMember: {
				entity?: string;
				entityAlias?: string;
				cardinality: Cardinality;
			};
			rightMember: {
				entity?: string;
				entityAlias?: string;
				cardinality: Cardinality;
			};
		}
	}

	test.each<RecursivePartialRelationshipDescriptor>([
		{
			testCase: 'Many-to-one relationship to the right',
			line: 'Entity1 *-> Entity2',
			expected: {
				direction: Direction.LEFT_TO_RIGHT,
				leftMember: {
					cardinality: Cardinality.MANY
				},
				rightMember: {
					cardinality: Cardinality.ONE
				}
			}
		},
		{
			testCase: 'Many-to-many relationship to the left',
			line: 'Entity1 *<-* Entity2',
			expected: {
				direction: Direction.RIGHT_TO_LEFT,
				leftMember: {
					cardinality: Cardinality.MANY
				},
				rightMember: {
					cardinality: Cardinality.MANY
				}
			}
		},
		{
			testCase: 'Explicit one-to-one bidirectional relationship',
			line: 'Entity1 1<->1 Entity2',
			expected: {
				direction: Direction.BIDIRECTIONAL,
				leftMember: {
					cardinality: Cardinality.ONE
				},
				rightMember: {
					cardinality: Cardinality.ONE
				}
			}
		},
		{
			testCase: 'One-to-one bidirectional relationship with optional right side',
			line: 'Entity1 <->? Entity2',
			expected: {
				direction: Direction.BIDIRECTIONAL,
				leftMember: {
					cardinality: Cardinality.ONE
				},
				rightMember: {
					cardinality: Cardinality.ZERO_OR_ONE
				}
			}
		},
		{
			testCase: 'One-to-one bidirectional relationship with optional left side',
			line: 'Entity1 ?<-> Entity2',
			expected: {
				direction: Direction.BIDIRECTIONAL,
				leftMember: {
					cardinality: Cardinality.ZERO_OR_ONE
				},
				rightMember: {
					cardinality: Cardinality.ONE
				}
			}
		},
		{
			testCase: 'One-to-one bidirectional relationship with optional left and right sides',
			line: 'Entity1 ?<->? Entity2',
			expected: {
				direction: Direction.BIDIRECTIONAL,
				leftMember: {
					cardinality: Cardinality.ZERO_OR_ONE
				},
				rightMember: {
					cardinality: Cardinality.ZERO_OR_ONE
				}
			}
		},
		{
			testCase: 'Many-to-one relationship with alias on the left',
			line: 'Entity1 e1 *-> Entity2',
			expected: {
				direction: Direction.LEFT_TO_RIGHT,
				leftMember: {
					entityAlias: 'e1',
					cardinality: Cardinality.MANY
				},
				rightMember: {
					cardinality: Cardinality.ONE
				}
			}
		},
		{
			testCase: 'Many-to-one relationship with alias on the right',
			line: 'Entity1 *-> Entity2 e2',
			expected: {
				direction: Direction.LEFT_TO_RIGHT,
				leftMember: {
					cardinality: Cardinality.MANY
				},
				rightMember: {
					entityAlias: 'e2',
					cardinality: Cardinality.ONE
				}
			}
		},
		{
			testCase: 'Many-to-many relationship with custom name',
			line: 'Entity1 *-> Entity2 (Rel)',
			expected: {
				relationshipName: 'Rel',
				direction: Direction.LEFT_TO_RIGHT,
				leftMember: {
					cardinality: Cardinality.MANY
				},
				rightMember: {
					cardinality: Cardinality.ONE
				}
			}
		},
		{
			testCase: 'Relationship with middle and trailing spaces should be trimmed',
			line: 'Entity1  \t   *->      \tEntity2   \t  (\tRel  )      \t   ',
			expected: {
				relationshipName: 'Rel',
				direction: Direction.LEFT_TO_RIGHT,
				leftMember: {
					cardinality: Cardinality.MANY
				},
				rightMember: {
					cardinality: Cardinality.ONE
				}
			}
		},
		{
			testCase: 'Trailing comments in relationship line should be ignored',
			line: 'Entity1  *-> Entity2 (Rel) # this is a comment',
			expected: {
				relationshipName: 'Rel',
				direction: Direction.LEFT_TO_RIGHT,
				leftMember: {
					cardinality: Cardinality.MANY
				},
				rightMember: {
					cardinality: Cardinality.ONE
				}
			}
		}
	])('$testCase', ({ line, expected: partialExpected }) => {

		const result = parseRelationshipStatement(line);

		const expected: RelationshipDescriptor = {
			relationshipName: undefined,
			...partialExpected,
			leftMember: {
				entity: 'Entity1',
				entityAlias: 'entity1',
				...partialExpected.leftMember
			},
			rightMember: {
				entity: 'Entity2',
				entityAlias: 'entity2',
				...partialExpected.rightMember
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

});
