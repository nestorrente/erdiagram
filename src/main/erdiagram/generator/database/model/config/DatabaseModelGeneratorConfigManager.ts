import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import DatabaseModelGeneratorConfig from '@/erdiagram/generator/database/model/config/DatabaseModelGeneratorConfig';
import StandardIdNamingStrategies from '@/erdiagram/generator/common/id-naming-strategy/StandardIdNamingStrategies';

export class DatabaseModelGeneratorConfigManager extends AbstractComponentConfigManager<DatabaseModelGeneratorConfig> {

	getDefaultConfig(): DatabaseModelGeneratorConfig {
		return {
			usePluralTableNames: false,
			idNamingStrategy: StandardIdNamingStrategies.DEFAULT
		};
	}

	mergeConfigs(fullConfig: DatabaseModelGeneratorConfig, partialConfig?: Partial<DatabaseModelGeneratorConfig>): DatabaseModelGeneratorConfig {
		return {
			...fullConfig,
			...partialConfig
		};
	}

	protected prepareBeforeSerializing(fullConfig: DatabaseModelGeneratorConfig): DatabaseModelGeneratorConfig {
		throw new Error('Method not implemented.');
	}

	protected processAfterDeserializing(serializedConfig: DatabaseModelGeneratorConfig): DatabaseModelGeneratorConfig {
		throw new Error('Method not implemented.');
	}

}

const databaseModelGeneratorConfigManager = new DatabaseModelGeneratorConfigManager();
export default databaseModelGeneratorConfigManager;
