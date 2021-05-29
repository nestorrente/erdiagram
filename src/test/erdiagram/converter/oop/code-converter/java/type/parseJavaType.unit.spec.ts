import parseJavaType from '@/erdiagram/converter/oop/code-converter/java/type/parseJavaType';

describe('Well formatted types', () => {
	it.each([
		// Primitives
		['boolean', 'boolean'],
		['byte', 'byte'],
		['short', 'short'],
		['int', 'int'],
		['long', 'long'],
		['float', 'float'],
		['double', 'double'],
		// Classes
		['java.lang.String', 'String'],
		['java.util.Date', 'Date'],
		['org.hibernate.query.Query', 'Query'],
		['ClassWithoutPackage', 'ClassWithoutPackage'],
		['com.Example', 'Example'],
		// Arrays of primitives
		['boolean[]', 'boolean[]'],
		['byte[]', 'byte[]'],
		['short[]', 'short[]'],
		['int[]', 'int[]'],
		['long[]', 'long[]'],
		['float[]', 'float[]'],
		['double[]', 'double[]'],
		// Arrays of classes
		['java.lang.String[]', 'String[]'],
		['java.util.Date[]', 'Date[]'],
		['org.hibernate.query.Query[]', 'Query[]'],
		['ClassWithoutPackage[]', 'ClassWithoutPackage[]'],
		['com.Example[]', 'Example[]'],
		// Arrays of arrays
		['boolean[][]', 'boolean[][]'],
		['boolean[][][]', 'boolean[][][]'],
		['java.lang.String[][]', 'String[][]'],
		['java.lang.String[][][]', 'String[][][]'],
		// Parameterized types
		['a.A<B>', 'A<B>'],
		['A<b.B, c.C>', 'A<B, C>'],
		// Parameterized types with arrays
		['a.A<B>[]', 'A<B>[]'],
		['A<b.B[], c.C>', 'A<B[], C>'],
		['com.example.A<org.example.B[], io.example.C[][]>[]', 'A<B[], C[][]>[]'],
		// Nested parameterized types
		['a.A<b.B<c.C>>', 'A<B<C>>'],
		['a.A<b.B<c.C, d.D>>', 'A<B<C, D>>'],
		['a.A<b.B<c.C>, d.D>', 'A<B<C>, D>'],
		['a.A<b.B<c.C, d.D>, e.E>', 'A<B<C, D>, E>'],
		// Nested parameterized types with arrays
		['a.A<b.B<c.C, d.D>[], e.E[][], f.F<g.G, h.H[]>>[][][]', 'A<B<C, D>[], E[][], F<G, H[]>>[][][]'],
		// Allowed characters
		['a$a.A$a<$b.$B[]>', 'A$a<$B[]>']
	])(
			'Parsing "%s"',
			(input, simpleFormat) => {

				const result = parseJavaType(input);

				expect(result.formatCanonical()).toBe(input);
				expect(result.formatSimple()).toBe(simpleFormat);

			}
	);
});

describe('Correct types formatted differently', () => {
	it.each([
		['   boolean ', 'boolean', 'boolean'],
		['java\t.  lang.String   ', 'java.lang.String', 'String'],
		['  a.A< B \t  >', 'a.A<B>', 'A<B>'],
		['\tint [   \t]   ', 'int[]', 'int[]'],
	])(
			'Parsing "%s"',
			(input, canonicalFormat, simpleFormat) => {

				const result = parseJavaType(input);

				expect(result.formatCanonical()).toBe(canonicalFormat);
				expect(result.formatSimple()).toBe(simpleFormat);

			}
	);
});

describe('Type equality', () => {
	it.each([
		['boolean', '   boolean '],
		['java.lang.String', 'java\t.  lang.String   '],
		['a.A<B>', '  a.A< B \t  >'],
		['int[]', '\tint [   \t]   '],
	])(
			'Parsing "%s"',
			(wellFormatted, badFormatted) => {

				const resultFromWellFormatted = parseJavaType(wellFormatted);
				const resultFromBadFormatted = parseJavaType(badFormatted);

				expect(resultFromWellFormatted).toStrictEqual(resultFromBadFormatted);

			}
	);
});

describe('Incorrect types', () => {
	it.each([
		['java..lang.String'],
		['java.lang..String'],
		['java.lang...String'],
		['java.lang.'],
		['.java.lang.String'],
		['java.lang String'],
		['java.util.List<Str ing>'],
		['java.util.List<>'],
		['java.util.List<'],
		['java.util.List>'],
		['java.util.List<String'],
		['java.util.List<String>>'],
		['java.util.List<String>['],
		['java.util.List<String]>'],
		['java.util.List<String][>'],
	])(
			'Parsing "%s"',
			(input) => {
				expect(() => parseJavaType(input)).toThrow(Error);
			}
	);
});
