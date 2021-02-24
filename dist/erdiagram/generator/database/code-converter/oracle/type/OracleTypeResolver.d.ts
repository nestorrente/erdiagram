import { EntityPropertyType } from '../../../../../parser/entity-relationship-model-types';
export default class OracleTypeResolver {
    private readonly typeBindings;
    constructor(typeBindings: Partial<Record<EntityPropertyType, string>>);
    resolveOracleType(type: EntityPropertyType): string;
}
//# sourceMappingURL=OracleTypeResolver.d.ts.map