import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';
import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import {findKeyFromValue, findValueFromNullableKey} from '@/erdiagram/util/record-utils';
import SqliteDialectConfig, {PartialSqliteDialectConfig} from '@/erdiagram/converter/database/code-converter/sql/dialect/sqlite/config/SqliteDialectConfig';
import SqliteDialectSerializableConfig
	from '@/erdiagram/converter/database/code-converter/sql/dialect/sqlite/config/SqliteDialectSerializableConfig';

export class SqliteDialectConfigManager
		extends AbstractComponentConfigManager<SqliteDialectConfig, PartialSqliteDialectConfig, SqliteDialectSerializableConfig> {

	getDefaultConfig(): SqliteDialectConfig {
		return {
			typeBindings: {
				[EntityPropertyType.IDENTITY]: 'INTEGER',
				[EntityPropertyType.TEXT]: 'TEXT',
				[EntityPropertyType.LONG]: 'INTEGER',
				[EntityPropertyType.INT]: 'INTEGER',
				[EntityPropertyType.SHORT]: 'INTEGER',
				[EntityPropertyType.DECIMAL]: 'REAL',
				[EntityPropertyType.BOOLEAN]: 'INTEGER',
				[EntityPropertyType.DATE]: 'INTEGER',
				[EntityPropertyType.TIME]: 'INTEGER',
				[EntityPropertyType.DATETIME]: 'INTEGER',
				[EntityPropertyType.BLOB]: 'BLOB'
			},
			tableNameCaseFormat: StandardCaseFormats.LOWER_UNDERSCORE,
			columnNameCaseFormat: StandardCaseFormats.LOWER_UNDERSCORE,
		};
	}

	mergeConfigs(fullConfig: SqliteDialectConfig, partialConfig?: PartialSqliteDialectConfig): SqliteDialectConfig {
		return {
			...fullConfig,
			...partialConfig,
			typeBindings: {
				...fullConfig.typeBindings,
				...partialConfig?.typeBindings
			}
		};
	}

	convertToSerializableObject(fullConfig: SqliteDialectConfig): SqliteDialectSerializableConfig {
		return {
			...fullConfig,
			tableNameCaseFormat: findKeyFromValue(StandardCaseFormats, fullConfig.tableNameCaseFormat, 'LOWER_UNDERSCORE'),
			columnNameCaseFormat: findKeyFromValue(StandardCaseFormats, fullConfig.columnNameCaseFormat, 'LOWER_UNDERSCORE'),
		};
	}

	convertFromSerializableObject(serializableConfig: SqliteDialectSerializableConfig): SqliteDialectConfig {
		return {
			...serializableConfig,
			tableNameCaseFormat: findValueFromNullableKey(StandardCaseFormats, serializableConfig.tableNameCaseFormat, StandardCaseFormats.UPPER_CAMEL),
			columnNameCaseFormat: findValueFromNullableKey(StandardCaseFormats, serializableConfig.columnNameCaseFormat, StandardCaseFormats.UPPER_CAMEL),
		};
	}

}

const sqliteDialectConfigManager = new SqliteDialectConfigManager();
export default sqliteDialectConfigManager;
