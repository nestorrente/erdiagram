import NomnomlSourceCodeGeneratorConfig
	from '@/erdiagram/converter/diagram/nomnoml/config/NomnomlSourceCodeGeneratorConfig';

export default class NomnomlDirectivesCodeGenerator {

	public generateDirectivesCode(config: NomnomlSourceCodeGeneratorConfig): string {
		return Object.entries(config)
				.filter(([key, value]) => value != null && value !== '')
				.map(([key, value]) => `#${key}: ${value}`)
				.join('\n');
	}

}
