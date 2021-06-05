import AbstractConfigManager from '@/erdiagram/common/config/AbstractConfigManager';
import JpaConfig, {PartialJpaConfig} from '@/erdiagram/converter/oop/source-code-generator/java/jpa/config/JpaConfig';
import {JsonAdapter, JsonAdapters} from 'true-json';
import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';

export class JpaConfigManager extends AbstractConfigManager<JpaConfig, PartialJpaConfig> {

	getDefaultConfig(): JpaConfig {
		return {
			tableNameCaseFormat: StandardCaseFormats.UPPER_CAMEL,
			columnNameCaseFormat: StandardCaseFormats.LOWER_CAMEL,
			annotateGetters: false,
			useExplicitTableName: false,
			useExplicitColumnName: false
		};
	}

	mergeConfigs(fullConfig: JpaConfig, partialConfig?: PartialJpaConfig): JpaConfig {
		return {
			...fullConfig,
			...partialConfig
		};
	}

	protected getJsonAdapter(): JsonAdapter<JpaConfig> {
		return JsonAdapters.object<JpaConfig>({
			tableNameCaseFormat: JsonAdapters.byKeyLenient(StandardCaseFormats, 'UPPER_CAMEL'),
			columnNameCaseFormat: JsonAdapters.byKeyLenient(StandardCaseFormats, 'LOWER_CAMEL')
		});
	}

}

const jpaConfigManager = new JpaConfigManager();
export default jpaConfigManager;
