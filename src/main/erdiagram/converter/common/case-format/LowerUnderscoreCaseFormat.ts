import AbstractUnderscoreCaseFormat from '@/erdiagram/converter/common/case-format/AbstractUnderscoreCaseFormat';
import {removeNonEmptyStrings} from '@/erdiagram/util/string-utils';

export default class LowerUnderscoreCaseFormat extends AbstractUnderscoreCaseFormat {

	public joinWords(words: string[]): string {
		return removeNonEmptyStrings(words)
				.map(word => word.toLowerCase())
				.join('_');
	}

}
