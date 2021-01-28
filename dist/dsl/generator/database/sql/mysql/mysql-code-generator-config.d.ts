import SqlCodeGeneratorConfig from '@/dsl/generator/database/sql/sql-code-generator-config';
export default interface MySqlCodeGeneratorConfig extends SqlCodeGeneratorConfig {
}
export declare const defaultMySqlCodeGeneratorConfig: MySqlCodeGeneratorConfig;
export declare function mergeWithDefaultConfig(config?: Partial<MySqlCodeGeneratorConfig>): MySqlCodeGeneratorConfig;
//# sourceMappingURL=mysql-code-generator-config.d.ts.map