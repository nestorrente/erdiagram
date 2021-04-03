import {EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';

export default interface ClassModelToCodeConverterConfig<T> {
	typeBindings: Partial<Record<EntityPropertyType, T>>;
}
