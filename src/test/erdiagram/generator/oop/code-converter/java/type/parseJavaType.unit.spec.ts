import parseJavaType from '@/erdiagram/generator/oop/code-converter/java/type/parseJavaType';

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
])(
		'Parsing "%s"',
		(input, simpleFormat) => {

			// When

			const result = parseJavaType(input);

			// Then

			expect(result.formatCanonical()).toBe(input);
			expect(result.formatSimple()).toBe(simpleFormat);

		}
);
