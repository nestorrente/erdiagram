import {EntityRelationshipModel} from '@/erdiagram/parser/entity-relationship-model-types';
import NomnomlEntityCodeGenerator from '@/erdiagram/generator/diagram/nomnoml/entity/NomnomlEntityCodeGenerator';
import NomnomlRelationshipCodeGenerator
	from '@/erdiagram/generator/diagram/nomnoml/relationship/NomnomlRelationshipCodeGenerator';
import EntityRelationshipModelToCodeConverter from '@/erdiagram/generator/EntityRelationshipModelToCodeConverter';
import NomnomlEntityRelationshipModelToDiagramCodeConverterConfig
	from '@/erdiagram/generator/diagram/nomnoml/config/NomnomlEntityRelationshipModelToDiagramCodeConverterConfig';
import nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager
	from '@/erdiagram/generator/diagram/nomnoml/config/NomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager';
import NomnomlDirectivesCodeGenerator
	from '@/erdiagram/generator/diagram/nomnoml/directive/NomnomlDirectivesCodeGenerator';

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
