import ERDiagramError from '@/erdiagram/parser/types/error/ERDiagramError';

export default class ERDiagramParseLineError extends ERDiagramError {

	constructor(
			public readonly cause: ERDiagramError,
			public readonly lineIndex: number
	) {
		super(cause.message);
	}

	get lineNumber() {
		return this.lineIndex + 1;
	}

}
