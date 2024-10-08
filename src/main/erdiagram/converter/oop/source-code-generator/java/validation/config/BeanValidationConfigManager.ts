import AbstractConfigManager from '@/erdiagram/common/config/AbstractConfigManager';
import BeanValidationConfig, { PartialBeanValidationConfig } from '@/erdiagram/converter/oop/source-code-generator/java/validation/config/BeanValidationConfig';
import NotNullTextValidationStrategy
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullTextValidationStrategy';
import NotNullBlobValidationStrategy
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullBlobValidationStrategy';
import JavaExtendedPackage from '@/erdiagram/converter/oop/source-code-generator/java/type/JavaExtendedPackage';

export class BeanValidationConfigManager
		extends AbstractConfigManager<BeanValidationConfig, PartialBeanValidationConfig> {

	getDefaultConfig(): BeanValidationConfig {
		return {
			notNullTextValidationStrategy: NotNullTextValidationStrategy.NOT_NULL,
			notNullBlobValidationStrategy: NotNullBlobValidationStrategy.NOT_NULL,
			javaExtendedPackage: JavaExtendedPackage.JAKARTA,
			annotateGetters: false
		};
	}

	mergeConfigs(fullConfig: BeanValidationConfig, partialConfig?: PartialBeanValidationConfig): BeanValidationConfig {
		return {
			...fullConfig,
			...partialConfig
		};
	}

}

const beanValidationConfigManager = new BeanValidationConfigManager();
export default beanValidationConfigManager;
