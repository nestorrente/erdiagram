import AbstractComponentConfigManager from '../../../../../common/config/AbstractComponentConfigManager';
import JavaClassModelToCodeConverterConfig from './JavaClassModelToCodeConverterConfig';
import JavaClassModelToCodeConverterSerializableConfig from './JavaClassModelToCodeConverterSerializableConfig';
export declare class JavaClassModelToCodeConverterConfigManager extends AbstractComponentConfigManager<JavaClassModelToCodeConverterConfig, Partial<JavaClassModelToCodeConverterConfig>, JavaClassModelToCodeConverterSerializableConfig> {
    getDefaultConfig(): JavaClassModelToCodeConverterConfig;
    mergeConfigs(fullConfig: JavaClassModelToCodeConverterConfig, partialConfig?: Partial<JavaClassModelToCodeConverterConfig>): JavaClassModelToCodeConverterConfig;
    convertToSerializableObject(fullConfig: JavaClassModelToCodeConverterConfig): JavaClassModelToCodeConverterSerializableConfig;
    convertFromSerializableObject(serializableConfig: JavaClassModelToCodeConverterSerializableConfig): JavaClassModelToCodeConverterConfig;
}
declare const javaClassModelToCodeConverterConfigManager: JavaClassModelToCodeConverterConfigManager;
export default javaClassModelToCodeConverterConfigManager;
//# sourceMappingURL=JavaClassModelToCodeConverterConfigManager.d.ts.map