import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';

export default interface DatabaseModelToCodeConverterSerializableConfig {
	idColumnType: EntityPropertyType;
	typeBindings: Partial<Record<EntityPropertyType, string>>;
	tableNameCaseFormat?: string;
	columnNameCaseFormat?: string;
}
