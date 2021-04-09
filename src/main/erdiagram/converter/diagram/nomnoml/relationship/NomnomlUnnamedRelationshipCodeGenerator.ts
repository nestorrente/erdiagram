import {RelationshipDescriptor} from '@/erdiagram/parser/types/entity-relationship-model-types';
import NomnomlRelationshipDirectionCodeGenerator
	from '@/erdiagram/converter/diagram/nomnoml/relationship/NomnomlRelationshipDirectionCodeGenerator';
import NomnomlRelationshipCardinalityCodeGenerator
	from '@/erdiagram/converter/diagram/nomnoml/relationship/NomnomlRelationshipCardinalityCodeGenerator';

export default class NomnomlUnnamedRelationshipCodeGenerator {

	constructor(
			private readonly relationshipDirectionCodeGenerator: NomnomlRelationshipDirectionCodeGenerator,
			private readonly relationshipCardinalityCodeGenerator: NomnomlRelationshipCardinalityCodeGenerator
	) {

	}

	public generateUnnamedRelationshipCode(relationship: RelationshipDescriptor): string {

		const {
			leftMember,
			rightMember,
			direction
		} = relationship;

		const leftMemberCardinalityCode = this.relationshipCardinalityCodeGenerator.generateCardinalityCode(leftMember.cardinality);
		const rightMemberCardinalityCode = this.relationshipCardinalityCodeGenerator.generateCardinalityCode(rightMember.cardinality);

		const directionCode = this.relationshipDirectionCodeGenerator.generateDirectionCode(direction);
		return `[${leftMember.entity}] ${leftMemberCardinalityCode}${directionCode}${rightMemberCardinalityCode} [${rightMember.entity}]`;

	}

}
