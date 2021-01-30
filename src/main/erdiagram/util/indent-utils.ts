const DEFAULT_INDENT = '    ';

export function indentLines(lines: string[], indent?: string | number) {
	return lines.map(line => indentLine(line, indent));
}

export function indentLine(line: string, indent: string | number = DEFAULT_INDENT) {
	if (line.trim().length === 0) {
		return line;
	} else {
		return generateIndentText(indent) + line;
	}
}

function generateIndentText(indent: string | number): string {

	if (typeof indent !== 'number') {
		return indent;
	}

	return ''.padEnd(indent, ' ');

}
