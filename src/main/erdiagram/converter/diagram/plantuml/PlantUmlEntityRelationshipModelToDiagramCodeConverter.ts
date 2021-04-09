import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import EntityRelationshipModelToCodeConverter from '@/erdiagram/converter/EntityRelationshipModelToCodeConverter';
import PlantUmlEntityRelationshipModelToDiagramCodeConverterConfig
	from '@/erdiagram/converter/diagram/plantuml/config/PlantUmlEntityRelationshipModelToDiagramCodeConverterConfig';
import plantumlEntityRelationshipModelToDiagramCodeConverterConfigManager
	from '@/erdiagram/converter/diagram/plantuml/config/PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager';
import PlantUmlEntityCodeGenerator from '@/erdiagram/converter/diagram/plantuml/entity/PlantUmlEntityCodeGenerator';
import PlantUmlRelationshipCodeGenerator
	from '@/erdiagram/converter/diagram/plantuml/relationship/PlantUmlRelationshipCodeGenerator';

export default class PlantUmlEntityRelationshipModelToDiagramCodeConverter implements EntityRelationshipModelToCodeConverter {

	private readonly config: PlantUmlEntityRelationshipModelToDiagramCodeConverterConfig;

	private readonly entityCodeGenerator = new PlantUmlEntityCodeGenerator();
	private readonly relationshipCodeGenerator = new PlantUmlRelationshipCodeGenerator();

	constructor(config?: Partial<PlantUmlEntityRelationshipModelToDiagramCodeConverterConfig>) {
		this.config = plantumlEntityRelationshipModelToDiagramCodeConverterConfigManager.mergeWithDefaultConfig(config);
	}

	public convertToCode(model: EntityRelationshipModel): string {
		return [
			'@startuml',
			...model.entities.map(entity => this.entityCodeGenerator.generateEntityCode(entity)),
			...model.relationships.map(relationship => this.relationshipCodeGenerator.generateRelationshipCode(relationship)),
			'@enduml'
		].join('\n\n');
	}

}
