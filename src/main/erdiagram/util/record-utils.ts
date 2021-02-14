export function mapValues<T, U>(record: Record<string, T>, mapper: (value: T) => U): Record<string, U> {
	return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, mapper(value)]));
}

export function findKeyFromValue<T>(record: Record<string, T>, value: T): string | undefined {
	const entry = Object.entries(record).find(entry => value === entry[1]);
	return entry?.[0];
}

export function findValueFromNullableKey<T>(record: Record<string, T>, key: string | undefined): T | undefined
export function findValueFromNullableKey<T>(record: Record<string, T>, key: string | undefined, defaultValue: T): T
export function findValueFromNullableKey<T>(record: Record<string, T>, key: string | undefined, defaultValue?: T): T | undefined {
	return key == null ? defaultValue : record[key];
}
