import ComponentConfigManager from '@/erdiagram/common/config/ComponentConfigManager';
import {JsonAdapter, JsonAdapters, JsonValue} from 'true-json';

export default abstract class AbstractComponentConfigManager<C, P = Partial<C>>
		implements ComponentConfigManager<C, P> {

	readonly #jsonAdapter: JsonAdapter<C>;

	constructor() {
		this.#jsonAdapter = this.getJsonAdapter();
	}

	abstract getDefaultConfig(): C;

	abstract mergeConfigs(fullConfig: C, partialConfig?: P): C;

	mergeWithDefaultConfig(partialConfig?: P): C {
		return this.mergeConfigs(this.getDefaultConfig(), partialConfig);
	}

	convertToSerializableObject(fullConfig: C): JsonValue {
		return this.#jsonAdapter.adaptToJson(fullConfig);
	}

	convertFromSerializableObject(serializableConfig: JsonValue): C {
		return this.#jsonAdapter.recoverFromJson(serializableConfig);
	}

	protected getJsonAdapter(): JsonAdapter<C> {
		return JsonAdapters.identity<any>();
	}

}
