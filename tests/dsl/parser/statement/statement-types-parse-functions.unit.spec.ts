import {parseEntityNameStatement} from '@/dsl/parser/statement/statement-types-parse-functions';

describe('', () => {

	test('Entity line with no spaces', () => {

		const result = parseEntityNameStatement('Entity');

		expect(result).toBe('Entity');

	});

});
