import AbstractUnderscoreCaseFormat from '@/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat';

export default class LowerUnderscoreCaseFormat extends AbstractUnderscoreCaseFormat {

	public joinWords(words: string[]): string {
		return words
				.map(word => word.toLowerCase())
				.join('_');
	}

}
