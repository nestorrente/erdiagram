import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import DatabaseModelGeneratorConfig, {PartialDatabaseModelGeneratorConfig} from '@/erdiagram/converter/database/model/config/DatabaseModelGeneratorConfig';
import StandardIdNamingStrategies from '@/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies';
import {findKeyFromValue, findValueFromNullableKey} from '@/erdiagram/util/record-utils';
import DatabaseModelGeneratorSerializableConfig
	from '@/erdiagram/converter/database/model/config/DatabaseModelGeneratorSerializableConfig';

export class DatabaseModelGeneratorConfigManager
		extends AbstractComponentConfigManager<DatabaseModelGeneratorConfig, PartialDatabaseModelGeneratorConfig, DatabaseModelGeneratorSerializableConfig> {

	getDefaultConfig(): DatabaseModelGeneratorConfig {
		return {
			usePluralTableNames: false,
			idNamingStrategy: StandardIdNamingStrategies.DEFAULT
		};
	}

	mergeConfigs(fullConfig: DatabaseModelGeneratorConfig, partialConfig?: PartialDatabaseModelGeneratorConfig): DatabaseModelGeneratorConfig {
		return {
			...fullConfig,
			...partialConfig
		};
	}

	convertToSerializableObject(fullConfig: DatabaseModelGeneratorConfig): DatabaseModelGeneratorSerializableConfig {
		return {
			...fullConfig,
			idNamingStrategy: findKeyFromValue(StandardIdNamingStrategies, fullConfig.idNamingStrategy, 'DEFAULT')
		};
	}

	convertFromSerializableObject(serializableConfig: DatabaseModelGeneratorSerializableConfig): DatabaseModelGeneratorConfig {
		return {
			...serializableConfig,
			idNamingStrategy: findValueFromNullableKey(StandardIdNamingStrategies, serializableConfig.idNamingStrategy, StandardIdNamingStrategies.DEFAULT)
		};
	}

}

const databaseModelGeneratorConfigManager = new DatabaseModelGeneratorConfigManager();
export default databaseModelGeneratorConfigManager;
