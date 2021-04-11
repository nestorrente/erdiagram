export function removeDuplicates<T>(array: T[]): T[] {
	return [...new Set<T>(array)];
}

export function removeNullableValues<T>(array: (T | null | undefined)[]): T[] {
	return array.filter(e => e != null) as T[];
}
