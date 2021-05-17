import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import EntityRelationshipModelParserConfig, {PartialEntityRelationshipModelParserConfig} from '@/erdiagram/parser/config/EntityRelationshipModelParserConfig';

export class EntityRelationshipModelParserConfigManager
		extends AbstractComponentConfigManager<EntityRelationshipModelParserConfig, PartialEntityRelationshipModelParserConfig> {

	getDefaultConfig(): EntityRelationshipModelParserConfig {
		return {
			allowUnknownEntities: false
		};
	}

	mergeConfigs(fullConfig: EntityRelationshipModelParserConfig, partialConfig?: PartialEntityRelationshipModelParserConfig): EntityRelationshipModelParserConfig {
		return {
			...fullConfig,
			...partialConfig
		};
	}

}

const entityRelationshipModelParserConfigManager = new EntityRelationshipModelParserConfigManager();
export default entityRelationshipModelParserConfigManager;
