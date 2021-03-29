import CaseFormat from '@/erdiagram/generator/common/case-format/CaseFormat';
import {removeNonEmptyStrings} from '@/erdiagram/util/string-utils';

export default abstract class AbstractUnderscoreCaseFormat implements CaseFormat {

	abstract joinWords(words: string[]): string;

	public splitWords(text: string): string[] {
		return removeNonEmptyStrings(text.split('_'));
	}

}
