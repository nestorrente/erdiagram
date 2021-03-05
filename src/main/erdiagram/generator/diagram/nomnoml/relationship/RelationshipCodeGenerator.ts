import {Cardinality, Direction, RelationshipDescriptor} from '@/erdiagram/parser/entity-relationship-model-types';

export default class RelationshipCodeGenerator {

	public generateRelationshipCode(relationship: RelationshipDescriptor): string {
		if (relationship.relationShipName) {
			return this.generateNamedRelationshipCode(relationship);
		} else {
			return this.generateUnnamedRelationshipCode(relationship);
		}
	}

	private generateNamedRelationshipCode(relationship: RelationshipDescriptor): string {

		const {
			leftMember,
			rightMember,
			direction,
			relationShipName
		} = relationship;

		const leftMemberCardinalityCode = this.generateCardinalityCode(leftMember.cardinality);
		const rightMemberCardinalityCode = this.generateCardinalityCode(rightMember.cardinality);

		const leftSideDirectionCode = this.generateLeftSideDirectionCode(direction);
		const rightSideDirectionCode = this.generateRightSideDirectionCode(direction);

		return [
			`[<label>${relationShipName}]`,
			`[${leftMember.entity}] ${leftMemberCardinalityCode}${leftSideDirectionCode} [${relationShipName}]`,
			`[${relationShipName}] ${rightSideDirectionCode}${rightMemberCardinalityCode} [${rightMember.entity}]`
		].join('\n');

	}

	private generateLeftSideDirectionCode(direction: Direction): string {
		return [Direction.RIGHT_TO_LEFT, Direction.BIDIRECTIONAL].includes(direction) ? '<-' : '-';
	}

	private generateRightSideDirectionCode(direction: Direction): string {
		return [Direction.LEFT_TO_RIGHT, Direction.BIDIRECTIONAL].includes(direction) ? '->' : '-';
	}

	private generateUnnamedRelationshipCode(relationship: RelationshipDescriptor): string {

		const {
			leftMember,
			rightMember,
			direction
		} = relationship;

		const leftMemberCardinalityCode = this.generateCardinalityCode(leftMember.cardinality);
		const rightMemberCardinalityCode = this.generateCardinalityCode(rightMember.cardinality);

		const directionCode = this.generateDirectionCode(direction);
		return `[${leftMember.entity}] ${leftMemberCardinalityCode}${directionCode}${rightMemberCardinalityCode} [${rightMember.entity}]`;

	}

	private generateDirectionCode(direction: Direction): string {
		switch (direction) {
			case Direction.LEFT_TO_RIGHT:
				return '->';
			case Direction.RIGHT_TO_LEFT:
				return '<-';
			case Direction.BIDIRECTIONAL:
				return '<->';
		}
	}

	private generateCardinalityCode(cardinality: Cardinality): string {
		switch (cardinality) {
			case Cardinality.ZERO_OR_ONE:
				return '0..1';
			case Cardinality.ONE:
				return '1';
			case Cardinality.MANY:
				return '*';
		}
	}

}
