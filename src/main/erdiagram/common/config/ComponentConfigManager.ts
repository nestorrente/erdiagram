export default interface ComponentConfigManager<C, P = Partial<C>> {

	getDefaultConfig(): C;

	mergeConfigs(fullConfig: C, partialConfig: P): C;

	mergeWithDefaultConfig(partialConfig: P): C;

	cloneConfig(fullConfig: C): C;

	// serializeConfig(config: C): string;
	// deserializeConfig(serializedConfig: string): C;

}
