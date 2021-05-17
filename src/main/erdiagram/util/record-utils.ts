export function mapValues<T, U>(record: Record<string, T>, mapper: (value: T) => U): Record<string, U> {
	return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, mapper(value)]));
}

export function findKeyFromValue<T, R extends Record<string, T>>(record: R, value: T): keyof R | undefined;
export function findKeyFromValue<T, R extends Record<string, T>>(record: R, value: T, fallbackKey: keyof R): keyof R;
export function findKeyFromValue<T, R extends Record<string, T>>(record: R, value: T, fallbackKey?: keyof R): keyof R | undefined {
	const entry = Object.entries(record).find(entry => value === entry[1]);
	return entry?.[0] ?? fallbackKey;
}

export function findValueFromNullableKey<T>(record: Record<string, T>, key: string | undefined): T | undefined
export function findValueFromNullableKey<T>(record: Record<string, T>, key: string | undefined, defaultValue: T): T
export function findValueFromNullableKey<T>(record: Record<string, T>, key: string | undefined, defaultValue?: T): T | undefined {
	return key != null ? record[key] : defaultValue;
}
