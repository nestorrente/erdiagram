import StandardIdNamingStrategies from '@/erdiagram/generator/common/id-naming-strategy/StandardIdNamingStrategies';
import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import StandardCaseFormats from '@/erdiagram/generator/common/case-format/StandardCaseFormats';
import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import SqlServerDatabaseModelToCodeConverterConfig
	from '@/erdiagram/generator/database/code-converter/sqlserver/config/SqlServerDatabaseModelToCodeConverterConfig';

export class SqlServerDatabaseModelToCodeConverterConfigManager
		extends AbstractComponentConfigManager<SqlServerDatabaseModelToCodeConverterConfig> {

	getDefaultConfig(): SqlServerDatabaseModelToCodeConverterConfig {
		return {
			idColumnType: EntityPropertyType.LONG,
			idNamingStrategy: StandardIdNamingStrategies.DEFAULT,
			typeMappings: {
				[EntityPropertyType.TEXT]: 'nvarchar',
				[EntityPropertyType.LONG]: 'bigint',
				[EntityPropertyType.INT]: 'int',
				[EntityPropertyType.SHORT]: 'smallint',
				[EntityPropertyType.DECIMAL]: 'decimal',
				[EntityPropertyType.BOOLEAN]: 'bit',
				[EntityPropertyType.DATE]: 'date',
				[EntityPropertyType.TIME]: 'time',
				[EntityPropertyType.DATETIME]: 'datetime2'
			},
			tableNameCaseFormat: StandardCaseFormats.UPPER_CAMEL,
			columnNameCaseFormat: StandardCaseFormats.UPPER_CAMEL,
		};
	}

	mergeConfigs(fullConfig: SqlServerDatabaseModelToCodeConverterConfig, partialConfig?: Partial<SqlServerDatabaseModelToCodeConverterConfig>): SqlServerDatabaseModelToCodeConverterConfig {
		return {
			...fullConfig,
			...partialConfig,
			typeMappings: {
				...fullConfig.typeMappings,
				...partialConfig?.typeMappings
			}
		};
	}

}

const sqlServerDatabaseModelToCodeConverterConfigManager = new SqlServerDatabaseModelToCodeConverterConfigManager();
export default sqlServerDatabaseModelToCodeConverterConfigManager;
