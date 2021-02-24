import AbstractComponentConfigManager from '../../../../common/config/AbstractComponentConfigManager';
import DatabaseModelGeneratorConfig from './DatabaseModelGeneratorConfig';
import DatabaseModelGeneratorSerializableConfig from './DatabaseModelGeneratorSerializableConfig';
export declare class DatabaseModelGeneratorConfigManager extends AbstractComponentConfigManager<DatabaseModelGeneratorConfig, Partial<DatabaseModelGeneratorConfig>, DatabaseModelGeneratorSerializableConfig> {
    getDefaultConfig(): DatabaseModelGeneratorConfig;
    mergeConfigs(fullConfig: DatabaseModelGeneratorConfig, partialConfig?: Partial<DatabaseModelGeneratorConfig>): DatabaseModelGeneratorConfig;
    convertToSerializableObject(fullConfig: DatabaseModelGeneratorConfig): DatabaseModelGeneratorSerializableConfig;
    convertFromSerializableObject(serializableConfig: DatabaseModelGeneratorSerializableConfig): DatabaseModelGeneratorConfig;
}
declare const databaseModelGeneratorConfigManager: DatabaseModelGeneratorConfigManager;
export default databaseModelGeneratorConfigManager;
//# sourceMappingURL=DatabaseModelGeneratorConfigManager.d.ts.map