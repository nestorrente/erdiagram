import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import NomnomlEntityCodeGenerator from '@/erdiagram/converter/diagram/nomnoml/entity/NomnomlEntityCodeGenerator';
import NomnomlRelationshipCodeGenerator
	from '@/erdiagram/converter/diagram/nomnoml/relationship/NomnomlRelationshipCodeGenerator';
import SourceCodeGenerator from '@/erdiagram/converter/SourceCodeGenerator';
import NomnomlConfig, {PartialNomnomlConfig} from '@/erdiagram/converter/diagram/nomnoml/config/NomnomlConfig';
import nomnomlConfigManager from '@/erdiagram/converter/diagram/nomnoml/config/NomnomlConfigManager';
import NomnomlDirectivesCodeGenerator
	from '@/erdiagram/converter/diagram/nomnoml/directive/NomnomlDirectivesCodeGenerator';

export default class NomnomlSourceCodeGenerator implements SourceCodeGenerator {

	private readonly config: NomnomlConfig;

	private readonly entityCodeGenerator;
	private readonly relationshipCodeGenerator;
	private readonly directivesCodeGenerator;

	constructor(config?: PartialNomnomlConfig) {
		this.config = nomnomlConfigManager.mergeWithDefaultConfig(config);
		this.entityCodeGenerator = new NomnomlEntityCodeGenerator(this.config.diagramLevel);
		this.relationshipCodeGenerator = new NomnomlRelationshipCodeGenerator();
		this.directivesCodeGenerator = new NomnomlDirectivesCodeGenerator();
	}

	public generateSourceCode(model: EntityRelationshipModel): string {
		return [
			...model.entities.map(entity => this.entityCodeGenerator.generateEntityCode(entity)),
			...model.relationships.map(relationship => this.relationshipCodeGenerator.generateRelationshipCode(relationship)),
			this.directivesCodeGenerator.generateDirectivesCode(this.config.style)
		].join('\n\n');
	}

}
