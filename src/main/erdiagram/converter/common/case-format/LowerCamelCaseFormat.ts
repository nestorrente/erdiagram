import AbstractCamelCaseFormat from '@/erdiagram/converter/common/case-format/AbstractCamelCaseFormat';
import {capitalizeWord, removeNonEmptyStrings} from '@/erdiagram/util/string-utils';

export default class LowerCamelCaseFormat extends AbstractCamelCaseFormat {

	public joinWords(words: string[]): string {

		const nonEmptyWords = removeNonEmptyStrings(words)

		if (nonEmptyWords.length === 0) {
			return '';
		}

		const [firstWord, ...otherWords] = nonEmptyWords;

		const lowerCaseFirstWord = firstWord.toLowerCase();

		const capitalizedOtherWords = otherWords
				.map(word => word.toLowerCase())
				.map(capitalizeWord);

		return lowerCaseFirstWord + capitalizedOtherWords.join('');

	}

}
