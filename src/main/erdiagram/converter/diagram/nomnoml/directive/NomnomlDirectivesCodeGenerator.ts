import NomnomlConfig from '@/erdiagram/converter/diagram/nomnoml/config/NomnomlConfig';

export default class NomnomlDirectivesCodeGenerator {

	public generateDirectivesCode(config: NomnomlConfig): string {
		return Object.entries(config)
				.filter(([key, value]) => value != null && value !== '')
				.map(([key, value]) => `#${key}: ${value}`)
				.join('\n');
	}

}
