import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import StandardCaseFormats from '@/erdiagram/generator/common/case-format/StandardCaseFormats';
import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import MysqlDatabaseModelToCodeConverterConfig
	from '@/erdiagram/generator/database/code-converter/mysql/config/MysqlDatabaseModelToCodeConverterConfig';
import {findKeyFromValue, findValueFromNullableKey} from '@/erdiagram/util/record-utils';
import MysqlDatabaseModelToCodeConverterSerializableConfig
	from '@/erdiagram/generator/database/code-converter/mysql/config/MysqlDatabaseModelToCodeConverterSerializableConfig';

export class MysqlDatabaseModelToCodeConverterConfigManager
		extends AbstractComponentConfigManager<MysqlDatabaseModelToCodeConverterConfig, Partial<MysqlDatabaseModelToCodeConverterConfig>, MysqlDatabaseModelToCodeConverterSerializableConfig> {

	getDefaultConfig(): MysqlDatabaseModelToCodeConverterConfig {
		return {
			typeBindings: {
				[EntityPropertyType.IDENTIFIER]: 'BIGINT',
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

	mergeConfigs(fullConfig: MysqlDatabaseModelToCodeConverterConfig, partialConfig?: Partial<MysqlDatabaseModelToCodeConverterConfig>): MysqlDatabaseModelToCodeConverterConfig {
		return {
			...fullConfig,
			...partialConfig,
			typeBindings: {
				...fullConfig.typeBindings,
				...partialConfig?.typeBindings
			}
		};
	}

	convertToSerializableObject(fullConfig: MysqlDatabaseModelToCodeConverterConfig): MysqlDatabaseModelToCodeConverterSerializableConfig {
		return {
			...fullConfig,
			tableNameCaseFormat: findKeyFromValue(StandardCaseFormats, fullConfig.tableNameCaseFormat),
			columnNameCaseFormat: findKeyFromValue(StandardCaseFormats, fullConfig.columnNameCaseFormat),
		};
	}

	convertFromSerializableObject(serializableConfig: MysqlDatabaseModelToCodeConverterSerializableConfig): MysqlDatabaseModelToCodeConverterConfig {
		return {
			...serializableConfig,
			tableNameCaseFormat: findValueFromNullableKey(StandardCaseFormats, serializableConfig.tableNameCaseFormat, StandardCaseFormats.UPPER_CAMEL),
			columnNameCaseFormat: findValueFromNullableKey(StandardCaseFormats, serializableConfig.columnNameCaseFormat, StandardCaseFormats.UPPER_CAMEL),
		};
	}

}

const mysqlDatabaseModelToCodeConverterConfigManager = new MysqlDatabaseModelToCodeConverterConfigManager();
export default mysqlDatabaseModelToCodeConverterConfigManager;
