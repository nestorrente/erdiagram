import AbstractCamelCaseFormat from '@/dsl/generator/common/case-format/AbstractCamelCaseFormat';
import {capitalize} from '@/dsl/util/string-utils';

export default class UpperCamelCaseFormat extends AbstractCamelCaseFormat {

	public joinWords(words: string[]): string {
		return words
				.map(word => word.toLowerCase())
				.map(capitalize)
				.join('');
	}

}
