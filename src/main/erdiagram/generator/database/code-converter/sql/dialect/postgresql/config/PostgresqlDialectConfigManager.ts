import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import StandardCaseFormats from '@/erdiagram/generator/common/case-format/StandardCaseFormats';
import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import PostgresqlDialectConfig
	from '@/erdiagram/generator/database/code-converter/sql/dialect/postgresql/config/PostgresqlDialectConfig';
import PostgresqlDialectSerializableConfig
	from '@/erdiagram/generator/database/code-converter/sql/dialect/postgresql/config/PostgresqlDialectSerializableConfig';
import {findKeyFromValue, findValueFromNullableKey} from '@/erdiagram/util/record-utils';

export class PostgresqlDialectConfigManager
		extends AbstractComponentConfigManager<PostgresqlDialectConfig, Partial<PostgresqlDialectConfig>, PostgresqlDialectSerializableConfig> {

	getDefaultConfig(): PostgresqlDialectConfig {
		return {
			typeBindings: {
				[EntityPropertyType.IDENTIFIER]: 'BIGINT',
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

	mergeConfigs(fullConfig: PostgresqlDialectConfig, partialConfig?: Partial<PostgresqlDialectConfig>): PostgresqlDialectConfig {
		return {
			...fullConfig,
			...partialConfig,
			typeBindings: {
				...fullConfig.typeBindings,
				...partialConfig?.typeBindings
			}
		};
	}

	convertToSerializableObject(fullConfig: PostgresqlDialectConfig): PostgresqlDialectSerializableConfig {
		return {
			...fullConfig,
			tableNameCaseFormat: findKeyFromValue(StandardCaseFormats, fullConfig.tableNameCaseFormat),
			columnNameCaseFormat: findKeyFromValue(StandardCaseFormats, fullConfig.columnNameCaseFormat),
		};
	}

	convertFromSerializableObject(serializableConfig: PostgresqlDialectSerializableConfig): PostgresqlDialectConfig {
		return {
			...serializableConfig,
			tableNameCaseFormat: findValueFromNullableKey(StandardCaseFormats, serializableConfig.tableNameCaseFormat, StandardCaseFormats.UPPER_CAMEL),
			columnNameCaseFormat: findValueFromNullableKey(StandardCaseFormats, serializableConfig.columnNameCaseFormat, StandardCaseFormats.UPPER_CAMEL),
		};
	}

}

const postgresqlDialectConfigManager = new PostgresqlDialectConfigManager();
export default postgresqlDialectConfigManager;
