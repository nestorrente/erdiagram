import AbstractConfigManager from '@/erdiagram/common/config/AbstractConfigManager';
import ClassModelConfig, {PartialClassModelConfig} from '@/erdiagram/converter/oop/model/config/ClassModelConfig';
import StandardIdNamingStrategies from '@/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies';
import {JsonAdapter, JsonAdapters} from 'true-json';

export class ClassModelConfigManager extends AbstractConfigManager<ClassModelConfig, PartialClassModelConfig> {

	getDefaultConfig(): ClassModelConfig {
		return {
			idNamingStrategy: StandardIdNamingStrategies.DEFAULT
		};
	}

	mergeConfigs(fullConfig: ClassModelConfig, partialConfig?: PartialClassModelConfig): ClassModelConfig {
		return {
			...fullConfig,
			...partialConfig
		};
	}

	protected getJsonAdapter(): JsonAdapter<ClassModelConfig> {
		return JsonAdapters.object<ClassModelConfig>({
			idNamingStrategy: JsonAdapters.byKeyLenient(StandardIdNamingStrategies, 'DEFAULT')
		});
	}

}

const classModelConfigManager = new ClassModelConfigManager();
export default classModelConfigManager;
