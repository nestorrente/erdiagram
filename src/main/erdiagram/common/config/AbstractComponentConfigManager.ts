import ComponentConfigManager from '@/erdiagram/common/config/ComponentConfigManager';

export default abstract class AbstractComponentConfigManager<C, P = Partial<C>> implements ComponentConfigManager<C, P> {

	abstract getDefaultConfig(): C;

	abstract mergeConfigs(fullConfig: C, partialConfig?: P): C;

	mergeWithDefaultConfig(partialConfig?: P): C {
		return this.mergeConfigs(this.getDefaultConfig(), partialConfig);
	}

	cloneConfig(fullConfig: C): C {
		return this.mergeConfigs(fullConfig);
	}

}
