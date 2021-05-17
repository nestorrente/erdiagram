import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import DatabaseModelGeneratorConfig, {PartialDatabaseModelGeneratorConfig} from '@/erdiagram/converter/database/model/config/DatabaseModelGeneratorConfig';
import StandardIdNamingStrategies from '@/erdiagram/converter/common/id-naming-strategy/StandardIdNamingStrategies';
import {JsonAdapter, JsonAdapters} from 'true-json';

export class DatabaseModelGeneratorConfigManager
		extends AbstractComponentConfigManager<DatabaseModelGeneratorConfig, PartialDatabaseModelGeneratorConfig> {

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

	protected getJsonAdapter(): JsonAdapter<DatabaseModelGeneratorConfig> {
		return JsonAdapters.object<DatabaseModelGeneratorConfig>({
			idNamingStrategy: JsonAdapters.byKeyLenient(StandardIdNamingStrategies, 'DEFAULT')
		});
	}

}

const databaseModelGeneratorConfigManager = new DatabaseModelGeneratorConfigManager();
export default databaseModelGeneratorConfigManager;
