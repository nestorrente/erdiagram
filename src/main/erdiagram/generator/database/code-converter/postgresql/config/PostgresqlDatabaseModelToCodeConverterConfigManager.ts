import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import StandardCaseFormats from '@/erdiagram/generator/common/case-format/StandardCaseFormats';
import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import PostgresqlDatabaseModelToCodeConverterConfig
	from '@/erdiagram/generator/database/code-converter/postgresql/config/PostgresqlDatabaseModelToCodeConverterConfig';
import PostgresqlDatabaseModelToCodeConverterSerializableConfig
	from '@/erdiagram/generator/database/code-converter/postgresql/config/PostgresqlDatabaseModelToCodeConverterSerializableConfig';
import {findKeyFromValue, findValueFromNullableKey} from '@/erdiagram/util/record-utils';

export class PostgresqlDatabaseModelToCodeConverterConfigManager
		extends AbstractComponentConfigManager<PostgresqlDatabaseModelToCodeConverterConfig, Partial<PostgresqlDatabaseModelToCodeConverterConfig>, PostgresqlDatabaseModelToCodeConverterSerializableConfig> {

	getDefaultConfig(): PostgresqlDatabaseModelToCodeConverterConfig {
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

	mergeConfigs(fullConfig: PostgresqlDatabaseModelToCodeConverterConfig, partialConfig?: Partial<PostgresqlDatabaseModelToCodeConverterConfig>): PostgresqlDatabaseModelToCodeConverterConfig {
		return {
			...fullConfig,
			...partialConfig,
			typeBindings: {
				...fullConfig.typeBindings,
				...partialConfig?.typeBindings
			}
		};
	}

	convertToSerializableObject(fullConfig: PostgresqlDatabaseModelToCodeConverterConfig): PostgresqlDatabaseModelToCodeConverterSerializableConfig {
		return {
			...fullConfig,
			tableNameCaseFormat: findKeyFromValue(StandardCaseFormats, fullConfig.tableNameCaseFormat),
			columnNameCaseFormat: findKeyFromValue(StandardCaseFormats, fullConfig.columnNameCaseFormat),
		};
	}

	convertFromSerializableObject(serializableConfig: PostgresqlDatabaseModelToCodeConverterSerializableConfig): PostgresqlDatabaseModelToCodeConverterConfig {
		return {
			...serializableConfig,
			tableNameCaseFormat: findValueFromNullableKey(StandardCaseFormats, serializableConfig.tableNameCaseFormat, StandardCaseFormats.UPPER_CAMEL),
			columnNameCaseFormat: findValueFromNullableKey(StandardCaseFormats, serializableConfig.columnNameCaseFormat, StandardCaseFormats.UPPER_CAMEL),
		};
	}

}

const postgresqlDatabaseModelToCodeConverterConfigManager = new PostgresqlDatabaseModelToCodeConverterConfigManager();
export default postgresqlDatabaseModelToCodeConverterConfigManager;
