import AbstractUnderscoreCaseFormat from '@/dsl/generator/common/case-format/AbstractUnderscoreCaseFormat';

export default class JoiningUnderscoreCaseFormat extends AbstractUnderscoreCaseFormat {

	public joinWords(words: string[]): string {
		return words.join('_');
	}

}
