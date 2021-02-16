import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import StandardCaseFormats from '@/erdiagram/generator/common/case-format/StandardCaseFormats';
import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import SqlServerDatabaseModelToCodeConverterConfig
	from '@/erdiagram/generator/database/code-converter/sqlserver/config/SqlServerDatabaseModelToCodeConverterConfig';
import {findKeyFromValue, findValueFromNullableKey} from '@/erdiagram/util/record-utils';
import SqlServerDatabaseModelToCodeConverterSerializedConfig
	from '@/erdiagram/generator/database/code-converter/sqlserver/config/SqlServerDatabaseModelToCodeConverterSerializedConfig';

export class SqlServerDatabaseModelToCodeConverterConfigManager
		extends AbstractComponentConfigManager<SqlServerDatabaseModelToCodeConverterConfig, Partial<SqlServerDatabaseModelToCodeConverterConfig>, SqlServerDatabaseModelToCodeConverterSerializedConfig> {

	getDefaultConfig(): SqlServerDatabaseModelToCodeConverterConfig {
		return {
			idColumnType: EntityPropertyType.LONG,
			typeMappings: {
				[EntityPropertyType.TEXT]: 'NVARCHAR',
				[EntityPropertyType.LONG]: 'BIGINT',
				[EntityPropertyType.INT]: 'INT',
				[EntityPropertyType.SHORT]: 'SMALLINT',
				[EntityPropertyType.DECIMAL]: 'DECIMAL',
				[EntityPropertyType.BOOLEAN]: 'BIT',
				[EntityPropertyType.DATE]: 'DATE',
				[EntityPropertyType.TIME]: 'TIME',
				[EntityPropertyType.DATETIME]: 'DATETIME2',
				[EntityPropertyType.BLOB]: 'VARBINARY(MAX)'
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

	convertToSerializableObject(fullConfig: SqlServerDatabaseModelToCodeConverterConfig): SqlServerDatabaseModelToCodeConverterSerializedConfig {
		return {
			...fullConfig,
			tableNameCaseFormat: findKeyFromValue(StandardCaseFormats, fullConfig.tableNameCaseFormat),
			columnNameCaseFormat: findKeyFromValue(StandardCaseFormats, fullConfig.columnNameCaseFormat),
		};
	}

	convertFromSerializableObject(serializedConfig: SqlServerDatabaseModelToCodeConverterSerializedConfig): SqlServerDatabaseModelToCodeConverterConfig {
		return {
			...serializedConfig,
			tableNameCaseFormat: findValueFromNullableKey(StandardCaseFormats, serializedConfig.tableNameCaseFormat, StandardCaseFormats.UPPER_CAMEL),
			columnNameCaseFormat: findValueFromNullableKey(StandardCaseFormats, serializedConfig.columnNameCaseFormat, StandardCaseFormats.UPPER_CAMEL),
		};
	}

}

const sqlServerDatabaseModelToCodeConverterConfigManager = new SqlServerDatabaseModelToCodeConverterConfigManager();
export default sqlServerDatabaseModelToCodeConverterConfigManager;