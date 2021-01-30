export function removeDuplicates<T>(array: T[]): T[] {
	return [...new Set<T>(array)];
}
