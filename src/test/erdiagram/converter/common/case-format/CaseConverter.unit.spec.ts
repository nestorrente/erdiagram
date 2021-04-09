import CaseFormat from '@/erdiagram/converter/common/case-format/CaseFormat';
import CaseConverter from '@/erdiagram/converter/common/case-format/CaseConverter';
import {removeNonEmptyStrings} from '@/erdiagram/util/string-utils';

const hashCaseFormat: CaseFormat = {
	joinWords(words: string[]): string {
		return removeNonEmptyStrings(words).join('#');
	},
	splitWords(text: string): string[] {
		return removeNonEmptyStrings(text.split('#'));
	}
};

const doubleDollarCaseFormat: CaseFormat = {
	joinWords(words: string[]): string {
		return removeNonEmptyStrings(words).join('$$');
	},
	splitWords(text: string): string[] {
		return removeNonEmptyStrings(text.split('$$'));
	}
};

const hashCaseText = 'lorem#ipsum#dolor#sit#amet';
const doubleDollarCaseText = 'lorem$$ipsum$$dolor$$sit$$amet';

test('Convert case from hash case to double-dollar case', () => {

	const caseConverter = new CaseConverter(hashCaseFormat, doubleDollarCaseFormat);
	const result = caseConverter.convertCase(hashCaseText);

	expect(result).toBe(doubleDollarCaseText);

});

test('Convert case from double-dollar case to hash case', () => {

	const caseConverter = new CaseConverter(doubleDollarCaseFormat, hashCaseFormat);
	const result = caseConverter.convertCase(doubleDollarCaseText);

	expect(result).toBe(hashCaseText);

});
