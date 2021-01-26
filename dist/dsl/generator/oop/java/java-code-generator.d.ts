import { ModelCodeGenerator } from '../../types';
import { EntityRelationshipModel } from '../../../parser/er-model-parser';
export default class JavaCodeGenerator implements ModelCodeGenerator {
    generateCode(entityRelationshipModel: EntityRelationshipModel): string;
    private generateClass;
    private createField;
}
//# sourceMappingURL=java-code-generator.d.ts.map