import StandardIdNamingStrategies from '@/erdiagram/generator/common/id-naming-strategy/StandardIdNamingStrategies';
import {EntityPropertyType} from '@/erdiagram/parser/statement/statement-types-parse-functions';
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
	columnCaseFormat: StandardCaseFormats.LOWER_CAMEL,
	// constraintCaseFormat: StandardCaseFormats.JOINING_UNDERSCORE,
};

export function mergeWithDefaultConfig(config?: Partial<MySqlDatabaseModelToCodeConverterConfig>): MySqlDatabaseModelToCodeConverterConfig {
	return {
		...defaultMySqlDatabaseModelToCodeConverterConfig,
		...config,
		typesMap: {
			...defaultMySqlDatabaseModelToCodeConverterConfig.typesMap,
			...config?.typesMap
		}
	};
}
