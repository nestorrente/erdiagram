import CaseFormat from '@/erdiagram/converter/common/case-format/CaseFormat';

export default class CaseConverter {

	constructor(
			private readonly originCaseFormat: CaseFormat,
			private readonly targetCaseFormat: CaseFormat
	) {

	}

	public convertCase(text: string) {
		const words = this.originCaseFormat.splitWords(text);
		return this.targetCaseFormat.joinWords(words);
	}

}
