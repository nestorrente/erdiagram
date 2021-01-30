import AbstractUnderscoreCaseFormat from '@/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat';
import {capitalize} from '@/erdiagram/util/string-utils';

export default class CapitalizedUnderscoreCaseFormat extends AbstractUnderscoreCaseFormat {

	public joinWords(words: string[]): string {
		return words
				.map(word => word.toLowerCase())
				.map(capitalize)
				.join('_');
	}

}
