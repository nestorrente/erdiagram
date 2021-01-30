import IdNamingStrategy from '@/erdiagram/generator/common/id-naming-strategy/IdNamingStrategy';
import {EntityPropertyType} from '@/erdiagram/parser/statement/statement-types-parse-functions';

export default interface ClassModelToCodeConverterConfig<T> {
	idFieldType: EntityPropertyType;
	idNamingStrategy: IdNamingStrategy;
	typesMap: Record<EntityPropertyType, T>;
}
