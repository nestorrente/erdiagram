import {
	Cardinality,
	RelationshipDescriptor,
	RelationshipMember
} from '@/erdiagram/parser/types/entity-relationship-model-types';
import {ClassFieldDescriptor} from '@/erdiagram/converter/oop/model/class-model-types';
import pluralize from 'pluralize';
import {SourceType} from '@/erdiagram/converter/oop/model/source-metadata/source-metadata-types';

export default class RelationshipMemberToClassFieldMapper {

	constructor(
			private readonly _enforceNotNullLists: boolean
	) {}

	public mapRelationshipMemberToField(relationship: RelationshipDescriptor, toMember: RelationshipMember): ClassFieldDescriptor {

		const list = toMember.cardinality === Cardinality.MANY;
		const name = list ? pluralize(toMember.entityAlias) : toMember.entityAlias;

		return {
			name,
			nullable: this.computeNullable(toMember.cardinality),
			entityType: toMember.entity,
			list,
			sourceMetadata: {
				sourceType: SourceType.RELATIONSHIP_MEMBER,
				relationship,
				referencedMember: toMember
			}
		};

	}

	private computeNullable(cardinality: Cardinality): boolean {
		switch (cardinality) {
			case Cardinality.ZERO_OR_ONE:
				return true;
			case Cardinality.ONE:
				return false;
			case Cardinality.MANY:
				return !this._enforceNotNullLists;
		}
	}

}
