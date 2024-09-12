import DiagramCardinalityFormatter
	from '@/erdiagram/converter/diagram/common/DiagramCardinalityFormatter';
import { Cardinality } from '@/erdiagram/parser/types/entity-relationship-model-types';

const formatter = new DiagramCardinalityFormatter();

test.each<[Cardinality, expected: string]>([
	[Cardinality.ZERO_OR_ONE, '0..1'],
	[Cardinality.ONE, '1'],
	[Cardinality.MANY, '*'],
])('format(%s, %s)', (cardinality, expected) => {

	const result = formatter.format(cardinality);

	expect(result).toBe(expected);

});
