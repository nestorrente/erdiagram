import {EntityRelationshipModel} from '@/erdiagram/parser/types/entity-relationship-model-types';
import SourceCodeGenerator from '@/erdiagram/converter/SourceCodeGenerator';
import PlantUmlEntityCodeGenerator from '@/erdiagram/converter/diagram/plantuml/entity/PlantUmlEntityCodeGenerator';
import PlantUmlRelationshipCodeGenerator
    from '@/erdiagram/converter/diagram/plantuml/relationship/PlantUmlRelationshipCodeGenerator';
import PlantUmlConfig, {PartialPlantUmlConfig} from '@/erdiagram/converter/diagram/plantuml/config/PlantUmlConfig';
import plantUmlConfigManager from '@/erdiagram/converter/diagram/plantuml/config/PlantUmlConfigManager';
import PlantUmlDirectivesCodeGenerator
    from '@/erdiagram/converter/diagram/plantuml/entity/PlantUmlDirectivesCodeGenerator';

export default class PlantUmlSourceCodeGenerator implements SourceCodeGenerator {

    private readonly config: PlantUmlConfig;

    private readonly entityCodeGenerator: PlantUmlEntityCodeGenerator;
    private readonly relationshipCodeGenerator: PlantUmlRelationshipCodeGenerator;
    private readonly directivesCodeGenerator: PlantUmlDirectivesCodeGenerator;

    constructor(config?: PartialPlantUmlConfig) {
        this.config = plantUmlConfigManager.mergeWithDefaultConfig(config);
        this.entityCodeGenerator = new PlantUmlEntityCodeGenerator(this.config.diagramLevel);
        this.relationshipCodeGenerator = new PlantUmlRelationshipCodeGenerator();
        this.directivesCodeGenerator = new PlantUmlDirectivesCodeGenerator(this.config.diagramLevel);
    }

    public generateSourceCode(model: EntityRelationshipModel): string {

        const codeBlocks: string[] = [
            '@startuml',
            ...model.entities.map(entity => this.entityCodeGenerator.generateEntityCode(entity)),
            ...model.relationships.map(relationship => this.relationshipCodeGenerator.generateRelationshipCode(relationship)),
        ];

        const directivesCode = this.directivesCodeGenerator.generate();

        if (directivesCode) {
            codeBlocks.push(directivesCode);
        }

        codeBlocks.push('@enduml');

        return codeBlocks.join('\n\n');

    }

}
