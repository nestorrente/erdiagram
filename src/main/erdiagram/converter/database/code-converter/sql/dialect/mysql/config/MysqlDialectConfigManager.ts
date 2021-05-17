import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';
import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import MysqlDialectConfig, {PartialMysqlDialectConfig} from '@/erdiagram/converter/database/code-converter/sql/dialect/mysql/config/MysqlDialectConfig';
import {findKeyFromValue, findValueFromNullableKey} from '@/erdiagram/util/record-utils';
import MysqlDialectSerializableConfig
	from '@/erdiagram/converter/database/code-converter/sql/dialect/mysql/config/MysqlDialectSerializableConfig';

export class MysqlDialectConfigManager
		extends AbstractComponentConfigManager<MysqlDialectConfig, PartialMysqlDialectConfig, MysqlDialectSerializableConfig> {

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

	convertToSerializableObject(fullConfig: MysqlDialectConfig): MysqlDialectSerializableConfig {
		return {
			...fullConfig,
			tableNameCaseFormat: findKeyFromValue(StandardCaseFormats, fullConfig.tableNameCaseFormat, 'UPPER_CAMEL'),
			columnNameCaseFormat: findKeyFromValue(StandardCaseFormats, fullConfig.columnNameCaseFormat, 'LOWER_CAMEL'),
		};
	}

	convertFromSerializableObject(serializableConfig: MysqlDialectSerializableConfig): MysqlDialectConfig {
		return {
			...serializableConfig,
			tableNameCaseFormat: findValueFromNullableKey(StandardCaseFormats, serializableConfig.tableNameCaseFormat, StandardCaseFormats.UPPER_CAMEL),
			columnNameCaseFormat: findValueFromNullableKey(StandardCaseFormats, serializableConfig.columnNameCaseFormat, StandardCaseFormats.UPPER_CAMEL),
		};
	}

}

const mysqlDialectConfigManager = new MysqlDialectConfigManager();
export default mysqlDialectConfigManager;
