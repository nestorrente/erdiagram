import {
	Cardinality,
	RelationshipMember
} from '@/erdiagram/parser/types/entity-relationship-model-types';

export default class RelationshipMemberMother {

	static create(partial?: Partial<RelationshipMember>): RelationshipMember {
		return {
			entity: 'Entity',
			entityAlias: 'entity',
			cardinality: Cardinality.ONE,
			...partial,
		}
	}

}
