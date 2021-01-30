import {capitalizeWord, uncapitalizeWord} from '../../../main/erdiagram/util/string-utils';

describe('Capitalize word', () => {

	test('Capitalize lower word should convert first letter to upper case', () => {

		const result = capitalizeWord('helloWorld');

		expect(result).toBe('HelloWorld');

	});

	test('Capitalize upper word should have no effect', () => {

		const result = capitalizeWord('HELLO_WORLD');

		expect(result).toBe('HELLO_WORLD');

	});

	test('Capitalize already capitalized word should have no effect', () => {

		const result = capitalizeWord('HelloWorld');

		expect(result).toBe('HelloWorld');

	});

	test('Capitalize text should capitalize first word only', () => {

		const result = capitalizeWord('hello world');

		expect(result).toBe('Hello world');

	});

});

describe('Uncapitalize word', () => {

	test('Uncapitalize upper word should convert first letter to lower case', () => {

		const result = uncapitalizeWord('HELLO_WORLD');

		expect(result).toBe('hELLO_WORLD');

	});

	test('Uncapitalize lower word should have no effect', () => {

		const result = uncapitalizeWord('hello_world');

		expect(result).toBe('hello_world');

	});

	test('Uncapitalize already uncapitalized word should have no effect', () => {

		const result = uncapitalizeWord('helloWorld');

		expect(result).toBe('helloWorld');

	});

	test('Uncapitalize text should uncapitalize first word only', () => {

		const result = uncapitalizeWord('HELLO WORLD');

		expect(result).toBe('hELLO WORLD');

	});

});
