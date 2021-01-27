import EntityRelationshipModelToCodeConverter from 'src/dsl/generator/entity-relationship-to-code-converter';
import { EntityRelationshipModel } from '../../../parser/er-model-parser';
export default class JavaCodeGenerator implements EntityRelationshipModelToCodeConverter {
    generateCode(entityRelationshipModel: EntityRelationshipModel): string;
    private generateClass;
    private createField;
}
//# sourceMappingURL=java-code-generator.d.ts.map