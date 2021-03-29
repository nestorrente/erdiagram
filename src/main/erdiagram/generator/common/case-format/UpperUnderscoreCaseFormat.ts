import AbstractUnderscoreCaseFormat from '@/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat';
import {removeNonEmptyStrings} from '@/erdiagram/util/string-utils';

export default class UpperUnderscoreCaseFormat extends AbstractUnderscoreCaseFormat {

	public joinWords(words: string[]): string {
		return removeNonEmptyStrings(words)
				.map(word => word.toUpperCase())
				.join('_');
	}

}
