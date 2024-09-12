import {RelationshipDescriptor} from '@/erdiagram/parser/types/entity-relationship-model-types';
import PlantUmlRelationshipDirectionCodeGenerator
	from '@/erdiagram/converter/diagram/plantuml/relationship/PlantUmlRelationshipDirectionCodeGenerator';
import DiagramCardinalityFormatter from '@/erdiagram/converter/diagram/common/DiagramCardinalityFormatter';

export default class PlantUmlRelationshipCodeGenerator {

	private readonly relationshipDirectionCodeGenerator = new PlantUmlRelationshipDirectionCodeGenerator();
	private readonly cardinalityFormatter = new DiagramCardinalityFormatter();

	public generateRelationshipCode(relationship: RelationshipDescriptor): string {

		const {
			leftMember,
			rightMember,
			direction
		} = relationship;

		const leftMemberCardinalityCode = this.cardinalityFormatter.format(leftMember.cardinality);
		const rightMemberCardinalityCode = this.cardinalityFormatter.format(rightMember.cardinality);

		const directionCode = this.relationshipDirectionCodeGenerator.generateDirectionCode(direction);

		const relationshipCode = `${leftMember.entity} "${leftMemberCardinalityCode}" ${directionCode} "${rightMemberCardinalityCode}" ${rightMember.entity}`;

		if (relationship.relationshipName) {
			return `${relationshipCode} : ${relationship.relationshipName}`;
		} else {
			return relationshipCode;
		}

	}

}
