import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';
import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import SqlServerDialectConfig
	from '@/erdiagram/converter/database/code-converter/sql/dialect/sqlserver/config/SqlServerDialectConfig';
import {findKeyFromValue, findValueFromNullableKey} from '@/erdiagram/util/record-utils';
import SqlServerDialectSerializableConfig
	from '@/erdiagram/converter/database/code-converter/sql/dialect/sqlserver/config/SqlServerDialectSerializableConfig';

export class SqlServerDialectConfigManager
		extends AbstractComponentConfigManager<SqlServerDialectConfig, Partial<SqlServerDialectConfig>, SqlServerDialectSerializableConfig> {

	getDefaultConfig(): SqlServerDialectConfig {
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

	mergeConfigs(fullConfig: SqlServerDialectConfig, partialConfig?: Partial<SqlServerDialectConfig>): SqlServerDialectConfig {
		return {
			...fullConfig,
			...partialConfig,
			typeBindings: {
				...fullConfig.typeBindings,
				...partialConfig?.typeBindings
			}
		};
	}

	convertToSerializableObject(fullConfig: SqlServerDialectConfig): SqlServerDialectSerializableConfig {
		return {
			...fullConfig,
			tableNameCaseFormat: findKeyFromValue(StandardCaseFormats, fullConfig.tableNameCaseFormat),
			columnNameCaseFormat: findKeyFromValue(StandardCaseFormats, fullConfig.columnNameCaseFormat),
		};
	}

	convertFromSerializableObject(serializableConfig: SqlServerDialectSerializableConfig): SqlServerDialectConfig {
		return {
			...serializableConfig,
			tableNameCaseFormat: findValueFromNullableKey(StandardCaseFormats, serializableConfig.tableNameCaseFormat, StandardCaseFormats.UPPER_CAMEL),
			columnNameCaseFormat: findValueFromNullableKey(StandardCaseFormats, serializableConfig.columnNameCaseFormat, StandardCaseFormats.UPPER_CAMEL),
		};
	}

}

const sqlServerDialectConfigManager = new SqlServerDialectConfigManager();
export default sqlServerDialectConfigManager;
