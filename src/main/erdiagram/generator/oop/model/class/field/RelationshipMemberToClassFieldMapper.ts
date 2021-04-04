import {Cardinality, RelationshipMember} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {ClassFieldDescriptor} from '@/erdiagram/generator/oop/model/class-model-types';
import pluralize from 'pluralize';

export default class RelationshipMemberToClassFieldMapper {

	public mapRelationshipMemberToField(toMember: RelationshipMember): ClassFieldDescriptor {

		const list = toMember.cardinality === Cardinality.MANY;
		const name = list ? pluralize(toMember.entityAlias) : toMember.entityAlias;

		return {
			name,
			nullable: toMember.cardinality === Cardinality.ZERO_OR_ONE,
			entityType: toMember.entity,
			list
		};

	}

}
