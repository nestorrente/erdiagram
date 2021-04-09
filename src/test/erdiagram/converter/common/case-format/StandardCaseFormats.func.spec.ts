import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';
import CaseFormat from '@/erdiagram/converter/common/case-format/CaseFormat';

describe('Split words', () => {

	Object.entries(StandardCaseFormats).forEach(([caseFormatName, caseFormat]) => {

		test(`Split words from empty text using ${caseFormatName} case format`, () => {

			const result = caseFormat.splitWords('');

			expect(result).toStrictEqual([]);

		});

	})

	type SplitWordsTestCase = [keyof typeof StandardCaseFormats, string, string[]];

	const testCases: SplitWordsTestCase[] = [
		['LOWER_CAMEL', 'loremIpsumDolorSitAmet0', ['lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', '0']],
		['UPPER_CAMEL', 'LoremIpsumDolorSitAmet0', ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', '0']],
		['LOWER_UNDERSCORE', 'lorem_ipsum_dolor_sit_amet_0', ['lorem', 'ipsum', 'dolor', 'sit', 'amet', '0']],
		['CAPITALIZED_UNDERSCORE', 'Lorem_Ipsum_Dolor_Sit_Amet_0', ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', '0']],
		['UPPER_UNDERSCORE', 'LOREM_IPSUM_DOLOR_SIT_AMET_0', ['LOREM', 'IPSUM', 'DOLOR', 'SIT', 'AMET', '0']],
		['CASE_INSENSITIVE_UNDERSCORE', 'LOREM_ipsum_Dolor_sIT_aMeT_0', ['LOREM', 'ipsum', 'Dolor', 'sIT', 'aMeT', '0']],
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

	const inputWords = ['LOREM', 'ipsum', 'Dolor', 'sIT', 'aMeT', '0'];

	const testCases: JoinWordsTestCase[] = [
		['LOWER_CAMEL', 'loremIpsumDolorSitAmet0'],
		['UPPER_CAMEL', 'LoremIpsumDolorSitAmet0'],
		['LOWER_UNDERSCORE', 'lorem_ipsum_dolor_sit_amet_0'],
		['CAPITALIZED_UNDERSCORE', 'Lorem_Ipsum_Dolor_Sit_Amet_0'],
		['UPPER_UNDERSCORE', 'LOREM_IPSUM_DOLOR_SIT_AMET_0'],
		['CASE_INSENSITIVE_UNDERSCORE', 'LOREM_ipsum_Dolor_sIT_aMeT_0'],
	];

	testCases.forEach(([caseFormatName, expectedResult]) => {

		const caseFormat: CaseFormat = StandardCaseFormats[caseFormatName];

		test(`Join words using ${caseFormatName} case format`, () => {

			const result = caseFormat.joinWords(inputWords);

			expect(result).toStrictEqual(expectedResult);

		});

	})

});
