import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import EntityRelationshipModelParserConfig from '@/erdiagram/parser/config/EntityRelationshipModelParserConfig';
import EntityRelationshipModelParserSerializableConfig
	from '@/erdiagram/parser/config/EntityRelationshipModelParserSerializableConfig';

export class EntityRelationshipModelParserConfigManager
		extends AbstractComponentConfigManager<EntityRelationshipModelParserConfig, Partial<EntityRelationshipModelParserConfig>, EntityRelationshipModelParserSerializableConfig> {

	getDefaultConfig(): EntityRelationshipModelParserConfig {
		return {
			allowUnknownEntities: false
		};
	}

	mergeConfigs(fullConfig: EntityRelationshipModelParserConfig, partialConfig?: Partial<EntityRelationshipModelParserConfig>): EntityRelationshipModelParserConfig {
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
