import parseTypeScriptType from '@/erdiagram/converter/oop/code-converter/typescript/type/parseTypeScriptType';
import isTypeScriptParameterizedType
	from '../../../../../../../main/erdiagram/converter/oop/code-converter/typescript/type/parameterized/isTypeScriptParameterizedType';

describe('Well formatted types', () => {
	it.each([
		// Primitives
		['boolean', false],
		['number', false],
		['string', false],
		['undefined', false],
		['null', false],
		// Classes
		['Date', false],
		['HTMLElement', false],
		// Arrays of primitives
		['boolean[]', true],
		['number[]', true],
		['string[]', true],
		// Arrays of classes
		['Date[]', true],
		['HTMLElement[]', true],
		// Arrays of arrays
		['boolean[][]', true],
		['boolean[][][]', true],
		['Date[][]', true],
		['Date[][][]', true],
		// Parameterized types
		['A<B>', true],
		['A<B, C>', true],
		// Parameterized types with arrays
		['A<B>[]', true],
		['A<B[], C>', true],
		['A<B[], C[][]>[]', true],
		// Nested parameterized types
		['A<B<C>>', true],
		['A<B<C, D>>', true],
		['A<B<C>, D>', true],
		['A<B<C, D>, E>', true],
		// Nested parameterized types with arrays
		['A<B<C, D>[], E[][], F<G, H[]>>[][][]', true],
		// Allowed characters
		['A$b<$C[]>', true]
	] as [string, boolean][])(
			'Parsing "%s"',
			(input, isParameterizedType) => {

				const result = parseTypeScriptType(input);

				expect(result.format()).toBe(input);
				expect(isTypeScriptParameterizedType(result)).toBe(isParameterizedType);

			}
	);
});

describe('Correct types formatted differently', () => {
	it.each([
		['   boolean ', 'boolean', false],
		['  A< B \t  >', 'A<B>', true],
		['\tnumber [   \t]   ', 'number[]', true],
	] as [string, string, boolean][])(
			'Parsing "%s"',
			(input, expectedResult, isParameterizedType) => {

				const result = parseTypeScriptType(input);

				expect(result.format()).toBe(expectedResult);
				expect(isTypeScriptParameterizedType(result)).toBe(isParameterizedType);

			}
	);
});

describe('Incorrect types', () => {
	it.each([
		['.boolean'],
		['bool ean'],
		['Array<num ber>'],
		['Array<>'],
		['Array<'],
		['Array>'],
		['Array<number'],
		['Array<number>>'],
		['Array<number>['],
		['Array<number]>'],
		['Array<number][>'],
	])(
			'Parsing "%s"',
			(input) => {
				expect(() => parseTypeScriptType(input)).toThrow(Error);
			}
	);
});
