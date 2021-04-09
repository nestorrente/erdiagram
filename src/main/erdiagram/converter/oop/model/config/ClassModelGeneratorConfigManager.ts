import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import ClassModelGeneratorConfig from '@/erdiagram/converter/oop/model/config/ClassModelGeneratorConfig';
import StandardIdNamingStrategies from '@/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies';
import {findKeyFromValue, findValueFromNullableKey} from '@/erdiagram/util/record-utils';
import ClassModelGeneratorSerializableConfig
	from '@/erdiagram/converter/oop/model/config/ClassModelGeneratorSerializableConfig';

export class ClassModelGeneratorConfigManager
		extends AbstractComponentConfigManager<ClassModelGeneratorConfig, Partial<ClassModelGeneratorConfig>, ClassModelGeneratorSerializableConfig> {

	getDefaultConfig(): ClassModelGeneratorConfig {
		return {
			idNamingStrategy: StandardIdNamingStrategies.DEFAULT
		};
	}

	mergeConfigs(fullConfig: ClassModelGeneratorConfig, partialConfig?: Partial<ClassModelGeneratorConfig>): ClassModelGeneratorConfig {
		return {
			...fullConfig,
			...partialConfig
		};
	}

	convertToSerializableObject(fullConfig: ClassModelGeneratorConfig): ClassModelGeneratorSerializableConfig {
		return {
			...fullConfig,
			idNamingStrategy: findKeyFromValue(StandardIdNamingStrategies, fullConfig.idNamingStrategy)
		};
	}

	convertFromSerializableObject(serializableConfig: ClassModelGeneratorSerializableConfig): ClassModelGeneratorConfig {
		return {
			...serializableConfig,
			idNamingStrategy: findValueFromNullableKey(StandardIdNamingStrategies, serializableConfig.idNamingStrategy, StandardIdNamingStrategies.DEFAULT)
		};
	}

}

const classModelGeneratorConfigManager = new ClassModelGeneratorConfigManager();
export default classModelGeneratorConfigManager;
