import ERDiagramParseLineError from '@/erdiagram/parser/types/error/ERDiagramParseLineError';
import ERDiagramError from '@/erdiagram/parser/types/error/ERDiagramError';

test('Line number getter', () => {

	[0, 10, 42, 1970].forEach(lineIndex => {

		const lineNumber = lineIndex + 1;
		const errorMessage = `This is a error on line ${lineNumber}`;

		const lineError = new ERDiagramParseLineError(new ERDiagramError(errorMessage), lineIndex);

		expect(lineError.message).toBe(errorMessage);
		expect(lineError.lineIndex).toBe(lineIndex);
		expect(lineError.lineNumber).toBe(lineNumber);

	});

});
