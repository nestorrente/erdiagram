import parseTypeScriptType from '@/erdiagram/generator/oop/code-converter/typescript/type/parseTypeScriptType';

describe('Well formatted types', () => {
	it.each([
		// Primitives
		['boolean'],
		['number'],
		['string'],
		['undefined'],
		['null'],
		// Classes
		['Date'],
		['HTMLElement'],
		// Arrays of primitives
		['boolean[]'],
		['number[]'],
		['string[]'],
		// Arrays of classes
		['Date[]'],
		['HTMLElement[]'],
		// Arrays of arrays
		['boolean[][]'],
		['boolean[][][]'],
		['Date[][]'],
		['Date[][][]'],
		// Parameterized types
		['A<B>'],
		['A<B, C>'],
		// Parameterized types with arrays
		['A<B>[]'],
		['A<B[], C>'],
		['A<B[], C[][]>[]'],
		// Nested parameterized types
		['A<B<C>>'],
		['A<B<C, D>>'],
		['A<B<C>, D>'],
		['A<B<C, D>, E>'],
		// Nested parameterized types with arrays
		['A<B<C, D>[], E[][], F<G, H[]>>[][][]'],
		// Allowed characters
		['A$b<$C[]>']
	])(
			'Parsing "%s"',
			(input) => {

				// When

				const result = parseTypeScriptType(input);

				// Then

				expect(result.format()).toBe(input);

			}
	);
});

describe('Correct types formatted differently', () => {
	it.each([
		['   boolean ', 'boolean'],
		['  A< B \t  >', 'A<B>'],
		['\tnumber [   \t]   ', 'number[]'],
	])(
			'Parsing "%s"',
			(input, expectedResult) => {

				// When

				const result = parseTypeScriptType(input);

				// Then

				expect(result.format()).toBe(expectedResult);

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
