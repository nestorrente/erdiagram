import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import NomnomlEntityRelationshipModelToDiagramCodeConverterConfig
	from '@/erdiagram/generator/diagram/nomnoml/config/NomnomlEntityRelationshipModelToDiagramCodeConverterConfig';
import NomnomlEntityRelationshipModelToDiagramCodeConverterSerializableConfig
	from '@/erdiagram/generator/diagram/nomnoml/config/NomnomlEntityRelationshipModelToDiagramCodeConverterSerializableConfig';

export class NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager
		extends AbstractComponentConfigManager<NomnomlEntityRelationshipModelToDiagramCodeConverterConfig, NomnomlEntityRelationshipModelToDiagramCodeConverterConfig, NomnomlEntityRelationshipModelToDiagramCodeConverterSerializableConfig> {

	getDefaultConfig(): NomnomlEntityRelationshipModelToDiagramCodeConverterConfig {
		return {
			background: 'white',
			fill: '#eef6ff',
			gravity: 1.5,
			lineWidth: 1,
			stroke: '#555',
			arrowSize: 1,
			ranker: 'longest-path'
		};
	}

	mergeConfigs(fullConfig: NomnomlEntityRelationshipModelToDiagramCodeConverterConfig, partialConfig?: Partial<NomnomlEntityRelationshipModelToDiagramCodeConverterConfig>): NomnomlEntityRelationshipModelToDiagramCodeConverterConfig {
		return {
			...fullConfig,
			...partialConfig
		};
	}

	convertToSerializableObject(fullConfig: NomnomlEntityRelationshipModelToDiagramCodeConverterConfig): NomnomlEntityRelationshipModelToDiagramCodeConverterSerializableConfig {
		return {
			...fullConfig
		};
	}

	convertFromSerializableObject(serializableConfig: NomnomlEntityRelationshipModelToDiagramCodeConverterSerializableConfig): NomnomlEntityRelationshipModelToDiagramCodeConverterConfig {
		return {
			...serializableConfig
		};
	}

}

const nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager = new NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager();
export default nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager;
