import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import StandardCaseFormats from '@/erdiagram/generator/common/case-format/StandardCaseFormats';
import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import OracleDatabaseModelToCodeConverterConfig
	from '@/erdiagram/generator/database/code-converter/oracle/config/OracleDatabaseModelToCodeConverterConfig';
import OracleDatabaseModelToCodeConverterSerializedConfig
	from '@/erdiagram/generator/database/code-converter/oracle/config/OracleDatabaseModelToCodeConverterSerializedConfig';
import {findKeyFromValue, findValueFromNullableKey} from '@/erdiagram/util/record-utils';

export class OracleDatabaseModelToCodeConverterConfigManager
		extends AbstractComponentConfigManager<OracleDatabaseModelToCodeConverterConfig, Partial<OracleDatabaseModelToCodeConverterConfig>, OracleDatabaseModelToCodeConverterSerializedConfig> {

	getDefaultConfig(): OracleDatabaseModelToCodeConverterConfig {
		return {
			idColumnType: EntityPropertyType.LONG,
			typeMappings: {
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

	mergeConfigs(fullConfig: OracleDatabaseModelToCodeConverterConfig, partialConfig?: Partial<OracleDatabaseModelToCodeConverterConfig>): OracleDatabaseModelToCodeConverterConfig {
		return {
			...fullConfig,
			...partialConfig,
			typeMappings: {
				...fullConfig.typeMappings,
				...partialConfig?.typeMappings
			}
		};
	}

	convertToSerializableObject(fullConfig: OracleDatabaseModelToCodeConverterConfig): OracleDatabaseModelToCodeConverterSerializedConfig {
		return {
			...fullConfig,
			tableNameCaseFormat: findKeyFromValue(StandardCaseFormats, fullConfig.tableNameCaseFormat),
			columnNameCaseFormat: findKeyFromValue(StandardCaseFormats, fullConfig.columnNameCaseFormat),
		};
	}

	convertFromSerializableObject(serializedConfig: OracleDatabaseModelToCodeConverterSerializedConfig): OracleDatabaseModelToCodeConverterConfig {
		return {
			...serializedConfig,
			tableNameCaseFormat: findValueFromNullableKey(StandardCaseFormats, serializedConfig.tableNameCaseFormat, StandardCaseFormats.UPPER_CAMEL),
			columnNameCaseFormat: findValueFromNullableKey(StandardCaseFormats, serializedConfig.columnNameCaseFormat, StandardCaseFormats.UPPER_CAMEL),
		};
	}

}

const oracleDatabaseModelToCodeConverterConfigManager = new OracleDatabaseModelToCodeConverterConfigManager();
export default oracleDatabaseModelToCodeConverterConfigManager;
