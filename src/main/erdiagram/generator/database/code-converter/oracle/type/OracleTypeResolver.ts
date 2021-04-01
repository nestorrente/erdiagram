import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';

export default class OracleTypeResolver {

	private readonly typeBindings: Partial<Record<EntityPropertyType, string>>;

	constructor(typeBindings: Partial<Record<EntityPropertyType, string>>) {
		this.typeBindings = typeBindings;
	}

	public resolveOracleType(type: EntityPropertyType): string {

		/* istanbul ignore next */
		if (!this.typeBindings.hasOwnProperty(type)) {
			throw new Error('Unsupported type: ' + type);
		}

		return this.typeBindings[type]!;

	}

}
