import {escapeRegExpSpecialChars, joinRegExps} from '@/erdiagram/util/regex-utils';

describe('Escape special characters', () => {

	test('Ensure input is interpreted as a literal string', () => {

		const literalString = '^a+$';
		const regex = new RegExp(escapeRegExpSpecialChars(literalString));

		const result = regex.test(literalString);

		expect(result).toBe(true);

	});

	test('Ensure input is not interpreted as a regex pattern', () => {

		const regex = new RegExp(escapeRegExpSpecialChars('^a+$'));

		const result = regex.test('aaaa');

		expect(result).toBe(false);

	});

});

describe('Join RegExps', () => {

	test('Join compiled RegExps', () => {

		const regex = joinRegExps(/^a+/, /b+$/);

		const result = regex.test('aaabb');

		expect(result).toBe(true);

	});

	test('Join literal strings', () => {

		const regex = joinRegExps('^a+', 'b+$');

		const result = regex.test('^a+b+$');

		expect(result).toBe(true);

	});

	test('Join compile RegExp with literal string', () => {

		const regex = joinRegExps(/^a+/, 'b+$');

		const result = regex.test('aaab+$');

		expect(result).toBe(true);

	});

});
