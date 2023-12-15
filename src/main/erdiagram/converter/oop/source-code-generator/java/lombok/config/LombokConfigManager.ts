import AbstractConfigManager from '@/erdiagram/common/config/AbstractConfigManager';
import LombokConfig, { PartialLombokConfig } from '@/erdiagram/converter/oop/source-code-generator/java/lombok/config/LombokConfig';

export class LombokConfigManager extends AbstractConfigManager<LombokConfig, PartialLombokConfig> {

	getDefaultConfig(): LombokConfig {
		return {
			builderAnnotation: false,
			dataAnnotation: false,
			getterAnnotation: false,
			setterAnnotation: false,
			toStringAnnotation: false,
			equalsAndHashCodeAnnotation: false
		};
	}

	mergeConfigs(fullConfig: LombokConfig, partialConfig?: PartialLombokConfig): LombokConfig {
		return {
			...fullConfig,
			...partialConfig
		};
	}

}

const lombokConfigManager = new LombokConfigManager();
export default lombokConfigManager;
