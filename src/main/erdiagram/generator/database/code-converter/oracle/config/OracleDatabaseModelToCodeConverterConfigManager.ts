import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import StandardCaseFormats from '@/erdiagram/generator/common/case-format/StandardCaseFormats';
import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import OracleDatabaseModelToCodeConverterConfig
	from '@/erdiagram/generator/database/code-converter/oracle/config/OracleDatabaseModelToCodeConverterConfig';

export class OracleDatabaseModelToCodeConverterConfigManager
		extends AbstractComponentConfigManager<OracleDatabaseModelToCodeConverterConfig> {

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
				[EntityPropertyType.DATETIME]: 'TIMESTAMP'
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

}

const oracleDatabaseModelToCodeConverterConfigManager = new OracleDatabaseModelToCodeConverterConfigManager();
export default oracleDatabaseModelToCodeConverterConfigManager;
