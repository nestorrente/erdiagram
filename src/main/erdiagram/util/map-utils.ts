export function classifyBy<T, K, V>(objects: T[], keyMapper: (object: T) => K, valueMapper: (object: T) => V): Map<K, V> {

	const map = new Map<K, V>();

	objects.forEach(object => {

		const key = keyMapper(object);
		const value = valueMapper(object);

		map.set(key, value);

	});

	return map;

}
