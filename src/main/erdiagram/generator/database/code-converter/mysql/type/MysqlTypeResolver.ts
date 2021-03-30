import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';

export default class MysqlTypeResolver {

	private readonly typeBindings: Partial<Record<EntityPropertyType, string>>;

	constructor(typeBindings: Partial<Record<EntityPropertyType, string>>) {
		this.typeBindings = typeBindings;
	}

	public resolveMysqlType(type: EntityPropertyType): string {

		if (!this.typeBindings.hasOwnProperty(type)) {
			/* istanbul ignore next */
			throw new Error('Unsupported type: ' + type);
		}

		return this.typeBindings[type]!;

	}

}
