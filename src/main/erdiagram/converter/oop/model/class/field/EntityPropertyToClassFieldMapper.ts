import {ClassFieldDescriptor} from '@/erdiagram/converter/oop/model/class-model-types';
import {EntityPropertyDescriptor, EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';

const TYPES_WITH_MAX_SIZE_SUPPORT = [EntityPropertyType.TEXT, EntityPropertyType.BLOB];

export default class EntityPropertyToClassFieldMapper {

	public mapPropertyToField(property: EntityPropertyDescriptor): ClassFieldDescriptor {

		const {
			name,
			optional,
			type,
			length
		} = property;

		return {
			name,
			nullable: optional,
			primitiveType: type,
			list: false,
			maxSize: TYPES_WITH_MAX_SIZE_SUPPORT.includes(type) ? length[0] : undefined
		};

	}

};
