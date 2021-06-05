import AbstractConfigManager from '@/erdiagram/common/config/AbstractConfigManager';
import DatabaseModelConfig, {PartialDatabaseModelConfig} from '@/erdiagram/converter/database/model/config/DatabaseModelConfig';
import StandardIdNamingStrategies from '@/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies';
import {JsonAdapter, JsonAdapters} from 'true-json';

export class DatabaseModelConfigManager extends AbstractConfigManager<DatabaseModelConfig, PartialDatabaseModelConfig> {

	getDefaultConfig(): DatabaseModelConfig {
		return {
			usePluralTableNames: false,
			idNamingStrategy: StandardIdNamingStrategies.DEFAULT
		};
	}

	mergeConfigs(fullConfig: DatabaseModelConfig, partialConfig?: PartialDatabaseModelConfig): DatabaseModelConfig {
		return {
			...fullConfig,
			...partialConfig
		};
	}

	protected getJsonAdapter(): JsonAdapter<DatabaseModelConfig> {
		return JsonAdapters.object<DatabaseModelConfig>({
			idNamingStrategy: JsonAdapters.byKeyLenient(StandardIdNamingStrategies, 'DEFAULT')
		});
	}

}

const databaseModelConfigManager = new DatabaseModelConfigManager();
export default databaseModelConfigManager;
