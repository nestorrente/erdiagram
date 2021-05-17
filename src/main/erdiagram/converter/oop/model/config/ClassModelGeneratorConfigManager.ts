import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import ClassModelGeneratorConfig, {PartialClassModelGeneratorConfig} from '@/erdiagram/converter/oop/model/config/ClassModelGeneratorConfig';
import StandardIdNamingStrategies from '@/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies';
import {findKeyFromValue, findValueFromNullableKey} from '@/erdiagram/util/record-utils';
import ClassModelGeneratorSerializableConfig
	from '@/erdiagram/converter/oop/model/config/ClassModelGeneratorSerializableConfig';

// import {JsonAdapters, NullishAwareJsonAdapter} from 'true-json';

export class ClassModelGeneratorConfigManager
		extends AbstractComponentConfigManager<ClassModelGeneratorConfig, PartialClassModelGeneratorConfig, ClassModelGeneratorSerializableConfig> {

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

	convertToSerializableObject(fullConfig: ClassModelGeneratorConfig): ClassModelGeneratorSerializableConfig {
		return {
			...fullConfig,
			idNamingStrategy: findKeyFromValue(StandardIdNamingStrategies, fullConfig.idNamingStrategy, 'DEFAULT')
		};
	}

	convertFromSerializableObject(serializableConfig: ClassModelGeneratorSerializableConfig): ClassModelGeneratorConfig {
		return {
			...serializableConfig,
			idNamingStrategy: findValueFromNullableKey(StandardIdNamingStrategies, serializableConfig.idNamingStrategy, StandardIdNamingStrategies.DEFAULT)
		};
	}

	// protected getJsonAdapter(): NullishAwareJsonAdapter<ClassModelGeneratorConfig> {
	// 	return JsonAdapters.object<ClassModelGeneratorConfig>({
	// 		idNamingStrategy: JsonAdapters.byKeyLenient(StandardIdNamingStrategies, 'DEFAULT')
	// 	});
	// }

}

const classModelGeneratorConfigManager = new ClassModelGeneratorConfigManager();
export default classModelGeneratorConfigManager;
