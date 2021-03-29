import CaseFormat from '@/erdiagram/generator/common/case-format/CaseFormat';
import {removeNonEmptyStrings} from '@/erdiagram/util/string-utils';

const CAMEL_CASE_WORD_BOUNDARIES_REGEX = /((?<=[^A-Z])(?=[A-Z])|(?=[A-Z][a-z]))/;

export default abstract class AbstractCamelCaseFormat implements CaseFormat {

	abstract joinWords(words: string[]): string;

	public splitWords(text: string): string[] {
		return removeNonEmptyStrings(text.split(CAMEL_CASE_WORD_BOUNDARIES_REGEX));
	}

}
