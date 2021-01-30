import AbstractUnderscoreCaseFormat from '@/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat';
import {capitalizeWord} from '@/erdiagram/util/string-utils';

export default class CapitalizedUnderscoreCaseFormat extends AbstractUnderscoreCaseFormat {

	public joinWords(words: string[]): string {
		return words
				.map(word => word.toLowerCase())
				.map(capitalizeWord)
				.join('_');
	}

}
