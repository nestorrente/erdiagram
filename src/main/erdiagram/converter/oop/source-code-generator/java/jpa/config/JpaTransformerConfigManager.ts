import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import JpaTransformerConfig, {PartialJpaTransformerConfig} from '@/erdiagram/converter/oop/source-code-generator/java/jpa/config/JpaTransformerConfig';
import {JsonAdapter, JsonAdapters} from 'true-json';
import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';

export class JpaTransformerConfigManager
		extends AbstractComponentConfigManager<JpaTransformerConfig, PartialJpaTransformerConfig> {

	getDefaultConfig(): JpaTransformerConfig {
		return {
			tableNameCaseFormat: StandardCaseFormats.UPPER_CAMEL,
			columnNameCaseFormat: StandardCaseFormats.LOWER_CAMEL,
			annotateGetters: false,
			useExplicitTableName: false,
			useExplicitColumnName: false
		};
	}

	mergeConfigs(fullConfig: JpaTransformerConfig, partialConfig?: PartialJpaTransformerConfig): JpaTransformerConfig {
		return {
			...fullConfig,
			...partialConfig
		};
	}

	protected getJsonAdapter(): JsonAdapter<JpaTransformerConfig> {
		return JsonAdapters.object<JpaTransformerConfig>({
			tableNameCaseFormat: JsonAdapters.byKeyLenient(StandardCaseFormats, 'UPPER_CAMEL'),
			columnNameCaseFormat: JsonAdapters.byKeyLenient(StandardCaseFormats, 'LOWER_CAMEL')
		});
	}

}

const jpaTransformerConfigManager = new JpaTransformerConfigManager();
export default jpaTransformerConfigManager;
