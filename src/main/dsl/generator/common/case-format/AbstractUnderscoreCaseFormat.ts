import CaseFormat from '@/dsl/generator/common/case-format/CaseFormat';

export default abstract class AbstractUnderscoreCaseFormat implements CaseFormat {

	abstract joinWords(words: string[]): string;

	public splitWords(text: string): string[] {
		return text.split('_');
	}

}
