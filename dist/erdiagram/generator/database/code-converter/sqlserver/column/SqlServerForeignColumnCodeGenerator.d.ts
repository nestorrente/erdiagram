import { TableReferenceDescriptor } from '../../../model/database-model-types';
import ForeignKeyColumnCode from './types/ForeignKeyColumnCode';
import SqlServerColumnCodeGenerator from './SqlServerColumnCodeGenerator';
import CaseConverter from '../../../../common/case-format/CaseConverter';
export default class SqlServerForeignColumnCodeGenerator {
    private readonly columnCodeGenerator;
    private readonly tableNameCaseConverter;
    private readonly columnNameCaseConverter;
    constructor(columnCodeGenerator: SqlServerColumnCodeGenerator, tableNameCaseConverter: CaseConverter, columnNameCaseConverter: CaseConverter);
    generateForeignColumnCode(outputTableName: string, reference: TableReferenceDescriptor): ForeignKeyColumnCode;
    private createForeignKeyColumnDescriptor;
    private createForeignKeyConstraint;
}
//# sourceMappingURL=SqlServerForeignColumnCodeGenerator.d.ts.map