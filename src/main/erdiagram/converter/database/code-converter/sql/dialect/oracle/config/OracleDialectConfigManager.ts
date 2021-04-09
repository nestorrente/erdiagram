import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';
import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import OracleDialectConfig
	from '@/erdiagram/converter/database/code-converter/sql/dialect/oracle/config/OracleDialectConfig';
import OracleDialectSerializableConfig
	from '@/erdiagram/converter/database/code-converter/sql/dialect/oracle/config/OracleDialectSerializableConfig';
import {findKeyFromValue, findValueFromNullableKey} from '@/erdiagram/util/record-utils';

export class OracleDialectConfigManager
		extends AbstractComponentConfigManager<OracleDialectConfig, Partial<OracleDialectConfig>, OracleDialectSerializableConfig> {

	getDefaultConfig(): OracleDialectConfig {
		return {
			typeBindings: {
				[EntityPropertyType.IDENTIFIER]: 'NUMBER',
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

	mergeConfigs(fullConfig: OracleDialectConfig, partialConfig?: Partial<OracleDialectConfig>): OracleDialectConfig {
		return {
			...fullConfig,
			...partialConfig,
			typeBindings: {
				...fullConfig.typeBindings,
				...partialConfig?.typeBindings
			}
		};
	}

	convertToSerializableObject(fullConfig: OracleDialectConfig): OracleDialectSerializableConfig {
		return {
			...fullConfig,
			tableNameCaseFormat: findKeyFromValue(StandardCaseFormats, fullConfig.tableNameCaseFormat),
			columnNameCaseFormat: findKeyFromValue(StandardCaseFormats, fullConfig.columnNameCaseFormat),
		};
	}

	convertFromSerializableObject(serializableConfig: OracleDialectSerializableConfig): OracleDialectConfig {
		return {
			...serializableConfig,
			tableNameCaseFormat: findValueFromNullableKey(StandardCaseFormats, serializableConfig.tableNameCaseFormat, StandardCaseFormats.UPPER_CAMEL),
			columnNameCaseFormat: findValueFromNullableKey(StandardCaseFormats, serializableConfig.columnNameCaseFormat, StandardCaseFormats.UPPER_CAMEL),
		};
	}

}

const oracleDialectConfigManager = new OracleDialectConfigManager();
export default oracleDialectConfigManager;
