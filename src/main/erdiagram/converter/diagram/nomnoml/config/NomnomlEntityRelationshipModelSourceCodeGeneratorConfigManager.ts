import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import NomnomlEntityRelationshipModelSourceCodeGeneratorConfig
	from '@/erdiagram/converter/diagram/nomnoml/config/NomnomlEntityRelationshipModelSourceCodeGeneratorConfig';

export class NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager
		extends AbstractComponentConfigManager<NomnomlEntityRelationshipModelSourceCodeGeneratorConfig, NomnomlEntityRelationshipModelSourceCodeGeneratorConfig> {

	getDefaultConfig(): NomnomlEntityRelationshipModelSourceCodeGeneratorConfig {
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

	mergeConfigs(fullConfig: NomnomlEntityRelationshipModelSourceCodeGeneratorConfig, partialConfig?: Partial<NomnomlEntityRelationshipModelSourceCodeGeneratorConfig>): NomnomlEntityRelationshipModelSourceCodeGeneratorConfig {
		return {
			...fullConfig,
			...partialConfig
		};
	}

}

const nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager = new NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager();
export default nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager;
