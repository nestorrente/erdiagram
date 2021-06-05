import AbstractConfigManager from '@/erdiagram/common/config/AbstractConfigManager';
import EntityRelationshipModelParserConfig, {PartialEntityRelationshipModelParserConfig} from '@/erdiagram/parser/config/EntityRelationshipModelParserConfig';

export class EntityRelationshipModelParserConfigManager
		extends AbstractConfigManager<EntityRelationshipModelParserConfig, PartialEntityRelationshipModelParserConfig> {

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
