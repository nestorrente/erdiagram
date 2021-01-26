import { ModelCodeGenerator } from '../types';
import { EntityRelationshipModel } from '../../parser/er-model-parser';
export default class SqlModelCodeGenerator implements ModelCodeGenerator {
    generateCode(entityRelationshipModel: EntityRelationshipModel): string;
    private generateTable;
    private createPrimaryKeyConstraint;
    private createIdColumn;
    private createColumn;
    private createForeignColumn;
    private createForeignKey;
}
//# sourceMappingURL=sql-code-generator.d.ts.map