import {ClassFieldDescriptor} from '@/erdiagram/converter/oop/model/class-model-types';
import {
	EntityDescriptor,
	EntityPropertyDescriptor,
	EntityPropertyType
} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {SourceType} from '@/erdiagram/converter/oop/model/source-metadata/source-metadata-types';

const TYPES_WITH_MAX_SIZE_SUPPORT = [EntityPropertyType.TEXT, EntityPropertyType.BLOB];

export default class EntityPropertyToClassFieldMapper {

	public mapPropertyToField(entity: EntityDescriptor, property: EntityPropertyDescriptor): ClassFieldDescriptor {

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
			maxSize: TYPES_WITH_MAX_SIZE_SUPPORT.includes(type) ? length[0] : undefined,
			sourceMetadata: {
				sourceType: SourceType.ENTITY_PROPERTY,
				entity,
				property
			}
		};

	}

}
