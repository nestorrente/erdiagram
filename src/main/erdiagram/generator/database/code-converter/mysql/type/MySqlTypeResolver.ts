import {EntityPropertyType} from '@/erdiagram/parser/statement/statement-types-parse-functions';

export default class MySqlTypeResolver {

	private readonly typesMap: Record<EntityPropertyType, string>;

	constructor(typesMap: Record<EntityPropertyType, string>) {
		this.typesMap = typesMap;
	}

	public resolveMySqlType(type: EntityPropertyType): string {

		if (!this.typesMap.hasOwnProperty(type)) {
			throw new Error('Unsupported type: ' + type);
		}

		return this.typesMap[type];

	}

}
