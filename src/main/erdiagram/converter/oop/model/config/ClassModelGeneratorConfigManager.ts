import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import ClassModelGeneratorConfig, {PartialClassModelGeneratorConfig} from '@/erdiagram/converter/oop/model/config/ClassModelGeneratorConfig';
import StandardIdNamingStrategies from '@/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies';
import {JsonAdapter, JsonAdapters} from 'true-json';

export class ClassModelGeneratorConfigManager
		extends AbstractComponentConfigManager<ClassModelGeneratorConfig, PartialClassModelGeneratorConfig> {

	getDefaultConfig(): ClassModelGeneratorConfig {
		return {
			idNamingStrategy: StandardIdNamingStrategies.DEFAULT
		};
	}

	mergeConfigs(fullConfig: ClassModelGeneratorConfig, partialConfig?: PartialClassModelGeneratorConfig): ClassModelGeneratorConfig {
		return {
			...fullConfig,
			...partialConfig
		};
	}

	protected getJsonAdapter(): JsonAdapter<ClassModelGeneratorConfig> {
		return JsonAdapters.object<ClassModelGeneratorConfig>({
			idNamingStrategy: JsonAdapters.byKeyLenient(StandardIdNamingStrategies, 'DEFAULT')
		});
	}

}

const classModelGeneratorConfigManager = new ClassModelGeneratorConfigManager();
export default classModelGeneratorConfigManager;
