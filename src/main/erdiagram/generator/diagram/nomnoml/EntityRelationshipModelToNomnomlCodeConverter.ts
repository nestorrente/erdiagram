import {EntityRelationshipModel} from '@/erdiagram/parser/entity-relationship-model-types';
import EntityCodeGenerator from '@/erdiagram/generator/diagram/nomnoml/entity/EntityCodeGenerator';
import RelationshipCodeGenerator from '@/erdiagram/generator/diagram/nomnoml/relationship/RelationshipCodeGenerator';
import EntityRelationshipModelToCodeConverter from '@/erdiagram/generator/EntityRelationshipModelToCodeConverter';

export default class EntityRelationshipModelToNomnomlCodeConverter implements EntityRelationshipModelToCodeConverter {

	private readonly entityCodeGenerator = new EntityCodeGenerator();
	private readonly relationshipCodeGenerator = new RelationshipCodeGenerator();

	public generateCode(model: EntityRelationshipModel): string {
		return [
			...model.entities.map(entity => this.entityCodeGenerator.generateEntityCode(entity)),
			...model.relationships.map(relationship => this.relationshipCodeGenerator.generateRelationshipCode(relationship))
		].join('\n\n');
	}

}
