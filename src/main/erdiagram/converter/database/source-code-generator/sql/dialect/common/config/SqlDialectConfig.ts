import CaseFormat from '@/erdiagram/converter/common/case-format/CaseFormat';
import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';

export default interface SqlDialectConfig {
	typeBindings: Record<EntityPropertyType, string>;
	tableNameCaseFormat: CaseFormat;
	columnNameCaseFormat: CaseFormat;
}
