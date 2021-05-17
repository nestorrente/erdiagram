export default interface ComponentConfigManager<C, P, S> {

	getDefaultConfig(): C;

	mergeConfigs(fullConfig: C, partialConfig: P): C;

	mergeWithDefaultConfig(partialConfig: P): C;

	convertToSerializableObject(fullConfig: C): S;

	convertFromSerializableObject(serializableConfig: S): C;

}
