import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import StandardCaseFormats from '@/erdiagram/generator/common/case-format/StandardCaseFormats';
import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import SqlServerDatabaseModelToCodeConverterConfig
	from '@/erdiagram/generator/database/code-converter/sqlserver/config/SqlServerDatabaseModelToCodeConverterConfig';
import {findKeyFromValue, findValueFromNullableKey} from '@/erdiagram/util/record-utils';
import SqlServerDatabaseModelToCodeConverterSerializableConfig
	from '@/erdiagram/generator/database/code-converter/sqlserver/config/SqlServerDatabaseModelToCodeConverterSerializableConfig';

export class SqlServerDatabaseModelToCodeConverterConfigManager
		extends AbstractComponentConfigManager<SqlServerDatabaseModelToCodeConverterConfig, Partial<SqlServerDatabaseModelToCodeConverterConfig>, SqlServerDatabaseModelToCodeConverterSerializableConfig> {

	getDefaultConfig(): SqlServerDatabaseModelToCodeConverterConfig {
		return {
			typeBindings: {
				[EntityPropertyType.IDENTIFIER]: 'BIGINT',
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
			typeBindings: {
				...fullConfig.typeBindings,
				...partialConfig?.typeBindings
			}
		};
	}

	convertToSerializableObject(fullConfig: SqlServerDatabaseModelToCodeConverterConfig): SqlServerDatabaseModelToCodeConverterSerializableConfig {
		return {
			...fullConfig,
			tableNameCaseFormat: findKeyFromValue(StandardCaseFormats, fullConfig.tableNameCaseFormat),
			columnNameCaseFormat: findKeyFromValue(StandardCaseFormats, fullConfig.columnNameCaseFormat),
		};
	}

	convertFromSerializableObject(serializableConfig: SqlServerDatabaseModelToCodeConverterSerializableConfig): SqlServerDatabaseModelToCodeConverterConfig {
		return {
			...serializableConfig,
			tableNameCaseFormat: findValueFromNullableKey(StandardCaseFormats, serializableConfig.tableNameCaseFormat, StandardCaseFormats.UPPER_CAMEL),
			columnNameCaseFormat: findValueFromNullableKey(StandardCaseFormats, serializableConfig.columnNameCaseFormat, StandardCaseFormats.UPPER_CAMEL),
		};
	}

}

const sqlServerDatabaseModelToCodeConverterConfigManager = new SqlServerDatabaseModelToCodeConverterConfigManager();
export default sqlServerDatabaseModelToCodeConverterConfigManager;
