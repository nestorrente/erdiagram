import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';

export default class MySqlTypeResolver {

	private readonly typesMap: Partial<Record<EntityPropertyType, string>>;

	constructor(typesMap: Partial<Record<EntityPropertyType, string>>) {
		this.typesMap = typesMap;
	}

	public resolveMySqlType(type: EntityPropertyType): string {

		if (!this.typesMap.hasOwnProperty(type)) {
			throw new Error('Unsupported type: ' + type);
		}

		return this.typesMap[type]!;

	}

}
