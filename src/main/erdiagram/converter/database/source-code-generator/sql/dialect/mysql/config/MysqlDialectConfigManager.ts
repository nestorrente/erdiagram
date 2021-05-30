import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';
import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import MysqlDialectConfig, {PartialMysqlDialectConfig} from '@/erdiagram/converter/database/source-code-generator/sql/dialect/mysql/config/MysqlDialectConfig';
import {JsonAdapter, JsonAdapters} from 'true-json';

export class MysqlDialectConfigManager
		extends AbstractComponentConfigManager<MysqlDialectConfig, PartialMysqlDialectConfig> {

	getDefaultConfig(): MysqlDialectConfig {
		return {
			typeBindings: {
				[EntityPropertyType.IDENTITY]: 'BIGINT',
				[EntityPropertyType.TEXT]: 'VARCHAR',
				[EntityPropertyType.LONG]: 'BIGINT',
				[EntityPropertyType.INT]: 'INT',
				[EntityPropertyType.SHORT]: 'SHORT',
				[EntityPropertyType.DECIMAL]: 'DECIMAL',
				[EntityPropertyType.BOOLEAN]: 'BOOLEAN',
				[EntityPropertyType.DATE]: 'DATE',
				[EntityPropertyType.TIME]: 'TIME',
				[EntityPropertyType.DATETIME]: 'TIMESTAMP',
				[EntityPropertyType.BLOB]: 'BLOB'
			},
			tableNameCaseFormat: StandardCaseFormats.UPPER_CAMEL,
			columnNameCaseFormat: StandardCaseFormats.LOWER_CAMEL,
		};
	}

	mergeConfigs(fullConfig: MysqlDialectConfig, partialConfig?: PartialMysqlDialectConfig): MysqlDialectConfig {
		return {
			...fullConfig,
			...partialConfig,
			typeBindings: {
				...fullConfig.typeBindings,
				...partialConfig?.typeBindings
			}
		};
	}

	protected getJsonAdapter(): JsonAdapter<MysqlDialectConfig> {
		return JsonAdapters.object<MysqlDialectConfig>({
			tableNameCaseFormat: JsonAdapters.byKeyLenient(StandardCaseFormats, 'UPPER_CAMEL'),
			columnNameCaseFormat: JsonAdapters.byKeyLenient(StandardCaseFormats, 'LOWER_CAMEL')
		});
	}

}

const mysqlDialectConfigManager = new MysqlDialectConfigManager();
export default mysqlDialectConfigManager;
