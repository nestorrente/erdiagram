import {capitalizeWord} from '@/erdiagram/util/string-utils';
import {ClassDescriptor, ClassFieldDescriptor} from '@/erdiagram/generator/oop/model/class-model-types';
import {Direction, EntityDescriptor, RelationshipDescriptor} from '@/erdiagram/parser/entity-relationship-model-types';
import ClassModelGeneratorConfig from '@/erdiagram/generator/oop/model/config/ClassModelGeneratorConfig';
import RelationshipMemberToClassFieldMapper
	from '@/erdiagram/generator/oop/model/class/field/RelationshipMemberToClassFieldMapper';
import EntityPropertyToClassFieldMapper
	from '@/erdiagram/generator/oop/model/class/field/EntityPropertyToClassFieldMapper';
import EntityToIdClassFieldMapper from '@/erdiagram/generator/oop/model/class/field/EntityToIdClassFieldMapper';

export default class EntityToClassMapper {

	private readonly entityToIdClassFieldMapper: EntityToIdClassFieldMapper;
	private readonly entityPropertyToClassFieldMapper: EntityPropertyToClassFieldMapper;
	private readonly relationshipMemberToClassFieldMapper: RelationshipMemberToClassFieldMapper;

	constructor(
			private readonly config: ClassModelGeneratorConfig
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
			fields.push(this.entityPropertyToClassFieldMapper.mapPropertyToField(property));
		}

		for (const relationship of relationships) {

			const {
				leftMember,
				rightMember,
				direction
			} = relationship;

			if (leftMember.entity === entity.name && [Direction.LEFT_TO_RIGHT, Direction.BIDIRECTIONAL].includes(direction)) {
				fields.push(this.relationshipMemberToClassFieldMapper.mapRelationshipMemberToField(rightMember));
			}

			if (rightMember.entity === entity.name && [Direction.RIGHT_TO_LEFT, Direction.BIDIRECTIONAL].includes(direction)) {
				fields.push(this.relationshipMemberToClassFieldMapper.mapRelationshipMemberToField(leftMember));
			}

		}

		return {
			name,
			fields
		};

	}

};
