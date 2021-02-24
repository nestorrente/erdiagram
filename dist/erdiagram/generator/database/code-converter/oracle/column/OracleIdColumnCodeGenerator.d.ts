import { EntityPropertyType } from '../../../../../parser/entity-relationship-model-types';
import IdColumnCode from './types/IdColumnCode';
import OracleColumnCodeGenerator from './OracleColumnCodeGenerator';
import CaseConverter from '../../../../common/case-format/CaseConverter';
export default class OracleIdColumnCodeGenerator {
    private readonly columnCodeGenerator;
    private readonly columnNameCaseConverter;
    private readonly idColumnType;
    constructor(columnCodeGenerator: OracleColumnCodeGenerator, columnNameCaseConverter: CaseConverter, idColumnType: EntityPropertyType);
    generateIdColumnCode(outputTableName: string, identifierColumnName: string): IdColumnCode;
    private createIdColumnDescriptor;
    private createPrimaryKeyConstraint;
}
//# sourceMappingURL=OracleIdColumnCodeGenerator.d.ts.map