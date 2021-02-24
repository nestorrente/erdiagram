import { EntityPropertyType } from '../../../../../parser/entity-relationship-model-types';
export default class SqlServerTypeResolver {
    private readonly typeBindings;
    constructor(typeBindings: Partial<Record<EntityPropertyType, string>>);
    resolveSqlServerType(type: EntityPropertyType): string;
}
//# sourceMappingURL=SqlServerTypeResolver.d.ts.map