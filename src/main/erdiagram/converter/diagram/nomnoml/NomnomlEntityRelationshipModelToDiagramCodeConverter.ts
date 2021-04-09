import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import NomnomlEntityCodeGenerator from '@/erdiagram/converter/diagram/nomnoml/entity/NomnomlEntityCodeGenerator';
import NomnomlRelationshipCodeGenerator
	from '@/erdiagram/converter/diagram/nomnoml/relationship/NomnomlRelationshipCodeGenerator';
import EntityRelationshipModelToCodeConverter from '@/erdiagram/converter/EntityRelationshipModelToCodeConverter';
import NomnomlEntityRelationshipModelToDiagramCodeConverterConfig
	from '@/erdiagram/converter/diagram/nomnoml/config/NomnomlEntityRelationshipModelToDiagramCodeConverterConfig';
import nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager
	from '@/erdiagram/converter/diagram/nomnoml/config/NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager';
import NomnomlDirectivesCodeGenerator
	from '@/erdiagram/converter/diagram/nomnoml/directive/NomnomlDirectivesCodeGenerator';

export default class NomnomlEntityRelationshipModelToDiagramCodeConverter implements EntityRelationshipModelToCodeConverter {

	private readonly config: NomnomlEntityRelationshipModelToDiagramCodeConverterConfig;

	private readonly entityCodeGenerator = new NomnomlEntityCodeGenerator();
	private readonly relationshipCodeGenerator = new NomnomlRelationshipCodeGenerator();
	private readonly directivesCodeGenerator = new NomnomlDirectivesCodeGenerator();

	constructor(config?: Partial<NomnomlEntityRelationshipModelToDiagramCodeConverterConfig>) {
		this.config = nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager.mergeWithDefaultConfig(config);
	}

	public convertToCode(model: EntityRelationshipModel): string {
		return [
			...model.entities.map(entity => this.entityCodeGenerator.generateEntityCode(entity)),
			...model.relationships.map(relationship => this.relationshipCodeGenerator.generateRelationshipCode(relationship)),
			this.directivesCodeGenerator.generateDirectivesCode(this.config)
		].join('\n\n');
	}

}
