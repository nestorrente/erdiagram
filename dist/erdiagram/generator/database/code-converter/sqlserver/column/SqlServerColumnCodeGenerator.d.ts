import { TableColumnDescriptor } from '../../../model/database-model-types';
import RegularColumnCode from './types/RegularColumnCode';
import SqlServerTypeResolver from '../type/SqlServerTypeResolver';
import CaseConverter from '../../../../common/case-format/CaseConverter';
export default class SqlServerColumnCodeGenerator {
    private readonly typeResolver;
    private readonly columnNameCaseConverter;
    constructor(typeResolver: SqlServerTypeResolver, columnNameCaseConverter: CaseConverter);
    generateColumnCode(outputTableName: string, column: TableColumnDescriptor, identity?: boolean): RegularColumnCode;
    private getAutoincrementalSequenceName;
    private generateCreateSequenceLine;
    private generateColumnDeclarationLine;
    private generateSqlServerTypeDeclaration;
    private generateLengthCode;
    private generateUniqueConstraintLine;
}
//# sourceMappingURL=SqlServerColumnCodeGenerator.d.ts.map