import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import SourceCodeGenerator from '@/erdiagram/converter/SourceCodeGenerator';
import PlantUmlEntityCodeGenerator from '@/erdiagram/converter/diagram/plantuml/entity/PlantUmlEntityCodeGenerator';
import PlantUmlRelationshipCodeGenerator
	from '@/erdiagram/converter/diagram/plantuml/relationship/PlantUmlRelationshipCodeGenerator';

export default class PlantUmlSourceCodeGenerator implements SourceCodeGenerator {

	private readonly entityCodeGenerator = new PlantUmlEntityCodeGenerator();
	private readonly relationshipCodeGenerator = new PlantUmlRelationshipCodeGenerator();

	public generateSourceCode(model: EntityRelationshipModel): string {
		return [
			'@startuml',
			...model.entities.map(entity => this.entityCodeGenerator.generateEntityCode(entity)),
			...model.relationships.map(relationship => this.relationshipCodeGenerator.generateRelationshipCode(relationship)),
			'@enduml'
		].join('\n\n');
	}

}
