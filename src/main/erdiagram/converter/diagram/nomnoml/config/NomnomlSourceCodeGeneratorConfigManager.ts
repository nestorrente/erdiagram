import AbstractComponentConfigManager from '@/erdiagram/common/config/AbstractComponentConfigManager';
import NomnomlSourceCodeGeneratorConfig
	from '@/erdiagram/converter/diagram/nomnoml/config/NomnomlSourceCodeGeneratorConfig';

export class NomnomlSourceCodeGeneratorConfigManager
		extends AbstractComponentConfigManager<NomnomlSourceCodeGeneratorConfig, NomnomlSourceCodeGeneratorConfig> {

	getDefaultConfig(): NomnomlSourceCodeGeneratorConfig {
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

	mergeConfigs(fullConfig: NomnomlSourceCodeGeneratorConfig, partialConfig?: Partial<NomnomlSourceCodeGeneratorConfig>): NomnomlSourceCodeGeneratorConfig {
		return {
			...fullConfig,
			...partialConfig
		};
	}

}

const nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager = new NomnomlSourceCodeGeneratorConfigManager();
export default nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager;
