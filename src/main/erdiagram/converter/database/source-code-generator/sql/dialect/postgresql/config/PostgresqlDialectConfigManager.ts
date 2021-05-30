import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';
import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import PostgresqlDialectConfig, {PartialPostgresqlDialectConfig} from '@/erdiagram/converter/database/source-code-generator/sql/dialect/postgresql/config/PostgresqlDialectConfig';
import {JsonAdapter, JsonAdapters} from 'true-json';

export class PostgresqlDialectConfigManager
		extends AbstractComponentConfigManager<PostgresqlDialectConfig, PartialPostgresqlDialectConfig> {

	getDefaultConfig(): PostgresqlDialectConfig {
		return {
			typeBindings: {
				[EntityPropertyType.IDENTITY]: 'BIGINT',
				[EntityPropertyType.TEXT]: 'VARCHAR',
				[EntityPropertyType.LONG]: 'BIGINT',
				[EntityPropertyType.INT]: 'INTEGER',
				[EntityPropertyType.SHORT]: 'SMALLINT',
				[EntityPropertyType.DECIMAL]: 'DECIMAL',
				[EntityPropertyType.BOOLEAN]: 'BOOLEAN',
				[EntityPropertyType.DATE]: 'DATE',
				[EntityPropertyType.TIME]: 'TIME',
				[EntityPropertyType.DATETIME]: 'TIMESTAMP',
				[EntityPropertyType.BLOB]: 'BYTEA'
			},
			tableNameCaseFormat: StandardCaseFormats.LOWER_UNDERSCORE,
			columnNameCaseFormat: StandardCaseFormats.LOWER_UNDERSCORE,
		};
	}

	mergeConfigs(fullConfig: PostgresqlDialectConfig, partialConfig?: PartialPostgresqlDialectConfig): PostgresqlDialectConfig {
		return {
			...fullConfig,
			...partialConfig,
			typeBindings: {
				...fullConfig.typeBindings,
				...partialConfig?.typeBindings
			}
		};
	}

	protected getJsonAdapter(): JsonAdapter<PostgresqlDialectConfig> {
		return JsonAdapters.object<PostgresqlDialectConfig>({
			tableNameCaseFormat: JsonAdapters.byKeyLenient(StandardCaseFormats, 'LOWER_UNDERSCORE'),
			columnNameCaseFormat: JsonAdapters.byKeyLenient(StandardCaseFormats, 'LOWER_UNDERSCORE')
		});
	}

}

const postgresqlDialectConfigManager = new PostgresqlDialectConfigManager();
export default postgresqlDialectConfigManager;
