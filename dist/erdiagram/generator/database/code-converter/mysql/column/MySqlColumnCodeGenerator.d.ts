import { TableColumnDescriptor } from '../../../model/database-model-types';
import RegularColumnCode from './types/RegularColumnCode';
import MySqlTypeResolver from '../type/MySqlTypeResolver';
import CaseConverter from '../../../../common/case-format/CaseConverter';
export default class MySqlColumnCodeGenerator {
    private readonly typeResolver;
    private readonly columnNameCaseConverter;
    constructor(typeResolver: MySqlTypeResolver, columnNameCaseConverter: CaseConverter);
    generateColumnCode(outputTableName: string, column: TableColumnDescriptor): RegularColumnCode;
    private generateColumnDeclarationLine;
    private generateMySqlTypeDeclaration;
    private generateLengthCode;
    private generateUniqueConstraintLine;
}
//# sourceMappingURL=MySqlColumnCodeGenerator.d.ts.map