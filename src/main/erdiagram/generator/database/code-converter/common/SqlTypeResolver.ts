import {EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';

export default class SqlTypeResolver {

	private readonly typeBindings: Partial<Record<EntityPropertyType, string>>;

	constructor(typeBindings: Partial<Record<EntityPropertyType, string>>) {
		this.typeBindings = typeBindings;
	}

	public resolveSqlType(type: EntityPropertyType): string {

		/* istanbul ignore next */
		if (!this.typeBindings.hasOwnProperty(type)) {
			throw new Error('Unsupported type: ' + type);
		}

		return this.typeBindings[type]!;

	}

}
