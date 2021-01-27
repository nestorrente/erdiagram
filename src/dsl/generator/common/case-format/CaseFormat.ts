export default interface CaseFormat {

	splitWords(text: string): string[];

	joinWords(words: string[]): string;

}
