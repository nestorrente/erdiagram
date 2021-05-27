import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import JavaxValidationTransformerConfig, {PartialJavaxValidationTransformerConfig} from '@/erdiagram/converter/oop/code-converter/java/validation/config/JavaxValidationTransformerConfig';
import {JsonAdapter, JsonAdapters} from 'true-json';
import NotNullTextValidationStrategy
	from '@/erdiagram/converter/oop/code-converter/java/validation/strategy/NotNullTextValidationStrategy';
import NotNullBlobValidationStrategy
	from '@/erdiagram/converter/oop/code-converter/java/validation/strategy/NotNullBlobValidationStrategy';

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

	protected getJsonAdapter(): JsonAdapter<JavaxValidationTransformerConfig> {
		return JsonAdapters.object<JavaxValidationTransformerConfig>({
			notNullTextValidationStrategy: JsonAdapters.byKeyLenient(NotNullTextValidationStrategy, 'NOT_NULL'),
			notNullBlobValidationStrategy: JsonAdapters.byKeyLenient(NotNullBlobValidationStrategy, 'NOT_NULL')
		});
	}

}

const javaxValidationTransformerConfigManager = new JavaxValidationTransformerConfigManager();
export default javaxValidationTransformerConfigManager;
