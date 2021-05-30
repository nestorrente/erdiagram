import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';
import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import SqlServerDialectConfig, {PartialSqlServerDialectConfig} from '@/erdiagram/converter/database/source-code-generator/sql/dialect/sqlserver/config/SqlServerDialectConfig';
import {JsonAdapter, JsonAdapters} from 'true-json';
import OracleDialectConfig
	from '@/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/config/OracleDialectConfig';

export class SqlServerDialectConfigManager
		extends AbstractComponentConfigManager<SqlServerDialectConfig, PartialSqlServerDialectConfig> {

	getDefaultConfig(): SqlServerDialectConfig {
		return {
			typeBindings: {
				[EntityPropertyType.IDENTITY]: 'BIGINT',
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

	mergeConfigs(fullConfig: SqlServerDialectConfig, partialConfig?: PartialSqlServerDialectConfig): SqlServerDialectConfig {
		return {
			...fullConfig,
			...partialConfig,
			typeBindings: {
				...fullConfig.typeBindings,
				...partialConfig?.typeBindings
			}
		};
	}

	protected getJsonAdapter(): JsonAdapter<SqlServerDialectConfig> {
		return JsonAdapters.object<OracleDialectConfig>({
			tableNameCaseFormat: JsonAdapters.byKeyLenient(StandardCaseFormats, 'UPPER_CAMEL'),
			columnNameCaseFormat: JsonAdapters.byKeyLenient(StandardCaseFormats, 'UPPER_CAMEL')
		});
	}

}

const sqlServerDialectConfigManager = new SqlServerDialectConfigManager();
export default sqlServerDialectConfigManager;
