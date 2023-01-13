import NomnomlStyleConfig from '@/erdiagram/converter/diagram/nomnoml/config/NomnomlStyleConfig';

export default class NomnomlDirectivesCodeGenerator {

	public generateDirectivesCode(styleConfig: NomnomlStyleConfig): string {
		return Object.entries(styleConfig)
				.filter(([, value]) => value != null && value !== '')
				.map(([key, value]) => `#${key}: ${value}`)
				.join('\n');
	}

}
