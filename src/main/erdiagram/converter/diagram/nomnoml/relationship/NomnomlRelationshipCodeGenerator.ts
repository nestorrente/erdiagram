import {RelationshipDescriptor} from '@/erdiagram/parser/types/entity-relationship-model-types';
import NomnomlRelationshipDirectionCodeGenerator
	from '@/erdiagram/converter/diagram/nomnoml/relationship/NomnomlRelationshipDirectionCodeGenerator';
import NomnomlUnnamedRelationshipCodeGenerator
	from '@/erdiagram/converter/diagram/nomnoml/relationship/NomnomlUnnamedRelationshipCodeGenerator';
import NomnomlNamedRelationshipCodeGenerator
	from '@/erdiagram/converter/diagram/nomnoml/relationship/NomnomlNamedRelationshipCodeGenerator';
import DiagramCardinalityFormatter from '@/erdiagram/converter/diagram/common/DiagramCardinalityFormatter';

export default class NomnomlRelationshipCodeGenerator {

	private readonly relationshipDirectionCodeGenerator = new NomnomlRelationshipDirectionCodeGenerator();
	private readonly cardinalityFormatter = new DiagramCardinalityFormatter();

	private readonly namedRelationshipCodeGenerator = new NomnomlNamedRelationshipCodeGenerator(
			this.relationshipDirectionCodeGenerator,
			this.cardinalityFormatter
	);

	private readonly unnamedRelationshipCodeGenerator = new NomnomlUnnamedRelationshipCodeGenerator(
			this.relationshipDirectionCodeGenerator,
			this.cardinalityFormatter
	);

	public generateRelationshipCode(relationship: RelationshipDescriptor): string {
		if (relationship.relationshipName) {
			return this.namedRelationshipCodeGenerator.generateNamedRelationshipCode(relationship);
		} else {
			return this.unnamedRelationshipCodeGenerator.generateUnnamedRelationshipCode(relationship);
		}
	}

}
