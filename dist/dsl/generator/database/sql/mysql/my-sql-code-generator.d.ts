import EntityRelationshipModelToCodeConverter from '@/dsl/generator/entity-relationship-to-code-converter';
import { EntityRelationshipModel } from '@/dsl/parser/er-model-parser';
import MySqlCodeGeneratorConfig from '@/dsl/generator/database/sql/mysql/mysql-code-generator-config';
export default class MySqlCodeGenerator implements EntityRelationshipModelToCodeConverter {
    private readonly config;
    constructor(config?: Partial<MySqlCodeGeneratorConfig>);
    generateCode(entityRelationshipModel: EntityRelationshipModel): string;
    private generateTable;
    private createPrimaryKeyConstraint;
    private createIdColumn;
    private createColumn;
    private createForeignColumn;
    private createForeignKey;
    private getTableId;
    private mapPropertyTypeToSqlType;
}
//# sourceMappingURL=my-sql-code-generator.d.ts.map