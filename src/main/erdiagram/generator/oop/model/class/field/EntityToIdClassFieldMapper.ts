import {ClassFieldDescriptor} from '@/erdiagram/generator/oop/model/class-model-types';
import {EntityDescriptor, EntityPropertyType} from '@/erdiagram/parser/entity-relationship-model-types';
import IdNamingStrategy from '@/erdiagram/generator/common/id-naming-strategy/IdNamingStrategy';

export default class EntityToIdClassFieldMapper {

	constructor(
			private readonly idNamingStrategy: IdNamingStrategy
	) {

	}

	public mapEntityToIdClassField(entity: EntityDescriptor): ClassFieldDescriptor {
		return {
			name: this.getIdentifierFieldName(entity),
			primitiveType: EntityPropertyType.IDENTIFIER,
			// ID field must be nullable, so NULL value can be used to represent an unsaved instance
			nullable: true,
			list: false
		};
	}

	private getIdentifierFieldName(entity: EntityDescriptor) {

		if (entity.identifierPropertyName) {
			return entity.identifierPropertyName;
		}

		const {idNamingStrategy} = this;
		return idNamingStrategy(entity.name);

	}

};
