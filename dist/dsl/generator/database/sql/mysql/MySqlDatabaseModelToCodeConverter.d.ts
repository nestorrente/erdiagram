import { DatabaseModel } from '@/dsl/generator/database/database-model/database-model-types';
import MySqlDatabaseModelToCodeGeneratorConfig from '@/dsl/generator/database/sql/mysql/MySqlDatabaseModelToCodeGeneratorConfig';
import DatabaseModelToCodeConverter from '@/dsl/generator/database/sql/DatabaseModelToCodeConverter';
export default class MySqlDatabaseModelToCodeConverter implements DatabaseModelToCodeConverter {
    private readonly config;
    constructor(config?: Partial<MySqlDatabaseModelToCodeGeneratorConfig>);
    generateCode(databaseModel: DatabaseModel): string;
    private generateTable;
    private createIdColumn;
    private createIdColumnDescriptor;
    private createPrimaryKeyConstraint;
    private createForeignColumn;
    private createForeignKeyColumnDescriptor;
    private createForeignKeyConstraint;
    private getTableId;
    private createColumn;
    private createColumnLine;
    private mapPropertyTypeToSqlType;
    private createUniqueConstraint;
}
//# sourceMappingURL=MySqlDatabaseModelToCodeConverter.d.ts.map