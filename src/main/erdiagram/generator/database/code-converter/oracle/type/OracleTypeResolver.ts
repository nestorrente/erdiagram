import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';

export default class OracleTypeResolver {

	private readonly typeMappings: Partial<Record<EntityPropertyType, string>>;

	constructor(typeMappings: Partial<Record<EntityPropertyType, string>>) {
		this.typeMappings = typeMappings;
	}

	public resolveOracleType(type: EntityPropertyType): string {

		if (!this.typeMappings.hasOwnProperty(type)) {
			throw new Error('Unsupported type: ' + type);
		}

		return this.typeMappings[type]!;

	}

}
