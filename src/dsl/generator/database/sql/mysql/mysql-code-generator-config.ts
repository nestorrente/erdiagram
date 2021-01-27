import IdNamingStrategy, {StandardIdNamingStrategies} from '@/dsl/generator/common/id-naming-strategy';
import {EntityPropertyType} from '@/dsl/parser/statement/statement-types-parse-functions';
import CaseFormat from '@/dsl/generator/common/case-format/CaseFormat';
import StandardCaseFormats from '@/dsl/generator/common/case-format/StandardCaseFormats';

export default interface MySqlCodeGeneratorConfig {
	typesMap: Record<string, string>;
	// FIXME quizás para las constraint, más que un CaseFormat, tenga sentido un strategy de cómo generar su nombre
	// constraintCaseFormat: CaseFormat;
	// FIXME las siguientes propiedades deberían ser del DatabaseModelGenerator
	idNamingStrategy: IdNamingStrategy;
	tableCaseFormat: CaseFormat;
	columnCaseFormat: CaseFormat;
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
	},
	tableCaseFormat: StandardCaseFormats.UPPER_CAMEL,
	columnCaseFormat: StandardCaseFormats.LOWER_CAMEL,
	// constraintCaseFormat: StandardCaseFormats.JOINING_UNDERSCORE,
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
