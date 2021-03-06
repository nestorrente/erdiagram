import {RelationshipDescriptor} from '@/erdiagram/parser/entity-relationship-model-types';
import NomnomlRelationshipDirectionCodeGenerator
	from '@/erdiagram/generator/diagram/nomnoml/relationship/NomnomlRelationshipDirectionCodeGenerator';
import NomnomlRelationshipCardinalityCodeGenerator
	from '@/erdiagram/generator/diagram/nomnoml/relationship/NomnomlRelationshipCardinalityCodeGenerator';
import NomnomlUnnamedRelationshipCodeGenerator
	from '@/erdiagram/generator/diagram/nomnoml/relationship/NomnomlUnnamedRelationshipCodeGenerator';
import NomnomlNamedRelationshipCodeGenerator
	from '@/erdiagram/generator/diagram/nomnoml/relationship/NomnomlNamedRelationshipCodeGenerator';

export default class NomnomlRelationshipCodeGenerator {

	private readonly relationshipDirectionCodeGenerator = new NomnomlRelationshipDirectionCodeGenerator();
	private readonly relationshipCardinalityCodeGenerator = new NomnomlRelationshipCardinalityCodeGenerator();

	private readonly namedRelationshipCodeGenerator = new NomnomlNamedRelationshipCodeGenerator(
			this.relationshipDirectionCodeGenerator,
			this.relationshipCardinalityCodeGenerator
	);

	private readonly unnamedRelationshipCodeGenerator = new NomnomlUnnamedRelationshipCodeGenerator(
			this.relationshipDirectionCodeGenerator,
			this.relationshipCardinalityCodeGenerator
	);

	public generateRelationshipCode(relationship: RelationshipDescriptor): string {
		if (relationship.relationShipName) {
			return this.namedRelationshipCodeGenerator.generateNamedRelationshipCode(relationship);
		} else {
			return this.unnamedRelationshipCodeGenerator.generateUnnamedRelationshipCode(relationship);
		}
	}

}
