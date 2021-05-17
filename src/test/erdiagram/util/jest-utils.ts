export type ValueAsserter<T> = (actualValue: T, expectedValue: T) => void;

export function assertSameRecords<K extends keyof any, V>(
		actual: Record<K, V>,
		expected: Record<K, V>,
		valueAsserter: ValueAsserter<V>
): void;
export function assertSameRecords<K extends keyof any, V>(
		actual: Partial<Record<K, V>>,
		expected: Partial<Record<K, V>>,
		valueAsserter: ValueAsserter<V | undefined>
): void;
export function assertSameRecords<K extends keyof any, V>(
		actual: Partial<Record<K, V>>,
		expected: Partial<Record<K, V>>,
		valueAsserter: ValueAsserter<V | undefined>
): void {

	const actualKeys = Object.keys(actual) as K[];
	const expectedKeys = Object.keys(expected) as K[];

	expect(actualKeys).toStrictEqual(expectedKeys);

	for (const key of actualKeys) {
		valueAsserter(actual[key]!, expected[key]!);
	}

}

export function assertSameArrays<T>(
		actual: T[],
		expected: T[],
		valueAsserter: ValueAsserter<T>
) {

	expect(actual).toHaveLength(expected.length);

	actual.forEach((actualValue, index) => {
		const expectedValue = expected[index];
		valueAsserter(actualValue, expectedValue);
	});

}
