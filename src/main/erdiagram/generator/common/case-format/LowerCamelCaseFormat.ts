import AbstractCamelCaseFormat from '@/erdiagram/generator/common/case-format/AbstractCamelCaseFormat';
import {capitalizeWord} from '@/erdiagram/util/string-utils';

export default class LowerCamelCaseFormat extends AbstractCamelCaseFormat {

	public joinWords(words: string[]): string {

		if (words.length === 0) {
			return '';
		}

		const [firstWord, ...otherWords] = words;

		const lowerCaseFirstWord = firstWord.toLowerCase();

		const capitalizedOtherWords = otherWords
				.map(word => word.toLowerCase())
				.map(capitalizeWord);

		return lowerCaseFirstWord + capitalizedOtherWords.join('');

	}

}
