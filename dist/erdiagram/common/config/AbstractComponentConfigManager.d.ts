import ComponentConfigManager from './ComponentConfigManager';
export default abstract class AbstractComponentConfigManager<C, P = Partial<C>, S = C> implements ComponentConfigManager<C, P, S> {
    abstract getDefaultConfig(): C;
    abstract mergeConfigs(fullConfig: C, partialConfig?: P): C;
    mergeWithDefaultConfig(partialConfig?: P): C;
    cloneConfig(fullConfig: C): C;
    abstract convertToSerializableObject(fullConfig: C): S;
    abstract convertFromSerializableObject(serializableConfig: S): C;
}
//# sourceMappingURL=AbstractComponentConfigManager.d.ts.map