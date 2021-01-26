import { ModelCodeGenerator } from '../types';
import { EntityRelationshipModel } from '../../parser/er-model-parser';
export default class SqlModelCodeGenerator implements ModelCodeGenerator {
    generateCode(model: EntityRelationshipModel): string;
    private generateEntityTable;
    private createColumn;
    private generateRelationshipTable;
    private createForeignColumn;
    private createForeignKey;
}
//# sourceMappingURL=sql-generator.d.ts.map