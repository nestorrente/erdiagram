import ConfigManager from '@/erdiagram/common/config/ConfigManager';
import {JsonAdapter, JsonAdapters, JsonValue} from 'true-json';

export default abstract class AbstractConfigManager<C, P = Partial<C>> implements ConfigManager<C, P> {

	private readonly _jsonAdapter: JsonAdapter<C>;

	constructor() {
		this._jsonAdapter = this.getJsonAdapter();
	}

	abstract getDefaultConfig(): C;

	abstract mergeConfigs(fullConfig: C, partialConfig?: P): C;

	mergeWithDefaultConfig(partialConfig?: P): C {
		return this.mergeConfigs(this.getDefaultConfig(), partialConfig);
	}

	convertToSerializableObject(fullConfig: C): JsonValue {
		return this._jsonAdapter.adaptToJson(fullConfig);
	}

	convertFromSerializableObject(serializableConfig: JsonValue): C {
		return this._jsonAdapter.recoverFromJson(serializableConfig);
	}

	protected getJsonAdapter(): JsonAdapter<C> {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return JsonAdapters.identity<any>();
	}

}
