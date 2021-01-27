import {IdNamingStrategy, StandardIdNamingStrategies} from '@/dsl/generator/common/id-naming-strategy';
import {EntityPropertyType} from '@/dsl/parser/statement/statement-types-parse-functions';

export default interface MySqlCodeGeneratorConfig {
	idNamingStrategy: IdNamingStrategy;
	typesMap: Record<string, string>;
}

export const defaultMySqlCodeGeneratorConfig: MySqlCodeGeneratorConfig = {
	idNamingStrategy: StandardIdNamingStrategies.DEFAULT,
	typesMap: {
		[EntityPropertyType.TEXT]: 'VARCHAR',
		[EntityPropertyType.LONG]: 'BIGINT',
		[EntityPropertyType.INT]: 'INT',
		[EntityPropertyType.DECIMAL]: 'DECIMAL',
		[EntityPropertyType.BOOLEAN]: 'BOOLEAN',
		[EntityPropertyType.DATE]: 'DATE',
		[EntityPropertyType.TIME]: 'TIME',
		[EntityPropertyType.DATETIME]: 'TIMESTAMP'
	}
};

export function mergeWithDefaultConfig(config?: Partial<MySqlCodeGeneratorConfig>): MySqlCodeGeneratorConfig {
	return {
		...defaultMySqlCodeGeneratorConfig,
		...config,
		typesMap: {
			...defaultMySqlCodeGeneratorConfig.typesMap,
			...config?.typesMap
		}
	};
}
