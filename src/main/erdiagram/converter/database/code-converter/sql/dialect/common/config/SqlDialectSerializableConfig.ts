import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import StandardCaseFormats from '@/erdiagram/converter/common/case-format/StandardCaseFormats';

export default interface SqlDialectSerializableConfig {
	typeBindings: Record<EntityPropertyType, string>;
	tableNameCaseFormat: keyof typeof StandardCaseFormats;
	columnNameCaseFormat: keyof typeof StandardCaseFormats;
}
