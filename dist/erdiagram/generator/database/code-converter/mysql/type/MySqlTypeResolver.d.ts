import { EntityPropertyType } from '../../../../../parser/entity-relationship-model-types';
export default class MySqlTypeResolver {
    private readonly typeBindings;
    constructor(typeBindings: Partial<Record<EntityPropertyType, string>>);
    resolveMySqlType(type: EntityPropertyType): string;
}
//# sourceMappingURL=MySqlTypeResolver.d.ts.map