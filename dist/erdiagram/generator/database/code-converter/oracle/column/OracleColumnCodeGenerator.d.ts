import { TableColumnDescriptor } from '../../../model/database-model-types';
import RegularColumnCode from './types/RegularColumnCode';
import OracleTypeResolver from '../type/OracleTypeResolver';
import CaseConverter from '../../../../common/case-format/CaseConverter';
export default class OracleColumnCodeGenerator {
    private readonly typeResolver;
    private readonly columnNameCaseConverter;
    constructor(typeResolver: OracleTypeResolver, columnNameCaseConverter: CaseConverter);
    generateColumnCode(outputTableName: string, column: TableColumnDescriptor): RegularColumnCode;
    private getAutoincrementalSequenceName;
    private generateCreateSequenceLine;
    private generateColumnDeclarationLine;
    private generateOracleTypeDeclaration;
    private generateLengthCode;
    private generateUniqueConstraintLine;
}
//# sourceMappingURL=OracleColumnCodeGenerator.d.ts.map