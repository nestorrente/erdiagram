import {
	Cardinality,
	Direction,
	EntityPropertyDescriptor,
	EntityPropertyType,
	parseEntityNameStatement,
	parseEntityPropertyStatement,
	parseRelationshipStatement,
	RelationshipDescriptor
} from '@/erdiagram/parser/statement/statement-types-parse-functions';

describe('Parse entity name statement', () => {

	test('Entity line with no spaces', () => {

		const result = parseEntityNameStatement('Entity');

		expect(result).toBe('Entity');

	});

	test('Entity line with numbers', () => {

		const result = parseEntityNameStatement('Entity1234');

		expect(result).toBe('Entity1234');

	});

	test('Entity line with trailing spaces should fail', () => {

		const callback = () => {
			parseEntityNameStatement('Entity  \t \t\t   ');
		};

		expect(callback).toThrow(Error);

	});

	test('Entity line with leading spaces shoud fail', () => {

		const callback = () => {
			parseEntityNameStatement(' Entity');
		};

		expect(callback).toThrow(Error);

	});

});

describe('Parse entity property statement', () => {

	test('Entity property without length', () => {

		const result = parseEntityPropertyStatement(' active bool');

		const expected: EntityPropertyDescriptor = {
			name: 'active',
			type: EntityPropertyType.BOOLEAN,
			length: undefined,
			optional: false,
			autoincremental: false,
			unique: false
		};

		expect(result).toStrictEqual(expected);

	});

	test('Entity property with length', () => {

		const result = parseEntityPropertyStatement(' name text(40)');

		const expected: EntityPropertyDescriptor = {
			name: 'name',
			type: EntityPropertyType.TEXT,
			length: 40,
			optional: false,
			autoincremental: false,
			unique: false
		};

		expect(result).toStrictEqual(expected);

	});

	test('Entity property with optional modifier', () => {

		const result = parseEntityPropertyStatement(' num? short');

		const expected: EntityPropertyDescriptor = {
			name: 'num',
			type: EntityPropertyType.SHORT,
			length: undefined,
			optional: true,
			autoincremental: false,
			unique: false
		};

		expect(result).toStrictEqual(expected);

	});

	test('Entity property with autoincremental modifier', () => {

		const result = parseEntityPropertyStatement(' num+ short');

		const expected: EntityPropertyDescriptor = {
			name: 'num',
			type: EntityPropertyType.SHORT,
			length: undefined,
			optional: false,
			autoincremental: true,
			unique: false
		};

		expect(result).toStrictEqual(expected);

	});

	test('Entity property with unique modifier', () => {

		const result = parseEntityPropertyStatement(' num! short');

		const expected: EntityPropertyDescriptor = {
			name: 'num',
			type: EntityPropertyType.SHORT,
			length: undefined,
			optional: false,
			autoincremental: false,
			unique: true
		};

		expect(result).toStrictEqual(expected);

	});

	test('Entity property with optional, autoincremental and unique modifier', () => {

		const result = parseEntityPropertyStatement(' num?+! short');

		const expected: EntityPropertyDescriptor = {
			name: 'num',
			type: EntityPropertyType.SHORT,
			length: undefined,
			optional: true,
			autoincremental: true,
			unique: true
		};

		expect(result).toStrictEqual(expected);

	});

	test('Entity property of unknown type', () => {

		const callback = () => {
			parseEntityPropertyStatement(' name imaginaryType(50)');
		};

		expect(callback).toThrow(Error);

	});

	test('Entity property without leading spaces', () => {

		const callback = () => {
			parseEntityPropertyStatement('name text(50)');
		};

		expect(callback).toThrow(Error);

	});

});

describe('Parse relationship statement', () => {

	test('Many-to-one relationship to the right', () => {

		const result = parseRelationshipStatement('Entity1 *-> Entity2');

		const expected: RelationshipDescriptor = {
			relationShipName: 'Entity1Entity2',
			direction: Direction.RIGHT,
			leftMember: {
				entity: 'Entity1',
				entityAlias: 'entity1',
				cardinality: Cardinality.MANY,
				optional: false,
				unique: false
			},
			rightMember: {
				entity: 'Entity2',
				entityAlias: 'entity2',
				cardinality: Cardinality.ONE,
				optional: false,
				unique: false
			}
		};

		expect(result).toStrictEqual(expected);

	});

	test('Many-to-many relationship to the left', () => {

		const result = parseRelationshipStatement('Entity1 *<-* Entity2');

		const expected: RelationshipDescriptor = {
			relationShipName: 'Entity1Entity2',
			direction: Direction.LEFT,
			leftMember: {
				entity: 'Entity1',
				entityAlias: 'entity1',
				cardinality: Cardinality.MANY,
				optional: false,
				unique: false
			},
			rightMember: {
				entity: 'Entity2',
				entityAlias: 'entity2',
				cardinality: Cardinality.MANY,
				optional: false,
				unique: false
			}
		};

		expect(result).toStrictEqual(expected);

	});

	test('Explicit one-to-one bidirectional relationship', () => {

		const result = parseRelationshipStatement('Entity1 1<->1 Entity2');

		const expected: RelationshipDescriptor = {
			relationShipName: 'Entity1Entity2',
			direction: Direction.BOTH,
			leftMember: {
				entity: 'Entity1',
				entityAlias: 'entity1',
				cardinality: Cardinality.ONE,
				optional: false,
				unique: false
			},
			rightMember: {
				entity: 'Entity2',
				entityAlias: 'entity2',
				cardinality: Cardinality.ONE,
				optional: false,
				unique: false
			}
		};

		expect(result).toStrictEqual(expected);

	});

	test('One-to-one bidirectional relationship with optional right side', () => {

		const result = parseRelationshipStatement('Entity1 <->? Entity2');

		const expected: RelationshipDescriptor = {
			relationShipName: 'Entity1Entity2',
			direction: Direction.BOTH,
			leftMember: {
				entity: 'Entity1',
				entityAlias: 'entity1',
				cardinality: Cardinality.ONE,
				optional: false,
				unique: false
			},
			rightMember: {
				entity: 'Entity2',
				entityAlias: 'entity2',
				cardinality: Cardinality.ONE,
				optional: true,
				unique: false
			}
		};

		expect(result).toStrictEqual(expected);

	});

	test('One-to-one bidirectional relationship with optional left side and unique right side', () => {

		const result = parseRelationshipStatement('Entity1 ?<->! Entity2');

		const expected: RelationshipDescriptor = {
			relationShipName: 'Entity1Entity2',
			direction: Direction.BOTH,
			leftMember: {
				entity: 'Entity1',
				entityAlias: 'entity1',
				cardinality: Cardinality.ONE,
				optional: true,
				unique: false
			},
			rightMember: {
				entity: 'Entity2',
				entityAlias: 'entity2',
				cardinality: Cardinality.ONE,
				optional: false,
				unique: true
			}
		};

		expect(result).toStrictEqual(expected);

	});

	test('Many-to-one relationship with alias on the left', () => {

		const result = parseRelationshipStatement('Entity1 e1 *-> Entity2');

		const expected: RelationshipDescriptor = {
			relationShipName: 'Entity1Entity2',
			direction: Direction.RIGHT,
			leftMember: {
				entity: 'Entity1',
				entityAlias: 'e1',
				cardinality: Cardinality.MANY,
				optional: false,
				unique: false
			},
			rightMember: {
				entity: 'Entity2',
				entityAlias: 'entity2',
				cardinality: Cardinality.ONE,
				optional: false,
				unique: false
			}
		};

		expect(result).toStrictEqual(expected);

	});

	test('Many-to-one relationship with alias on the right', () => {

		const result = parseRelationshipStatement('Entity1 *-> Entity2 e2');

		const expected: RelationshipDescriptor = {
			relationShipName: 'Entity1Entity2',
			direction: Direction.RIGHT,
			leftMember: {
				entity: 'Entity1',
				entityAlias: 'entity1',
				cardinality: Cardinality.MANY,
				optional: false,
				unique: false
			},
			rightMember: {
				entity: 'Entity2',
				entityAlias: 'e2',
				cardinality: Cardinality.ONE,
				optional: false,
				unique: false
			}
		};

		expect(result).toStrictEqual(expected);

	});

	test('Many-to-many relationship with custom name', () => {

		const result = parseRelationshipStatement('Entity1 *-> Entity2 (Rel)');

		const expected: RelationshipDescriptor = {
			relationShipName: 'Rel',
			direction: Direction.RIGHT,
			leftMember: {
				entity: 'Entity1',
				entityAlias: 'entity1',
				cardinality: Cardinality.MANY,
				optional: false,
				unique: false
			},
			rightMember: {
				entity: 'Entity2',
				entityAlias: 'entity2',
				cardinality: Cardinality.ONE,
				optional: false,
				unique: false
			}
		};

		expect(result).toStrictEqual(expected);

	});

	test('Relationship with leading spaces', () => {

		const callback = () => {
			parseRelationshipStatement('   Entity1 -> Entity2');
		};

		expect(callback).toThrow(Error);

	});

});
