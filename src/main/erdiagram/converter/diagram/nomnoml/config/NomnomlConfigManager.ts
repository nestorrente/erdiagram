import AbstractConfigManager from '@/erdiagram/common/config/AbstractConfigManager';
import NomnomlConfig, {PartialNomnomlConfig} from '@/erdiagram/converter/diagram/nomnoml/config/NomnomlConfig';
import DiagramLevel from '@/erdiagram/converter/diagram/common/config/DiagramLevel';

export class NomnomlConfigManager extends AbstractConfigManager<NomnomlConfig, PartialNomnomlConfig> {

	getDefaultConfig(): NomnomlConfig {
		return {
			diagramLevel: DiagramLevel.LOGICAL,
			style: {
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
			}
		};
	}

	mergeConfigs(fullConfig: NomnomlConfig, partialConfig?: PartialNomnomlConfig): NomnomlConfig {
		return {
			...fullConfig,
			...partialConfig,
			style: {
				...fullConfig.style,
				...partialConfig?.style,
			}
		};
	}

}

const nomnomlConfigManager = new NomnomlConfigManager();
export default nomnomlConfigManager;
