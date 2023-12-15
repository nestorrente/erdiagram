const DEFAULT_INDENT = '    ';

export function indentLines(lines: string[], indent?: string | number) {
	const indentText = generateIndentText(indent);
	return lines.map(line => indentLineUsingIndentText(line, indentText));
}

export function indentLine(line: string, indent?: string | number) {
	return indentLineUsingIndentText(line, generateIndentText(indent));
}

function generateIndentText(indent: string | number = DEFAULT_INDENT): string {

	if (typeof indent !== 'number') {
		return indent;
	}

	return ''.padEnd(indent, ' ');

}

function indentLineUsingIndentText(line: string, indentText: string) {
	if (line.trim().length === 0) {
		return line;
	} else {
		return indentText + line;
	}
}
