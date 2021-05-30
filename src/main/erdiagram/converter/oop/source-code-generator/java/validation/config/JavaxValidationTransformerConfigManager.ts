import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import JavaxValidationTransformerConfig, {PartialJavaxValidationTransformerConfig} from '@/erdiagram/converter/oop/source-code-generator/java/validation/config/JavaxValidationTransformerConfig';
import NotNullTextValidationStrategy
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullTextValidationStrategy';
import NotNullBlobValidationStrategy
	from '@/erdiagram/converter/oop/source-code-generator/java/validation/strategy/NotNullBlobValidationStrategy';

export class JavaxValidationTransformerConfigManager
		extends AbstractComponentConfigManager<JavaxValidationTransformerConfig, PartialJavaxValidationTransformerConfig> {

	getDefaultConfig(): JavaxValidationTransformerConfig {
		return {
			notNullTextValidationStrategy: NotNullTextValidationStrategy.NOT_NULL,
			notNullBlobValidationStrategy: NotNullBlobValidationStrategy.NOT_NULL,
			annotateGetters: false
		};
	}

	mergeConfigs(fullConfig: JavaxValidationTransformerConfig, partialConfig?: PartialJavaxValidationTransformerConfig): JavaxValidationTransformerConfig {
		return {
			...fullConfig,
			...partialConfig
		};
	}

}

const javaxValidationTransformerConfigManager = new JavaxValidationTransformerConfigManager();
export default javaxValidationTransformerConfigManager;
