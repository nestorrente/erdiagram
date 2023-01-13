import NomnomlStyleConfig from '@/erdiagram/converter/diagram/nomnoml/config/NomnomlStyleConfig';
import DiagramSourceCodeGeneratorConfig
	from '@/erdiagram/converter/diagram/common/config/DiagramSourceCodeGeneratorConfig';

export default interface NomnomlConfig extends DiagramSourceCodeGeneratorConfig {
	style: NomnomlStyleConfig;
}

export type PartialNomnomlConfig = Partial<NomnomlConfig>;
