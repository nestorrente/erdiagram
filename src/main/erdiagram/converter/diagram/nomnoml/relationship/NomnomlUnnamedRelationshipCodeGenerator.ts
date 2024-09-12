import {RelationshipDescriptor} from '@/erdiagram/parser/types/entity-relationship-model-types';
import NomnomlRelationshipDirectionCodeGenerator
	from '@/erdiagram/converter/diagram/nomnoml/relationship/NomnomlRelationshipDirectionCodeGenerator';
import DiagramCardinalityFormatter from '@/erdiagram/converter/diagram/common/DiagramCardinalityFormatter';

export default class NomnomlUnnamedRelationshipCodeGenerator {

	constructor(
			private readonly relationshipDirectionCodeGenerator: NomnomlRelationshipDirectionCodeGenerator,
			private readonly cardinalityFormatter: DiagramCardinalityFormatter
	) {

	}

	public generateUnnamedRelationshipCode(relationship: RelationshipDescriptor): string {

		const {
			leftMember,
			rightMember,
			direction
		} = relationship;

		const leftMemberCardinalityCode = this.cardinalityFormatter.format(leftMember.cardinality);
		const rightMemberCardinalityCode = this.cardinalityFormatter.format(rightMember.cardinality);

		const directionCode = this.relationshipDirectionCodeGenerator.generateDirectionCode(direction);
		return `[${leftMember.entity}] ${leftMemberCardinalityCode}${directionCode}${rightMemberCardinalityCode} [${rightMember.entity}]`;

	}

}
