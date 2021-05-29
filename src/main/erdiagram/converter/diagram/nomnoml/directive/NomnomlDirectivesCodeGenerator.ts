import NomnomlEntityRelationshipModelSourceCodeGeneratorConfig
	from '@/erdiagram/converter/diagram/nomnoml/config/NomnomlEntityRelationshipModelSourceCodeGeneratorConfig';

export default class NomnomlDirectivesCodeGenerator {

	public generateDirectivesCode(config: NomnomlEntityRelationshipModelSourceCodeGeneratorConfig): string {
		return Object.entries(config)
				.filter(([key, value]) => value != null && value !== '')
				.map(([key, value]) => `#${key}: ${value}`)
				.join('\n');
	}

}
