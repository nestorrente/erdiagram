import {
	Cardinality,
	RelationshipDescriptor,
	RelationshipMember
} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {ClassFieldDescriptor} from '@/erdiagram/converter/oop/model/class-model-types';
import pluralize from 'pluralize';
import {SourceType} from '@/erdiagram/converter/oop/model/source-metadata-types';

export default class RelationshipMemberToClassFieldMapper {

	public mapRelationshipMemberToField(relationship: RelationshipDescriptor, toMember: RelationshipMember): ClassFieldDescriptor {

		const list = toMember.cardinality === Cardinality.MANY;
		const name = list ? pluralize(toMember.entityAlias) : toMember.entityAlias;

		return {
			name,
			nullable: toMember.cardinality === Cardinality.ZERO_OR_ONE,
			entityType: toMember.entity,
			list,
			sourceMetadata: {
				sourceType: SourceType.RELATIONSHIP_TARGET,
				relationship,
				targetMember: toMember
			}
		};

	}

}
