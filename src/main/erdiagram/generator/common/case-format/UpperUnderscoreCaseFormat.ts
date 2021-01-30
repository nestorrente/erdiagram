import AbstractUnderscoreCaseFormat from '@/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat';

export default class UpperUnderscoreCaseFormat extends AbstractUnderscoreCaseFormat {

	public joinWords(words: string[]): string {
		return words
				.map(word => word.toUpperCase())
				.join('_');
	}

}
