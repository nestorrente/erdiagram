import {findKeyFromValue, findValueFromNullableKey, mapValues} from '../../../main/erdiagram/util/record-utils';

test('Map object values', () => {

	const object = {
		a: 1,
		b: 2,
		c: 3
	};

	const result = mapValues(object, e => e * 2);

	expect(result).toStrictEqual({
		a: 2,
		b: 4,
		c: 6
	});

});

describe('Find the key corresponding to a specific value', () => {

	const object: Record<string, number> = {
		a: 1,
		b: 2,
		c: 3
	};

	const testParams: [number, string | undefined][] = [
		[1, 'a'],
		[2, 'b'],
		[3, 'c'],
		[4, undefined],
	];

	testParams.forEach(([value, expectedResult]) => {

		test(`Find the key corresponding to the value ${value}`, () => {

			const result = findKeyFromValue(object, value);

			expect(result).toBe(expectedResult);

		});

	});

});

describe('Find the value corresponding to a nullable key', () => {

	const object: Record<string, number> = {
		a: 1,
		b: 2,
		c: 3
	};

	const testParams: [string | undefined, number, number][] = [
		['a', -1, 1],
		['b', -1, 2],
		['c', -1, 3],
		[undefined, -1, -1],
	];

	testParams.forEach(([key, defaultValue, expectedResult]) => {

		test(`Find the key corresponding to the value ${expectedResult}`, () => {

			const result = findValueFromNullableKey(object, key, defaultValue);

			expect(result).toBe(expectedResult);

		});

	});

});
