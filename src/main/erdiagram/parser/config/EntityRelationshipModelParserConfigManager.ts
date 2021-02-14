import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import EntityRelationshipModelParserConfig from '@/erdiagram/parser/config/EntityRelationshipModelParserConfig';

export class EntityRelationshipModelParserConfigManager
		extends AbstractComponentConfigManager<EntityRelationshipModelParserConfig> {

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

	protected prepareBeforeSerializing(fullConfig: EntityRelationshipModelParserConfig): EntityRelationshipModelParserConfig {
		throw new Error('Method not implemented.');
	}

	protected processAfterDeserializing(serializedConfig: EntityRelationshipModelParserConfig): EntityRelationshipModelParserConfig {
		throw new Error('Method not implemented.');
	}

}

const entityRelationshipModelParserConfigManager = new EntityRelationshipModelParserConfigManager();
export default entityRelationshipModelParserConfigManager;
