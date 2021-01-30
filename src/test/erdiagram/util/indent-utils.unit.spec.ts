import {indentLine, indentLines} from '../../../main/erdiagram/util/indent-utils';

describe('Indent one line', () => {

	test('Indent empty line', () => {

		const inputLine = '';

		const result = indentLine(inputLine);

		expect(result).toBe(inputLine);

	});

	test('Indent blank line', () => {

		const inputLine = '\t  \t\t ';

		const result = indentLine(inputLine);

		expect(result).toBe(inputLine);

	});

	test('Indent non-indented line', () => {

		const inputLine = 'text';

		const result = indentLine(inputLine);

		expect(result).toBe('    text');

	});

	test('Indent already-indented line', () => {

		const inputLine = '\ttext';

		const result = indentLine(inputLine);

		expect(result).toBe('    \ttext');

	});

	test('Use custom indent size', () => {

		const inputLine = 'text';

		const result = indentLine(inputLine, 2);

		expect(result).toBe('  text');

	});

	test('Use custom indent text', () => {

		const inputLine = 'text';

		const result = indentLine(inputLine, '\t');

		expect(result).toBe('\ttext');

	});

});

describe('Indent multiple lines', () => {

	test('Indent lines mixing empty, blank, non-indented and already indented lines', () => {

		const inputLines = [
			'',
			'\t',
			'   ',
			' indented with space',
			'\tindented with tab',
			'non-indented'
		];

		const result = indentLines(inputLines);

		expect(result).toStrictEqual([
			'',
			'\t',
			'   ',
			'     indented with space',
			'    \tindented with tab',
			'    non-indented'
		]);

	});

});
