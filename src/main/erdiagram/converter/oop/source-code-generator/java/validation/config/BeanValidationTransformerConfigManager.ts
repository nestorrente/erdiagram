import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import BeanValidationTransformerConfig, {PartialBeanValidationTransformerConfig} from '@/erdiagram/converter/oop/source-code-generator/java/validation/config/BeanValidationTransformerConfig';
import NotNullTextValidationStrategy
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullTextValidationStrategy';
import NotNullBlobValidationStrategy
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullBlobValidationStrategy';

export class BeanValidationTransformerConfigManager
		extends AbstractComponentConfigManager<BeanValidationTransformerConfig, PartialBeanValidationTransformerConfig> {

	getDefaultConfig(): BeanValidationTransformerConfig {
		return {
			notNullTextValidationStrategy: NotNullTextValidationStrategy.NOT_NULL,
			notNullBlobValidationStrategy: NotNullBlobValidationStrategy.NOT_NULL,
			annotateGetters: false
		};
	}

	mergeConfigs(fullConfig: BeanValidationTransformerConfig, partialConfig?: PartialBeanValidationTransformerConfig): BeanValidationTransformerConfig {
		return {
			...fullConfig,
			...partialConfig
		};
	}

}

const beanValidationTransformerConfigManager = new BeanValidationTransformerConfigManager();
export default beanValidationTransformerConfigManager;
