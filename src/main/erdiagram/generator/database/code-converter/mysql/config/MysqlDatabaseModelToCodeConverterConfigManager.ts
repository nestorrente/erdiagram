import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import StandardCaseFormats from '@/erdiagram/generator/common/case-format/StandardCaseFormats';
import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import MySqlDatabaseModelToCodeConverterConfig
	from '@/erdiagram/generator/database/code-converter/mysql/config/MySqlDatabaseModelToCodeConverterConfig';
import {findKeyFromValue, findValueFromNullableKey} from '@/erdiagram/util/record-utils';
import MySqlDatabaseModelToCodeConverterSerializedConfig
	from '@/erdiagram/generator/database/code-converter/mysql/config/MySqlDatabaseModelToCodeConverterSerializedConfig';

export class MySqlDatabaseModelToCodeConverterConfigManager
		extends AbstractComponentConfigManager<MySqlDatabaseModelToCodeConverterConfig, Partial<MySqlDatabaseModelToCodeConverterConfig>, MySqlDatabaseModelToCodeConverterSerializedConfig> {

	getDefaultConfig(): MySqlDatabaseModelToCodeConverterConfig {
		return {
			idColumnType: EntityPropertyType.LONG,
			typeBindings: {
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

	mergeConfigs(fullConfig: MySqlDatabaseModelToCodeConverterConfig, partialConfig?: Partial<MySqlDatabaseModelToCodeConverterConfig>): MySqlDatabaseModelToCodeConverterConfig {
		return {
			...fullConfig,
			...partialConfig,
			typeBindings: {
				...fullConfig.typeBindings,
				...partialConfig?.typeBindings
			}
		};
	}

	convertToSerializableObject(fullConfig: MySqlDatabaseModelToCodeConverterConfig): MySqlDatabaseModelToCodeConverterSerializedConfig {
		return {
			...fullConfig,
			tableNameCaseFormat: findKeyFromValue(StandardCaseFormats, fullConfig.tableNameCaseFormat),
			columnNameCaseFormat: findKeyFromValue(StandardCaseFormats, fullConfig.columnNameCaseFormat),
		};
	}

	convertFromSerializableObject(serializedConfig: MySqlDatabaseModelToCodeConverterSerializedConfig): MySqlDatabaseModelToCodeConverterConfig {
		return {
			...serializedConfig,
			tableNameCaseFormat: findValueFromNullableKey(StandardCaseFormats, serializedConfig.tableNameCaseFormat, StandardCaseFormats.UPPER_CAMEL),
			columnNameCaseFormat: findValueFromNullableKey(StandardCaseFormats, serializedConfig.columnNameCaseFormat, StandardCaseFormats.UPPER_CAMEL),
		};
	}

}

const mysqlDatabaseModelToCodeConverterConfigManager = new MySqlDatabaseModelToCodeConverterConfigManager();
export default mysqlDatabaseModelToCodeConverterConfigManager;
