import CaseFormat from '@/erdiagram/converter/common/case-format/CaseFormat';

export default class CaseConverter {

	constructor(
			private readonly sourceCaseFormat: CaseFormat,
			private readonly targetCaseFormat: CaseFormat
	) {

	}

	public convertCase(text: string) {
		const words = this.sourceCaseFormat.splitWords(text);
		return this.targetCaseFormat.joinWords(words);
	}

}
