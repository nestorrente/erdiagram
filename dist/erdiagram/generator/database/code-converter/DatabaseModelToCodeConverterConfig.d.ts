import CaseFormat from '../../common/case-format/CaseFormat';
import { EntityPropertyType } from '../../../parser/entity-relationship-model-types';
export default interface DatabaseModelToCodeConverterConfig {
    idColumnType: EntityPropertyType;
    typeBindings: Partial<Record<EntityPropertyType, string>>;
    tableNameCaseFormat: CaseFormat;
    columnNameCaseFormat: CaseFormat;
}
//# sourceMappingURL=DatabaseModelToCodeConverterConfig.d.ts.map