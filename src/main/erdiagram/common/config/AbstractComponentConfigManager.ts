import ComponentConfigManager from '@/erdiagram/common/config/ComponentConfigManager';

export default abstract class AbstractComponentConfigManager<C, P = Partial<C>> implements ComponentConfigManager<C, P> {

	abstract getDefaultConfig(): C;

	abstract mergeConfigs(fullConfig: C, partialConfig?: P): C;

	mergeWithDefaultConfig(partialConfig?: P): C {
		return this.mergeConfigs(this.getDefaultConfig(), partialConfig);
	}

	// serializeConfig(config: C): string {
	// 	return JSON.stringify(config);
	// }

	// deserializeConfig(serializedConfig: string): C {
	// 	return JSON.parse(serializedConfig);
	// }

}
