import StandardIdNamingStrategies from '@/erdiagram/generator/common/id-naming-strategy/StandardIdNamingStrategies';
import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import StandardCaseFormats from '@/erdiagram/generator/common/case-format/StandardCaseFormats';
import DatabaseModelToCodeConverterConfig
	from '@/erdiagram/generator/database/code-converter/DatabaseModelToCodeConverterConfig';

export default interface MySqlDatabaseModelToCodeConverterConfig extends DatabaseModelToCodeConverterConfig {

}

export const defaultMySqlDatabaseModelToCodeConverterConfig: MySqlDatabaseModelToCodeConverterConfig = {
	idColumnType: EntityPropertyType.LONG,
	idNamingStrategy: StandardIdNamingStrategies.DEFAULT,
	typesMap: {
		[EntityPropertyType.TEXT]: 'VARCHAR',
		[EntityPropertyType.LONG]: 'BIGINT',
		[EntityPropertyType.INT]: 'INT',
		[EntityPropertyType.SHORT]: 'SHORT',
		[EntityPropertyType.DECIMAL]: 'DECIMAL',
		[EntityPropertyType.BOOLEAN]: 'BOOLEAN',
		[EntityPropertyType.DATE]: 'DATE',
		[EntityPropertyType.TIME]: 'TIME',
		[EntityPropertyType.DATETIME]: 'TIMESTAMP'
	},
	tableNameCaseFormat: StandardCaseFormats.UPPER_CAMEL,
	columnNameCaseFormat: StandardCaseFormats.LOWER_CAMEL,
	// constraintCaseFormat: StandardCaseFormats.JOINING_UNDERSCORE,
};

export function mergeMySqlDatabaseModelToCodeConverterConfigs(
		fullConfig: MySqlDatabaseModelToCodeConverterConfig,
		partialConfig?: Partial<MySqlDatabaseModelToCodeConverterConfig>
): MySqlDatabaseModelToCodeConverterConfig {
	return {
		...fullConfig,
		...partialConfig,
		typesMap: {
			...fullConfig.typesMap,
			...partialConfig?.typesMap
		}
	};
}

export function mergeWithDefaultMySqlDatabaseModelToCodeConverterConfig(
		partialConfig?: Partial<MySqlDatabaseModelToCodeConverterConfig>
): MySqlDatabaseModelToCodeConverterConfig {
	return mergeMySqlDatabaseModelToCodeConverterConfigs(defaultMySqlDatabaseModelToCodeConverterConfig, partialConfig);
}
