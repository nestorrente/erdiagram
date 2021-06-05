import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import NomnomlEntityCodeGenerator from '@/erdiagram/converter/diagram/nomnoml/entity/NomnomlEntityCodeGenerator';
import NomnomlRelationshipCodeGenerator
	from '@/erdiagram/converter/diagram/nomnoml/relationship/NomnomlRelationshipCodeGenerator';
import SourceCodeGenerator from '@/erdiagram/converter/SourceCodeGenerator';
import NomnomlSourceCodeGeneratorConfig
	from '@/erdiagram/converter/diagram/nomnoml/config/NomnomlSourceCodeGeneratorConfig';
import nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager
	from '@/erdiagram/converter/diagram/nomnoml/config/NomnomlSourceCodeGeneratorConfigManager';
import NomnomlDirectivesCodeGenerator
	from '@/erdiagram/converter/diagram/nomnoml/directive/NomnomlDirectivesCodeGenerator';

export default class NomnomlSourceCodeGenerator implements SourceCodeGenerator {

	private readonly config: NomnomlSourceCodeGeneratorConfig;

	private readonly entityCodeGenerator = new NomnomlEntityCodeGenerator();
	private readonly relationshipCodeGenerator = new NomnomlRelationshipCodeGenerator();
	private readonly directivesCodeGenerator = new NomnomlDirectivesCodeGenerator();

	constructor(config?: NomnomlSourceCodeGeneratorConfig) {
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
