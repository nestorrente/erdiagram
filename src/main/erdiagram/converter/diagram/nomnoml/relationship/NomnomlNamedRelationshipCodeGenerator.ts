import {RelationshipDescriptor} from '@/erdiagram/parser/types/entity-relationship-model-types';
import NomnomlRelationshipDirectionCodeGenerator
	from '@/erdiagram/converter/diagram/nomnoml/relationship/NomnomlRelationshipDirectionCodeGenerator';
import DiagramCardinalityFormatter from '@/erdiagram/converter/diagram/common/DiagramCardinalityFormatter';

export default class NomnomlNamedRelationshipCodeGenerator {

	constructor(
			private readonly relationshipDirectionCodeGenerator: NomnomlRelationshipDirectionCodeGenerator,
			private readonly cardinalityFormatter: DiagramCardinalityFormatter
	) {

	}

	public generateNamedRelationshipCode(relationship: RelationshipDescriptor): string {

		const {
			leftMember,
			rightMember,
			direction,
			relationshipName
		} = relationship;

		const leftMemberCardinalityCode = this.cardinalityFormatter.format(leftMember.cardinality);
		const rightMemberCardinalityCode = this.cardinalityFormatter.format(rightMember.cardinality);

		const leftSideDirectionCode = this.relationshipDirectionCodeGenerator.generateLeftSideDirectionCode(direction);
		const rightSideDirectionCode = this.relationshipDirectionCodeGenerator.generateRightSideDirectionCode(direction);

		return [
			`[<label>${relationshipName}]`,
			`[${leftMember.entity}] ${leftMemberCardinalityCode}${leftSideDirectionCode} [${relationshipName}]`,
			`[${relationshipName}] ${rightSideDirectionCode}${rightMemberCardinalityCode} [${rightMember.entity}]`
		].join('\n');

	}

}
