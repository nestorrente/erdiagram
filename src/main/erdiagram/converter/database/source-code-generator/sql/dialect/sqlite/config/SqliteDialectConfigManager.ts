import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';
import AbstractConfigManager from '@/erdiagram/common/config/AbstractConfigManager';
import SqliteDialectConfig, {PartialSqliteDialectConfig} from '@/erdiagram/converter/database/source-code-generator/sql/dialect/sqlite/config/SqliteDialectConfig';
import {JsonAdapter, JsonAdapters} from 'true-json';

export class SqliteDialectConfigManager
		extends AbstractConfigManager<SqliteDialectConfig, PartialSqliteDialectConfig> {

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

	protected getJsonAdapter(): JsonAdapter<SqliteDialectConfig> {
		return JsonAdapters.object<SqliteDialectConfig>({
			tableNameCaseFormat: JsonAdapters.byKeyLenient(StandardCaseFormats, 'LOWER_UNDERSCORE'),
			columnNameCaseFormat: JsonAdapters.byKeyLenient(StandardCaseFormats, 'LOWER_UNDERSCORE')
		});
	}

}

const sqliteDialectConfigManager = new SqliteDialectConfigManager();
export default sqliteDialectConfigManager;
