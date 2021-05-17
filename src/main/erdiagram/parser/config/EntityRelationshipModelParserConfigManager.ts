import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import EntityRelationshipModelParserConfig, {
	EntityRelationshipModelParserSerializableConfig,
	PartialEntityRelationshipModelParserConfig
} from '@/erdiagram/parser/config/EntityRelationshipModelParserConfig';

export class EntityRelationshipModelParserConfigManager
		extends AbstractComponentConfigManager<EntityRelationshipModelParserConfig, PartialEntityRelationshipModelParserConfig, EntityRelationshipModelParserSerializableConfig> {

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

	convertToSerializableObject(fullConfig: EntityRelationshipModelParserConfig): EntityRelationshipModelParserSerializableConfig {
		return {
			...fullConfig
		};
	}

	convertFromSerializableObject(serializableConfig: EntityRelationshipModelParserSerializableConfig): EntityRelationshipModelParserConfig {
		return {
			...serializableConfig
		};
	}

}

const entityRelationshipModelParserConfigManager = new EntityRelationshipModelParserConfigManager();
export default entityRelationshipModelParserConfigManager;
