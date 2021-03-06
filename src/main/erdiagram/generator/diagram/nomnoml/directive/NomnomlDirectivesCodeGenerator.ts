import NomnomlEntityRelationshipModelToDiagramCodeConverterConfig
	from '@/erdiagram/generator/diagram/nomnoml/config/NomnomlEntityRelationshipModelToDiagramCodeConverterConfig';

export default class NomnomlDirectivesCodeGenerator {

	public generateDirectivesCode(config: NomnomlEntityRelationshipModelToDiagramCodeConverterConfig): string {
		return Object.entries(config)
				.filter(([key, value]) => value != null && value !== '')
				.map(([key, value]) => `#${key}: ${value}`)
				.join('\n');
	}

}
