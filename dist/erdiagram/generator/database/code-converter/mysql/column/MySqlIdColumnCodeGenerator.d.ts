import { EntityPropertyType } from '../../../../../parser/entity-relationship-model-types';
import IdColumnCode from './types/IdColumnCode';
import MySqlColumnCodeGenerator from './MySqlColumnCodeGenerator';
import CaseConverter from '../../../../common/case-format/CaseConverter';
export default class MySqlIdColumnCodeGenerator {
    private readonly columnCodeGenerator;
    private readonly columnNameCaseConverter;
    private readonly idColumnType;
    constructor(columnCodeGenerator: MySqlColumnCodeGenerator, columnNameCaseConverter: CaseConverter, idColumnType: EntityPropertyType);
    generateIdColumnCode(outputTableName: string, identifierColumnName: string): IdColumnCode;
    private createIdColumnDescriptor;
    private createPrimaryKeyConstraint;
}
//# sourceMappingURL=MySqlIdColumnCodeGenerator.d.ts.map