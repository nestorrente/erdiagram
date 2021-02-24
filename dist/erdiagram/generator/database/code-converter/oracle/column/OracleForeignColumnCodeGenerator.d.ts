import { TableReferenceDescriptor } from '../../../model/database-model-types';
import ForeignKeyColumnCode from './types/ForeignKeyColumnCode';
import OracleColumnCodeGenerator from './OracleColumnCodeGenerator';
import CaseConverter from '../../../../common/case-format/CaseConverter';
export default class OracleForeignColumnCodeGenerator {
    private readonly columnCodeGenerator;
    private readonly tableNameCaseConverter;
    private readonly columnNameCaseConverter;
    constructor(columnCodeGenerator: OracleColumnCodeGenerator, tableNameCaseConverter: CaseConverter, columnNameCaseConverter: CaseConverter);
    generateForeignColumnCode(outputTableName: string, reference: TableReferenceDescriptor): ForeignKeyColumnCode;
    private createForeignKeyColumnDescriptor;
    private createForeignKeyConstraint;
}
//# sourceMappingURL=OracleForeignColumnCodeGenerator.d.ts.map