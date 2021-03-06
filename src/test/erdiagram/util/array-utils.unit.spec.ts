import {removeDuplicates, removeNullableValues} from '@/erdiagram/util/array-utils';

describe('Remove duplicates', () => {

	test('Remove duplicated primitive values', () => {

		const array = [1, 2, 3, 4, 3, 2, 1, 2];

		const result = removeDuplicates(array);

		expect(result).toStrictEqual([1, 2, 3, 4]);

	});

	test('Remove duplicated objects', () => {

		const objectA = {};
		const objectB = {};
		const objectC = {};

		const array = [objectA, objectA, objectB, objectC, objectB, objectA, objectC, objectB];

		const result = removeDuplicates(array);

		expect(result).toStrictEqual([objectA, objectB, objectC]);

	});

});

test('Remove nullable values', () => {

	const array = [undefined, 1, 2, null, 3, undefined, null, 4, null, 5, undefined];

	const result = removeNullableValues(array);

	expect(result).toStrictEqual([1, 2, 3, 4, 5]);

});
