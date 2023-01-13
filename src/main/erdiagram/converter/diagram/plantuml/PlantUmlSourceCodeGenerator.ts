import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import SourceCodeGenerator from '@/erdiagram/converter/SourceCodeGenerator';
import PlantUmlEntityCodeGenerator from '@/erdiagram/converter/diagram/plantuml/entity/PlantUmlEntityCodeGenerator';
import PlantUmlRelationshipCodeGenerator
    from '@/erdiagram/converter/diagram/plantuml/relationship/PlantUmlRelationshipCodeGenerator';
import {PartialPlantUmlConfig} from '@/erdiagram/converter/diagram/plantuml/config/PlantUmlConfig';
import plantUmlConfigManager from '@/erdiagram/converter/diagram/plantuml/config/PlantUmlConfigManager';

export default class PlantUmlSourceCodeGenerator implements SourceCodeGenerator {

    private readonly entityCodeGenerator;
    private readonly relationshipCodeGenerator;

    constructor(config?: PartialPlantUmlConfig) {
        const fullConfig = plantUmlConfigManager.mergeWithDefaultConfig(config);
        this.entityCodeGenerator = new PlantUmlEntityCodeGenerator(fullConfig.diagramLevel);
        this.relationshipCodeGenerator = new PlantUmlRelationshipCodeGenerator();
    }

    public generateSourceCode(model: EntityRelationshipModel): string {
        return [
            '@startuml',
            ...model.entities.map(entity => this.entityCodeGenerator.generateEntityCode(entity)),
            ...model.relationships.map(relationship => this.relationshipCodeGenerator.generateRelationshipCode(relationship)),
            '@enduml'
        ].join('\n\n');
    }

}
