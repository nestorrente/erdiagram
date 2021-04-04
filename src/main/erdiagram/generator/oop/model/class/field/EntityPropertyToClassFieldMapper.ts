import {ClassFieldDescriptor} from '@/erdiagram/generator/oop/model/class-model-types';
import {EntityPropertyDescriptor} from '@/erdiagram/parser/entity-relationship-model-types';

export default class EntityPropertyToClassFieldMapper {

	public mapPropertyToField(property: EntityPropertyDescriptor): ClassFieldDescriptor {

		const {
			name,
			optional,
			type
		} = property;

		return {
			name,
			nullable: optional,
			primitiveType: type,
			list: false
		};

	}

};
