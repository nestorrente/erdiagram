import CaseFormat from '@/dsl/generator/common/case-format/CaseFormat';
export default abstract class AbstractUnderscoreCaseFormat implements CaseFormat {
    abstract joinWords(words: string[]): string;
    splitWords(text: string): string[];
}
//# sourceMappingURL=AbstractUnderscoreCaseFormat.d.ts.map