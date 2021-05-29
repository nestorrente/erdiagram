import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import NomnomlEntityCodeGenerator from '@/erdiagram/converter/diagram/nomnoml/entity/NomnomlEntityCodeGenerator';
import NomnomlRelationshipCodeGenerator
	from '@/erdiagram/converter/diagram/nomnoml/relationship/NomnomlRelationshipCodeGenerator';
import EntityRelationshipModelSourceCodeGenerator
	from '@/erdiagram/converter/EntityRelationshipModelSourceCodeGenerator';
import NomnomlEntityRelationshipModelSourceCodeGeneratorConfig
	from '@/erdiagram/converter/diagram/nomnoml/config/NomnomlEntityRelationshipModelSourceCodeGeneratorConfig';
import nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager
	from '@/erdiagram/converter/diagram/nomnoml/config/NomnomlEntityRelationshipModelSourceCodeGeneratorConfigManager';
import NomnomlDirectivesCodeGenerator
	from '@/erdiagram/converter/diagram/nomnoml/directive/NomnomlDirectivesCodeGenerator';

export default class NomnomlEntityRelationshipModelSourceCodeGenerator implements EntityRelationshipModelSourceCodeGenerator {

	private readonly config: NomnomlEntityRelationshipModelSourceCodeGeneratorConfig;

	private readonly entityCodeGenerator = new NomnomlEntityCodeGenerator();
	private readonly relationshipCodeGenerator = new NomnomlRelationshipCodeGenerator();
	private readonly directivesCodeGenerator = new NomnomlDirectivesCodeGenerator();

	constructor(config?: NomnomlEntityRelationshipModelSourceCodeGeneratorConfig) {
		this.config = nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager.mergeWithDefaultConfig(config);
	}

	public generateSourceCode(model: EntityRelationshipModel): string {
		return [
			...model.entities.map(entity => this.entityCodeGenerator.generateEntityCode(entity)),
			...model.relationships.map(relationship => this.relationshipCodeGenerator.generateRelationshipCode(relationship)),
			this.directivesCodeGenerator.generateDirectivesCode(this.config)
		].join('\n\n');
	}

}
