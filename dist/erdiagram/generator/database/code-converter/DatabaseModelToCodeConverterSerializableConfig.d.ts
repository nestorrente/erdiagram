import { EntityPropertyType } from '../../../parser/entity-relationship-model-types';
export default interface DatabaseModelToCodeConverterSerializableConfig {
    idColumnType: EntityPropertyType;
    typeBindings: Partial<Record<EntityPropertyType, string>>;
    tableNameCaseFormat?: string;
    columnNameCaseFormat?: string;
}
//# sourceMappingURL=DatabaseModelToCodeConverterSerializableConfig.d.ts.map