import { EntityRelationshipModel } from './entity-relationship-model-types';
import EntityRelationshipModelParserConfig from './config/EntityRelationshipModelParserConfig';
export default class EntityRelationshipModelParser {
    private readonly config;
    private readonly validator;
    constructor(config?: Partial<EntityRelationshipModelParserConfig>);
    parseModel(code: string): EntityRelationshipModel;
    private parseModelWithoutValidation;
}
//# sourceMappingURL=EntityRelationshipModelParser.d.ts.map