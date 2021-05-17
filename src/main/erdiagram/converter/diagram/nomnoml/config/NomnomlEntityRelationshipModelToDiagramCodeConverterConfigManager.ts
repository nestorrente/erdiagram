import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import NomnomlEntityRelationshipModelToDiagramCodeConverterConfig
	from '@/erdiagram/converter/diagram/nomnoml/config/NomnomlEntityRelationshipModelToDiagramCodeConverterConfig';

export class NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager
		extends AbstractComponentConfigManager<NomnomlEntityRelationshipModelToDiagramCodeConverterConfig, NomnomlEntityRelationshipModelToDiagramCodeConverterConfig> {

	getDefaultConfig(): NomnomlEntityRelationshipModelToDiagramCodeConverterConfig {
		return {
			arrowSize: 1,
			bendSize: undefined,
			direction: undefined,
			gutter: undefined,
			edgeMargin: undefined,
			gravity: 1.5,
			edges: undefined,
			background: 'transparent',
			fill: '#fefece',
			fillArrows: undefined,
			font: undefined,
			fontSize: undefined,
			leading: undefined,
			lineWidth: 1,
			padding: undefined,
			spacing: undefined,
			stroke: '#333333',
			title: undefined,
			zoom: undefined,
			acyclicer: undefined,
			ranker: 'longest-path'
		};
	}

	mergeConfigs(fullConfig: NomnomlEntityRelationshipModelToDiagramCodeConverterConfig, partialConfig?: Partial<NomnomlEntityRelationshipModelToDiagramCodeConverterConfig>): NomnomlEntityRelationshipModelToDiagramCodeConverterConfig {
		return {
			...fullConfig,
			...partialConfig
		};
	}

}

const nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager = new NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager();
export default nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager;
