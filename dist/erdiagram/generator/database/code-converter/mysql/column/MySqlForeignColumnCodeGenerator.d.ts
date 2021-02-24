import { TableReferenceDescriptor } from '../../../model/database-model-types';
import ForeignKeyColumnCode from './types/ForeignKeyColumnCode';
import MySqlColumnCodeGenerator from './MySqlColumnCodeGenerator';
import CaseConverter from '../../../../common/case-format/CaseConverter';
export default class MySqlForeignColumnCodeGenerator {
    private readonly columnCodeGenerator;
    private readonly tableNameCaseConverter;
    private readonly columnNameCaseConverter;
    constructor(columnCodeGenerator: MySqlColumnCodeGenerator, tableNameCaseConverter: CaseConverter, columnNameCaseConverter: CaseConverter);
    generateForeignColumnCode(outputTableName: string, reference: TableReferenceDescriptor): ForeignKeyColumnCode;
    private createForeignKeyColumnDescriptor;
    private createForeignKeyConstraint;
}
//# sourceMappingURL=MySqlForeignColumnCodeGenerator.d.ts.map