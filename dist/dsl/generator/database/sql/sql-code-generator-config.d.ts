import { IdNamingStrategy } from '@/dsl/generator/common/strategy/id-naming-strategies';
export default interface MySqlCodeGeneratorConfig {
    idNamingStrategy: IdNamingStrategy;
    typesMap: Record<string, string>;
}
//# sourceMappingURL=sql-code-generator-config.d.ts.map