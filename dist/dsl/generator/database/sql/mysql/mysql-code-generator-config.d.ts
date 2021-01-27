import { IdNamingStrategy } from '@/dsl/generator/common/strategy/id-naming-strategies';
export default interface MySqlCodeGeneratorConfig {
    idNamingStrategy: IdNamingStrategy;
    typesMap: Record<string, string>;
}
export declare const defaultMySqlCodeGeneratorConfig: MySqlCodeGeneratorConfig;
export declare function mergeWithDefaultConfig(config?: Partial<MySqlCodeGeneratorConfig>): MySqlCodeGeneratorConfig;
//# sourceMappingURL=mysql-code-generator-config.d.ts.map