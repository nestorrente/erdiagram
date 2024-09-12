import {
	Direction,
	RelationshipDescriptor
} from '@/erdiagram/parser/types/entity-relationship-model-types';
import RelationshipMemberMother from './RelationshipMemberMother';

export default class RelationshipDescriptorMother {

	static create(partial?: Partial<RelationshipDescriptor>): RelationshipDescriptor {
		return {
			relationshipName: undefined,
			direction: Direction.BIDIRECTIONAL,
			...partial,
			leftMember: partial?.leftMember ?? RelationshipMemberMother.create(),
			rightMember: partial?.rightMember ?? RelationshipMemberMother.create(),
		}
	}

}
