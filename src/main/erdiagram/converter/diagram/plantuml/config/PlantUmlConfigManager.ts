import AbstractConfigManager from '@/erdiagram/common/config/AbstractConfigManager';
import PlantUmlConfig, {PartialPlantUmlConfig} from '@/erdiagram/converter/diagram/plantuml/config/PlantUmlConfig';
import DiagramLevel from '@/erdiagram/converter/diagram/common/config/DiagramLevel';

export class PlantUmlConfigManager extends AbstractConfigManager<PlantUmlConfig, PartialPlantUmlConfig> {

	getDefaultConfig(): PlantUmlConfig {
		return {
			diagramLevel: DiagramLevel.LOGICAL,
		};
	}

	mergeConfigs(fullConfig: PlantUmlConfig, partialConfig?: PartialPlantUmlConfig): PlantUmlConfig {
		return {
			...fullConfig,
			...partialConfig,
		};
	}

}

const plantUmlConfigManager = new PlantUmlConfigManager();
export default plantUmlConfigManager;
