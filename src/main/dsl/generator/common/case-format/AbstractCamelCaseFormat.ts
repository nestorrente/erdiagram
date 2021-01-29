import CaseFormat from '@/dsl/generator/common/case-format/CaseFormat';

const CAMEL_CASE_WORD_BOUNDARIES_REGEX = /((?<=[^A-Z])(?=[A-Z])|(?=[A-Z][a-z]))/;

export default abstract class AbstractCamelCaseFormat implements CaseFormat {

	abstract joinWords(words: string[]): string;

	public splitWords(text: string): string[] {
		return text.split(CAMEL_CASE_WORD_BOUNDARIES_REGEX)
				.filter(chunk => chunk.length > 0);
	}

}
