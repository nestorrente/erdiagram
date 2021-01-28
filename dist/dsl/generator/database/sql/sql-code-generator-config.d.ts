import IdNamingStrategy from '@/dsl/generator/common/id-naming-strategy';
import CaseFormat from '@/dsl/generator/common/case-format/CaseFormat';
import { EntityPropertyType } from '@/dsl/parser/statement/statement-types-parse-functions';
export default interface SqlCodeGeneratorConfig {
    idColumnType: EntityPropertyType;
    idNamingStrategy: IdNamingStrategy;
    typesMap: Record<string, string>;
    tableCaseFormat: CaseFormat;
    columnCaseFormat: CaseFormat;
}
//# sourceMappingURL=sql-code-generator-config.d.ts.map