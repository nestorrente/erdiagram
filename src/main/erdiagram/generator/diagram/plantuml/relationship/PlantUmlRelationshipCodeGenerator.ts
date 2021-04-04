import {RelationshipDescriptor} from '@/erdiagram/parser/types/entity-relationship-model-types';
import PlantUmlRelationshipDirectionCodeGenerator
	from '@/erdiagram/generator/diagram/plantuml/relationship/PlantUmlRelationshipDirectionCodeGenerator';
import PlantUmlRelationshipCardinalityCodeGenerator
	from '@/erdiagram/generator/diagram/plantuml/relationship/PlantUmlRelationshipCardinalityCodeGenerator';

export default class PlantUmlRelationshipCodeGenerator {

	private readonly relationshipDirectionCodeGenerator = new PlantUmlRelationshipDirectionCodeGenerator();
	private readonly relationshipCardinalityCodeGenerator = new PlantUmlRelationshipCardinalityCodeGenerator();

	public generateRelationshipCode(relationship: RelationshipDescriptor): string {

		const {
			leftMember,
			rightMember,
			direction
		} = relationship;

		const leftMemberCardinalityCode = this.relationshipCardinalityCodeGenerator.generateCardinalityCode(leftMember.cardinality);
		const rightMemberCardinalityCode = this.relationshipCardinalityCodeGenerator.generateCardinalityCode(rightMember.cardinality);

		const directionCode = this.relationshipDirectionCodeGenerator.generateDirectionCode(direction);

		const relationshipCode = `${leftMember.entity} "${leftMemberCardinalityCode}" ${directionCode} "${rightMemberCardinalityCode}" ${rightMember.entity}`;

		if (relationship.relationshipName) {
			return `${relationshipCode} : ${relationship.relationshipName}`;
		} else {
			return relationshipCode;
		}

	}

}
