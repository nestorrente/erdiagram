import StandardCaseFormats from '@/erdiagram/generator/common/case-format/StandardCaseFormats';
import CaseFormat from '@/erdiagram/generator/common/case-format/CaseFormat';

describe('Split words', () => {

	Object.entries(StandardCaseFormats).forEach(([caseFormatName, caseFormat]) => {

		test(`Split words from empty text using ${caseFormatName} case format`, () => {

			const result = caseFormat.splitWords('');

			expect(result).toStrictEqual([]);

		});

	})

	type SplitWordsTestCase = [keyof typeof StandardCaseFormats, string, string[]];

	const testCases: SplitWordsTestCase[] = [
		['LOWER_CAMEL', 'loremIpsumDolorSitAmet', ['lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet']],
		['UPPER_CAMEL', 'LoremIpsumDolorSitAmet', ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet']],
		['LOWER_UNDERSCORE', 'lorem_ipsum_dolor_sit_amet', ['lorem', 'ipsum', 'dolor', 'sit', 'amet']],
		['CAPITALIZED_UNDERSCORE', 'Lorem_Ipsum_Dolor_Sit_Amet', ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet']],
		['UPPER_UNDERSCORE', 'LOREM_IPSUM_DOLOR_SIT_AMET', ['LOREM', 'IPSUM', 'DOLOR', 'SIT', 'AMET']],
		['CASE_INSENSITIVE_UNDERSCORE', 'LOREM_ipsum_Dolor_sIT_aMeT', ['LOREM', 'ipsum', 'Dolor', 'sIT', 'aMeT']],
	];

	testCases.forEach(([caseFormatName, inputText, expectedResult]) => {

		const caseFormat: CaseFormat = StandardCaseFormats[caseFormatName];

		test(`Split words using ${caseFormatName} case format`, () => {

			const result = caseFormat.splitWords(inputText);

			expect(result).toStrictEqual(expectedResult);

		});

	})

});

describe('Join words', () => {

	Object.entries(StandardCaseFormats).forEach(([caseFormatName, caseFormat]) => {

		test(`Join words from empty array using ${caseFormatName} case format`, () => {

			const result = caseFormat.joinWords([]);

			expect(result).toStrictEqual('');

		});

	})

	type JoinWordsTestCase = [keyof typeof StandardCaseFormats, string];

	const inputWords = ['LOREM', 'ipsum', 'Dolor', 'sIT', 'aMeT'];

	const testCases: JoinWordsTestCase[] = [
		['LOWER_CAMEL', 'loremIpsumDolorSitAmet'],
		['UPPER_CAMEL', 'LoremIpsumDolorSitAmet'],
		['LOWER_UNDERSCORE', 'lorem_ipsum_dolor_sit_amet'],
		['CAPITALIZED_UNDERSCORE', 'Lorem_Ipsum_Dolor_Sit_Amet'],
		['UPPER_UNDERSCORE', 'LOREM_IPSUM_DOLOR_SIT_AMET'],
		['CASE_INSENSITIVE_UNDERSCORE', 'LOREM_ipsum_Dolor_sIT_aMeT'],
	];

	testCases.forEach(([caseFormatName, expectedResult]) => {

		const caseFormat: CaseFormat = StandardCaseFormats[caseFormatName];

		test(`Join words using ${caseFormatName} case format`, () => {

			const result = caseFormat.joinWords(inputWords);

			expect(result).toStrictEqual(expectedResult);

		});

	})

});
