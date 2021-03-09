import {EntityRelationshipModel} from '@/erdiagram/parser/entity-relationship-model-types';
import EntityRelationshipModelToCodeConverter from '@/erdiagram/generator/EntityRelationshipModelToCodeConverter';
import PlantUmlEntityRelationshipModelToDiagramCodeConverterConfig
	from '@/erdiagram/generator/diagram/plantuml/config/PlantUmlEntityRelationshipModelToDiagramCodeConverterConfig';
import plantumlEntityRelationshipModelToDiagramCodeConverterConfigManager
	from '@/erdiagram/generator/diagram/plantuml/config/PlantUmlEntityRelationshipModelToDiagramCodeConverterConfigManager';
import PlantUmlEntityCodeGenerator from '@/erdiagram/generator/diagram/plantuml/entity/PlantUmlEntityCodeGenerator';
import PlantUmlRelationshipCodeGenerator
	from '@/erdiagram/generator/diagram/plantuml/relationship/PlantUmlRelationshipCodeGenerator';

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
