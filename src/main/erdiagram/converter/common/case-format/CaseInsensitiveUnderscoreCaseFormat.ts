import AbstractUnderscoreCaseFormat from '@/erdiagram/converter/common/case-format/AbstractUnderscoreCaseFormat';
import {removeNonEmptyStrings} from '@/erdiagram/util/string-utils';

export default class CaseInsensitiveUnderscoreCaseFormat extends AbstractUnderscoreCaseFormat {

	public joinWords(words: string[]): string {
		return removeNonEmptyStrings(words).join('_');
	}

}
