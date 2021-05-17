import ComponentConfigManager from '@/erdiagram/common/config/ComponentConfigManager';
// import {JsonAdapters, JsonConverter, Nullable, NullishAwareJsonAdapter} from 'true-json';

export default abstract class AbstractComponentConfigManager<C, P = Partial<C>, S = C>
		implements ComponentConfigManager<C, P, S> {

	// readonly #jsonConverter: JsonConverter<Nullable<C>>;
	//
	// constructor() {
	// 	this.#jsonConverter = new JsonConverter(this.getJsonAdapter());
	// }

	abstract getDefaultConfig(): C;

	abstract mergeConfigs(fullConfig: C, partialConfig?: P): C;

	mergeWithDefaultConfig(partialConfig?: P): C {
		return this.mergeConfigs(this.getDefaultConfig(), partialConfig);
	}

	/** @deprecated use {@link serialize} instead */
	abstract convertToSerializableObject(fullConfig: C): S;

	/** @deprecated use {@link deserialize} instead */
	abstract convertFromSerializableObject(serializableConfig: S): C;

	// serialize(fullConfig: C, pretty: boolean = false): string {
	// 	return this.#jsonConverter.stringify(fullConfig, pretty ? 2 : undefined);
	// }
	//
	// deserialize(text: string): C {
	// 	return this.#jsonConverter.parse(text)!;
	// }
	//
	// protected getJsonAdapter(): NullishAwareJsonAdapter<C> {
	// 	return JsonAdapters.identity<any>();
	// }

}
