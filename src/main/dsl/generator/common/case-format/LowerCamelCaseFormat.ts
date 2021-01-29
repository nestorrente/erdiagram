import AbstractCamelCaseFormat from '@/dsl/generator/common/case-format/AbstractCamelCaseFormat';
import {capitalize} from '@/dsl/util/string-utils';

export default class LowerCamelCaseFormat extends AbstractCamelCaseFormat {

	public joinWords(words: string[]): string {

		if (words.length === 0) {
			return '';
		}

		const [firstWord, ...otherWords] = words;

		const lowerCaseFirstWord = firstWord.toLowerCase();

		const capitalizedOtherWords = otherWords
				.map(word => word.toLowerCase())
				.map(capitalize);

		return lowerCaseFirstWord + capitalizedOtherWords.join('');

	}

}
