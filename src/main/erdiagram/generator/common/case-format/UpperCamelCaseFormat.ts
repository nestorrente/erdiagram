import AbstractCamelCaseFormat from '@/erdiagram/generator/common/case-format/AbstractCamelCaseFormat';
import {capitalizeWord, removeNonEmptyStrings} from '@/erdiagram/util/string-utils';

export default class UpperCamelCaseFormat extends AbstractCamelCaseFormat {

	public joinWords(words: string[]): string {
		return removeNonEmptyStrings(words)
				.map(word => word.toLowerCase())
				.map(capitalizeWord)
				.join('');
	}

}
