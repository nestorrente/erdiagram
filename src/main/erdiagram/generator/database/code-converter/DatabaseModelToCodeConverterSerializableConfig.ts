import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';

export default interface DatabaseModelToCodeConverterSerializableConfig {
	typeBindings: Partial<Record<EntityPropertyType, string>>;
	tableNameCaseFormat?: string;
	columnNameCaseFormat?: string;
}
