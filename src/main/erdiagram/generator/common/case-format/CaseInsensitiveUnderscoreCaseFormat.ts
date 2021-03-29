import AbstractUnderscoreCaseFormat from '@/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat';
import {removeNonEmptyStrings} from '@/erdiagram/util/string-utils';

export default class CaseInsensitiveUnderscoreCaseFormat extends AbstractUnderscoreCaseFormat {

	public joinWords(words: string[]): string {
		return removeNonEmptyStrings(words).join('_');
	}

}
