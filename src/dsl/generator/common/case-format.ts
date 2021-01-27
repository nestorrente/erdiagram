import {capitalize} from '@/dsl/util/string-utils';

export default interface CaseFormat {

	splitWords(text: string): string[];

	joinWords(words: string[]): string;

}

const lowerCammelCaseFormat: CaseFormat = {
	joinWords(words) {

		if (words.length === 0) {
			return '';
		}

		const [firstWord, ...otherWords] = words;

		const lowerCaseFirstWord = firstWord.toLowerCase();

		const capitalizedOtherWords = otherWords
				.map(word => word.toLowerCase())
				.map(capitalize);

		return lowerCaseFirstWord + capitalizedOtherWords.join('');

	}
};

const upperCammelCaseFormat: CaseFormat = {
	joinWords(words) {
		return words
				.map(word => word.toLowerCase())
				.map(capitalize)
				.join('');
	}
};

const lowerUnderscoreCaseFormat: CaseFormat = {
	joinWords(words) {
		return words
				.map(word => word.toLowerCase())
				.join('_');
	}
};

const capitalizedUnderscoreCaseFormat: CaseFormat = {
	joinWords(words) {
		return words
				.map(word => word.toLowerCase())
				.map(capitalize)
				.join('_');
	}
};

const upperUnderscoreCaseFormat: CaseFormat = {
	joinWords(words) {
		return words
				.map(word => word.toUpperCase())
				.join('_');
	},
	splitWords(text: string): string[] {
		return text.split('_');
	}
};

export const StandardCaseFormats = {
	LOWER_CAMMEL: lowerCammelCaseFormat,
	UPPER_CAMMEL: upperCammelCaseFormat,
	LOWER_UNDERSCORE: lowerUnderscoreCaseFormat,
	CAPITALIZED_UNDERSCORE: capitalizedUnderscoreCaseFormat,
	UPPER_UNDERSCORE: upperUnderscoreCaseFormat,
};
