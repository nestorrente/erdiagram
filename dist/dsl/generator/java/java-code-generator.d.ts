import { ModelCodeGenerator } from '../types';
import { EntityRelationshipModel } from '../../parser/er-model-parser';
export default class JavaCodeGenerator implements ModelCodeGenerator {
    generateCode(model: EntityRelationshipModel): string;
    private generateClass;
    private createIdField;
    private createField;
    private createRelationshipField;
}
//# sourceMappingURL=java-code-generator.d.ts.map