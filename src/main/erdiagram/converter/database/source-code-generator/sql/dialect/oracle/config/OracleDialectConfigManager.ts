import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';
import AbstractConfigManager from '@/erdiagram/common/config/AbstractConfigManager';
import OracleDialectConfig, {PartialOracleDialectConfig} from '@/erdiagram/converter/database/source-code-generator/sql/dialect/oracle/config/OracleDialectConfig';
import {JsonAdapter, JsonAdapters} from 'true-json';

export class OracleDialectConfigManager
		extends AbstractConfigManager<OracleDialectConfig, PartialOracleDialectConfig> {

	getDefaultConfig(): OracleDialectConfig {
		return {
			typeBindings: {
				[EntityPropertyType.IDENTITY]: 'NUMBER',
				[EntityPropertyType.TEXT]: 'VARCHAR2',
				[EntityPropertyType.LONG]: 'NUMBER',
				[EntityPropertyType.INT]: 'NUMBER',
				[EntityPropertyType.SHORT]: 'NUMBER',
				[EntityPropertyType.DECIMAL]: 'NUMBER',
				[EntityPropertyType.BOOLEAN]: 'NUMBER(1, 0)',
				[EntityPropertyType.DATE]: 'DATE',
				[EntityPropertyType.TIME]: 'TIMESTAMP',
				[EntityPropertyType.DATETIME]: 'TIMESTAMP',
				[EntityPropertyType.BLOB]: 'BLOB'
			},
			tableNameCaseFormat: StandardCaseFormats.UPPER_UNDERSCORE,
			columnNameCaseFormat: StandardCaseFormats.UPPER_UNDERSCORE,
		};
	}

	mergeConfigs(fullConfig: OracleDialectConfig, partialConfig?: PartialOracleDialectConfig): OracleDialectConfig {
		return {
			...fullConfig,
			...partialConfig,
			typeBindings: {
				...fullConfig.typeBindings,
				...partialConfig?.typeBindings
			}
		};
	}

	protected getJsonAdapter(): JsonAdapter<OracleDialectConfig> {
		return JsonAdapters.object<OracleDialectConfig>({
			tableNameCaseFormat: JsonAdapters.byKeyLenient(StandardCaseFormats, 'UPPER_UNDERSCORE'),
			columnNameCaseFormat: JsonAdapters.byKeyLenient(StandardCaseFormats, 'UPPER_UNDERSCORE')
		});
	}

}

const oracleDialectConfigManager = new OracleDialectConfigManager();
export default oracleDialectConfigManager;
