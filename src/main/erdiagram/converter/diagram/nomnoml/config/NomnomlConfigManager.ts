import AbstractConfigManager from '@/erdiagram/common/config/AbstractConfigManager';
import NomnomlConfig from '@/erdiagram/converter/diagram/nomnoml/config/NomnomlConfig';

export class NomnomlConfigManager extends AbstractConfigManager<NomnomlConfig, NomnomlConfig> {

	getDefaultConfig(): NomnomlConfig {
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

	mergeConfigs(fullConfig: NomnomlConfig, partialConfig?: Partial<NomnomlConfig>): NomnomlConfig {
		return {
			...fullConfig,
			...partialConfig
		};
	}

}

const nomnomlConfigManager = new NomnomlConfigManager();
export default nomnomlConfigManager;
