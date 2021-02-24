import { EntityPropertyType } from '../../../../../parser/entity-relationship-model-types';
import IdColumnCode from './types/IdColumnCode';
import SqlServerColumnCodeGenerator from './SqlServerColumnCodeGenerator';
import CaseConverter from '../../../../common/case-format/CaseConverter';
export default class SqlServerIdColumnCodeGenerator {
    private readonly columnCodeGenerator;
    private readonly columnNameCaseConverter;
    private readonly idColumnType;
    constructor(columnCodeGenerator: SqlServerColumnCodeGenerator, columnNameCaseConverter: CaseConverter, idColumnType: EntityPropertyType);
    generateIdColumnCode(outputTableName: string, identifierColumnName: string): IdColumnCode;
    private createIdColumnDescriptor;
    private createPrimaryKeyConstraint;
}
//# sourceMappingURL=SqlServerIdColumnCodeGenerator.d.ts.map