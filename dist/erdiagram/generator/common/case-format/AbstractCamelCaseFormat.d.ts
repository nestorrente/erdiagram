import CaseFormat from './CaseFormat';
export default abstract class AbstractCamelCaseFormat implements CaseFormat {
    abstract joinWords(words: string[]): string;
    splitWords(text: string): string[];
}
//# sourceMappingURL=AbstractCamelCaseFormat.d.ts.map