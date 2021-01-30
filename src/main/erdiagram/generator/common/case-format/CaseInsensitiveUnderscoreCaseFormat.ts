import AbstractUnderscoreCaseFormat from '@/erdiagram/generator/common/case-format/AbstractUnderscoreCaseFormat';

export default class CaseInsensitiveUnderscoreCaseFormat extends AbstractUnderscoreCaseFormat {

	public joinWords(words: string[]): string {
		return words.join('_');
	}

}
