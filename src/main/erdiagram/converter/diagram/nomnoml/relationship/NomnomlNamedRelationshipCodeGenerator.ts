import {RelationshipDescriptor} from '@/erdiagram/parser/types/entity-relationship-model-types';
import NomnomlRelationshipDirectionCodeGenerator
	from '@/erdiagram/converter/diagram/nomnoml/relationship/NomnomlRelationshipDirectionCodeGenerator';
import NomnomlRelationshipCardinalityCodeGenerator
	from '@/erdiagram/converter/diagram/nomnoml/relationship/NomnomlRelationshipCardinalityCodeGenerator';

export default class NomnomlNamedRelationshipCodeGenerator {

	constructor(
			private readonly relationshipDirectionCodeGenerator: NomnomlRelationshipDirectionCodeGenerator,
			private readonly relationshipCardinalityCodeGenerator: NomnomlRelationshipCardinalityCodeGenerator
	) {

	}

	public generateNamedRelationshipCode(relationship: RelationshipDescriptor): string {

		const {
			leftMember,
			rightMember,
			direction,
			relationshipName
		} = relationship;

		const leftMemberCardinalityCode = this.relationshipCardinalityCodeGenerator.generateCardinalityCode(leftMember.cardinality);
		const rightMemberCardinalityCode = this.relationshipCardinalityCodeGenerator.generateCardinalityCode(rightMember.cardinality);

		const leftSideDirectionCode = this.relationshipDirectionCodeGenerator.generateLeftSideDirectionCode(direction);
		const rightSideDirectionCode = this.relationshipDirectionCodeGenerator.generateRightSideDirectionCode(direction);

		return [
			`[<label>${relationshipName}]`,
			`[${leftMember.entity}] ${leftMemberCardinalityCode}${leftSideDirectionCode} [${relationshipName}]`,
			`[${relationshipName}] ${rightSideDirectionCode}${rightMemberCardinalityCode} [${rightMember.entity}]`
		].join('\n');

	}

}
