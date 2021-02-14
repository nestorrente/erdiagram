import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';

export default interface DatabaseModelToCodeConverterSerializedConfig {
	idColumnType: EntityPropertyType;
	typeMappings: Partial<Record<EntityPropertyType, string>>;
	tableNameCaseFormat?: string;
	columnNameCaseFormat?: string;
}
