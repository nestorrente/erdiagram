import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import DatabaseModelGeneratorConfig from '@/erdiagram/generator/database/model/config/DatabaseModelGeneratorConfig';
import StandardIdNamingStrategies from '@/erdiagram/generator/common/id-naming-strategy/StandardIdNamingStrategies';
import IdNamingStrategy from '@/erdiagram/generator/common/id-naming-strategy/IdNamingStrategy';
import {findKeyFromValue, findValueFromNullableKey} from '@/erdiagram/util/record-utils';
import DatabaseModelGeneratorSerializedConfig
	from '@/erdiagram/generator/database/model/config/DatabaseModelGeneratorSerializedConfig';

export class DatabaseModelGeneratorConfigManager
		extends AbstractComponentConfigManager<DatabaseModelGeneratorConfig, Partial<DatabaseModelGeneratorConfig>, DatabaseModelGeneratorSerializedConfig> {

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

	protected prepareBeforeSerializing(fullConfig: DatabaseModelGeneratorConfig): DatabaseModelGeneratorSerializedConfig {
		return {
			...fullConfig,
			idNamingStrategy: this.serializeIdNamingStrategy(fullConfig.idNamingStrategy)
		};
	}

	protected processAfterDeserializing(serializedConfig: DatabaseModelGeneratorSerializedConfig): DatabaseModelGeneratorConfig {
		return {
			...serializedConfig,
			idNamingStrategy: this.deserializeIdNamingStrategy(serializedConfig.idNamingStrategy)
		};
	}

	private serializeIdNamingStrategy(idNamingStrategy: IdNamingStrategy) {
		return findKeyFromValue(StandardIdNamingStrategies, idNamingStrategy);
	}

	private deserializeIdNamingStrategy(idNamingStrategy: string | undefined) {
		return findValueFromNullableKey(StandardIdNamingStrategies, idNamingStrategy, StandardIdNamingStrategies.DEFAULT);
	}

}

const databaseModelGeneratorConfigManager = new DatabaseModelGeneratorConfigManager();
export default databaseModelGeneratorConfigManager;
