import {ClassFieldDescriptor} from '@/erdiagram/converter/oop/model/class-model-types';
import {EntityDescriptor, EntityPropertyType} from '@/erdiagram/parser/types/entity-relationship-model-types';
import IdNamingStrategy from '@/erdiagram/converter/common/id-naming-strategy/IdNamingStrategy';
import {SourceType} from '@/erdiagram/converter/oop/model/source-metadata/source-metadata-types';

export default class EntityToIdClassFieldMapper {

	constructor(
			private readonly idNamingStrategy: IdNamingStrategy
	) {

	}

	public mapEntityToIdClassField(entity: EntityDescriptor): ClassFieldDescriptor {
		return {
			name: this.getIdentityFieldName(entity),
			primitiveType: EntityPropertyType.IDENTITY,
			// ID field must be nullable, so NULL value can be used to represent an unsaved instance
			nullable: true,
			list: false,
			sourceMetadata: {
				sourceType: SourceType.ENTITY_IDENTITY,
				entity
			}
		};
	}

	private getIdentityFieldName(entity: EntityDescriptor) {

		if (entity.identityPropertyName) {
			return entity.identityPropertyName;
		}

		const {idNamingStrategy} = this;
		return idNamingStrategy(entity.name);

	}

}
