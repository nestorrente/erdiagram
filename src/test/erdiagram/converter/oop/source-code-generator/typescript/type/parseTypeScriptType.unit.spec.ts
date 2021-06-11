import parseTypeScriptType from '@/erdiagram/converter/oop/source-code-generator/typescript/type/parseTypeScriptType';
import isTypeScriptParameterizedType
	from '@/erdiagram/converter/oop/source-code-generator/typescript/type/parameterized/isTypeScriptParameterizedType';

describe('Well formatted types', () => {
	it.each([
		// Primitives
		['boolean', 'boolean', false],
		['number', 'number', false],
		['string', 'string', false],
		['undefined', 'undefined', false],
		['null', 'null', false],
		// Classes
		['Date', 'Date', false],
		['HTMLElement', 'HTMLElement', false],
		// Arrays of primitives
		['boolean[]', 'Array', true],
		['number[]', 'Array', true],
		['string[]', 'Array', true],
		// Arrays of classes
		['Date[]', 'Array', true],
		['HTMLElement[]', 'Array', true],
		// Arrays of arrays
		['boolean[][]', 'Array', true],
		['boolean[][][]', 'Array', true],
		['Date[][]', 'Array', true],
		['Date[][][]', 'Array', true],
		// Parameterized types
		['A<B>', 'A', true],
		['A<B, C>', 'A', true],
		// Parameterized types with arrays
		['A<B>[]', 'Array', true],
		['A<B[], C>', 'A', true],
		['A<B[], C[][]>[]', 'Array', true],
		// Nested parameterized types
		['A<B<C>>', 'A', true],
		['A<B<C, D>>', 'A', true],
		['A<B<C>, D>', 'A', true],
		['A<B<C, D>, E>', 'A', true],
		// Nested parameterized types with arrays
		['A<B<C, D>[], E[][], F<G, H[]>>[][][]', 'Array', true],
		// Allowed characters
		['A$b<$C[]>', 'A$b', true]
	] as [string, string, boolean][])(
			'Parsing "%s"',
			(input, typeName, isParameterizedType) => {

				const result = parseTypeScriptType(input);

				expect(result.name).toBe(typeName);
				expect(result.format()).toBe(input);
				expect(isTypeScriptParameterizedType(result)).toBe(isParameterizedType);

			}
	);
});

describe('Correct types formatted differently', () => {
	it.each([
		['   boolean ', 'boolean', 'boolean', false],
		['  A< B \t  >', 'A<B>', 'A', true],
		['\tnumber [   \t]   ', 'number[]', 'Array', true],
	] as [string, string, string, boolean][])(
			'Parsing "%s"',
			(input, expectedResult, typeName, isParameterizedType) => {

				const result = parseTypeScriptType(input);

				expect(result.name).toBe(typeName);
				expect(result.format()).toBe(expectedResult);
				expect(isTypeScriptParameterizedType(result)).toBe(isParameterizedType);

			}
	);
});

describe('Type equality', () => {
	it.each([
		['boolean', '   boolean '],
		['A<B>', '  A< B \t  >'],
		['number[]', '\tnumber [   \t]   '],
	])(
			'Parsing "%s"',
			(badFormatted, wellFormatted) => {

				const resultFromWellFormatted = parseTypeScriptType(wellFormatted);
				const resultFromBadFormatted = parseTypeScriptType(badFormatted);

				expect(resultFromWellFormatted).toStrictEqual(resultFromBadFormatted);

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
