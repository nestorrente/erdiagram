import AbstractUnderscoreCaseFormat from '@/erdiagram/converter/common/case-format/AbstractUnderscoreCaseFormat';
import {capitalizeWord, removeNonEmptyStrings} from '@/erdiagram/util/string-utils';

export default class CapitalizedUnderscoreCaseFormat extends AbstractUnderscoreCaseFormat {

	public joinWords(words: string[]): string {
		return removeNonEmptyStrings(words)
				.map(word => word.toLowerCase())
				.map(capitalizeWord)
				.join('_');
	}

}
