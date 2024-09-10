import {capitalizeWord} from '@/erdiagram/util/string-utils';
import {ClassDescriptor, ClassFieldDescriptor} from '@/erdiagram/converter/oop/model/class-model-types';
import {
	Direction,
	EntityDescriptor,
	RelationshipDescriptor
} from '@/erdiagram/parser/types/entity-relationship-model-types';
import ClassModelConfig from '@/erdiagram/converter/oop/model/config/ClassModelConfig';
import RelationshipMemberToClassFieldMapper
	from '@/erdiagram/converter/oop/model/class/field/RelationshipMemberToClassFieldMapper';
import EntityPropertyToClassFieldMapper
	from '@/erdiagram/converter/oop/model/class/field/EntityPropertyToClassFieldMapper';
import EntityToIdClassFieldMapper from '@/erdiagram/converter/oop/model/class/field/EntityToIdClassFieldMapper';
import {SourceType} from '@/erdiagram/converter/oop/model/source-metadata/source-metadata-types';

export default class EntityToClassMapper {

	private readonly entityToIdClassFieldMapper: EntityToIdClassFieldMapper;
	private readonly entityPropertyToClassFieldMapper: EntityPropertyToClassFieldMapper;
	private readonly relationshipMemberToClassFieldMapper: RelationshipMemberToClassFieldMapper;

	constructor(
			private readonly config: ClassModelConfig
	) {
		this.entityToIdClassFieldMapper = new EntityToIdClassFieldMapper(this.config.idNamingStrategy);
		this.entityPropertyToClassFieldMapper = new EntityPropertyToClassFieldMapper();
		this.relationshipMemberToClassFieldMapper = new RelationshipMemberToClassFieldMapper();
	}

	public mapEntityToClass(entity: EntityDescriptor, relationships: RelationshipDescriptor[]): ClassDescriptor {

		const name = capitalizeWord(entity.name);

		const fields: ClassFieldDescriptor[] = [
			this.entityToIdClassFieldMapper.mapEntityToIdClassField(entity)
		];

		for (const property of entity.properties) {
			fields.push(this.entityPropertyToClassFieldMapper.mapPropertyToField(entity, property));
		}

		for (const relationship of relationships) {

			const {
				leftMember,
				rightMember,
				direction
			} = relationship;

			if (leftMember.entity === entity.name && [Direction.LEFT_TO_RIGHT, Direction.BIDIRECTIONAL].includes(direction)) {
				fields.push(this.relationshipMemberToClassFieldMapper.mapRelationshipMemberToField(relationship, rightMember));
			}

			if (rightMember.entity === entity.name && [Direction.RIGHT_TO_LEFT, Direction.BIDIRECTIONAL].includes(direction)) {
				fields.push(this.relationshipMemberToClassFieldMapper.mapRelationshipMemberToField(relationship, leftMember));
			}

		}

		return {
			name,
			fields,
			sourceMetadata: {
				sourceType: SourceType.ENTITY,
				entity
			}
		};

	}

}
