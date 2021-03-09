import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import PlantUmlEntityRelationshipModelToDiagramCodeConverterConfig
	from '@/erdiagram/generator/diagram/plantuml/config/PlantUmlEntityRelationshipModelToDiagramCodeConverterConfig';
import PlantUmlEntityRelationshipModelToDiagramCodeConverterSerializableConfig
	from '@/erdiagram/generator/diagram/plantuml/config/PlantUmlEntityRelationshipModelToDiagramCodeConverterSerializableConfig';

export class PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager
		extends AbstractComponentConfigManager<PlantUmlEntityRelationshipModelToDiagramCodeConverterConfig, PlantUmlEntityRelationshipModelToDiagramCodeConverterConfig, PlantUmlEntityRelationshipModelToDiagramCodeConverterSerializableConfig> {

	getDefaultConfig(): PlantUmlEntityRelationshipModelToDiagramCodeConverterConfig {
		return {};
	}

	mergeConfigs(fullConfig: PlantUmlEntityRelationshipModelToDiagramCodeConverterConfig, partialConfig?: Partial<PlantUmlEntityRelationshipModelToDiagramCodeConverterConfig>): PlantUmlEntityRelationshipModelToDiagramCodeConverterConfig {
		return {
			...fullConfig,
			...partialConfig
		};
	}

	convertToSerializableObject(fullConfig: PlantUmlEntityRelationshipModelToDiagramCodeConverterConfig): PlantUmlEntityRelationshipModelToDiagramCodeConverterSerializableConfig {
		return {
			...fullConfig
		};
	}

	convertFromSerializableObject(serializableConfig: PlantUmlEntityRelationshipModelToDiagramCodeConverterSerializableConfig): PlantUmlEntityRelationshipModelToDiagramCodeConverterConfig {
		return {
			...serializableConfig
		};
	}

}

const plantumlEntityRelationshipModelToDiagramCodeConverterConfigManager = new PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager();
export default plantumlEntityRelationshipModelToDiagramCodeConverterConfigManager;
