import {JsonValue} from 'true-json';

export default interface ConfigManager<C, P> {

	getDefaultConfig(): C;

	mergeConfigs(fullConfig: C, partialConfig: P): C;

	mergeWithDefaultConfig(partialConfig: P): C;

	convertToSerializableObject(fullConfig: C): JsonValue;

	convertFromSerializableObject(serializableConfig: JsonValue): C;

}
