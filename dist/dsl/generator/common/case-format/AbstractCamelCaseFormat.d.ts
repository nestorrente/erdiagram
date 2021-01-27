import CaseFormat from '@/dsl/generator/common/case-format/CaseFormat';
export default abstract class AbstractCamelCaseFormat implements CaseFormat {
    abstract joinWords(words: string[]): string;
    splitWords(text: string): string[];
}
//# sourceMappingURL=AbstractCamelCaseFormat.d.ts.map