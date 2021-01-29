import {parseEntityNameStatement} from '@/dsl/parser/statement/statement-types-parse-functions';

describe('', () => {

	test('Entity line with no spaces', () => {

		const result = parseEntityNameStatement('Entity');

		expect(result).toBe('Entity');

	});

	test('Entity line with trailing spaces should fail', () => {

		const callback = () => {
			parseEntityNameStatement('Entity  \t \t\t   ');
		};

		expect(callback).toThrow(Error);

	});

	test('Entity line with leading spaces shoud fail', () => {

		const callback = () => {
			parseEntityNameStatement(' Entity');
		};

		expect(callback).toThrow(Error);

	});

});
